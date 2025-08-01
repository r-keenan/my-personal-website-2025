using Pulumi;
using Pulumi.Aws.Acm;
using Pulumi.Aws.ApiGateway;
using Pulumi.Aws.ApiGateway.Inputs;
using Pulumi.Aws.AppRunner;
using Pulumi.Aws.AppRunner.Inputs;
using Pulumi.Aws.DynamoDB;
using Pulumi.Aws.DynamoDB.Inputs;
using Pulumi.Aws.CloudWatch;
using Pulumi.Aws.Iam;
using Pulumi.Aws.Lambda;
using Pulumi.Aws.Lambda.Inputs;
using Pulumi.Aws.SecretsManager;
using System;
using System.Collections.Generic;
using System.Text.Json;
using Pulumi.Aws.Ecr;
using Pulumi.Aws.Ecr.Inputs;

return await Pulumi.Deployment.RunAsync(() =>
{
    const string domainName = "rosskeenan.com";
    const string websiteUrl = $"https://{domainName}";
    const string environment = "production";
    const string application = "my-personal-website";

    var api = new RestApi("contact-form-api", new()
    {
        Name = "contact-form-api",
        Description = "API Gateway for contact form submissions",
        EndpointConfiguration = new RestApiEndpointConfigurationArgs
        {
            Types = "REGIONAL",
        },
        Tags =
        {
            { "Environment", environment  },
            { "Application", application },
            { "Purpose", "ContactFormAPI" },
        },
    });

    var contactResource = new Pulumi.Aws.ApiGateway.Resource("contact-resource", new()
    {
        RestApi = api.Id,
        ParentId = api.RootResourceId,
        PathPart = "contact",
    });

    var contactMethod = new Method("contact-method", new()
    {
        RestApi = api.Id,
        ResourceId = contactResource.Id,
        HttpMethod = "POST",
        Authorization = "NONE",
        ApiKeyRequired = true,
    });

    var apiKey = new ApiKey("contact-form-api-key", new()
    {
        Name = "contact-form-api-key",
        Description = "API Key for contact form API",
        Tags =
        {
            { "Environment", environment },
            { "Application", application },
            { "Purpose", "APIAccess" },
        },
    });

    var contact_form_table = new Table("contact-form-table", new()
    {
        Name = "ContactMessages",
        BillingMode = "PAY_PER_REQUEST",
        HashKey = "id",
        RangeKey = "submittedAt",
        Attributes = new[]
        {
            new TableAttributeArgs
            {
                Name = "id",
                Type = "S",
            },
            new TableAttributeArgs
            {
                Name = "submittedAt",
                Type = "S",
            },
            new TableAttributeArgs
            {
                Name = "email",
                Type = "S",
            },
            new TableAttributeArgs
            {
                Name = "subject",
                Type = "S",
            },
            new TableAttributeArgs
            {
                Name = "firstName",
                Type = "S",
            },
            new TableAttributeArgs
            {
                Name = "lastName",
                Type = "S",
            },
            new TableAttributeArgs
            {
                Name = "companyName",
                Type = "S",
            },
        },
        GlobalSecondaryIndexes = new[]
        {
            new TableGlobalSecondaryIndexArgs
            {
                Name = "EmailIndex",
                HashKey = "email",
                RangeKey = "submittedAt",
                ProjectionType = "ALL",
            },
            new TableGlobalSecondaryIndexArgs
            {
                Name = "SubjectIndex",
                HashKey = "subject",
                RangeKey = "submittedAt",
                ProjectionType = "ALL",
            },
            new TableGlobalSecondaryIndexArgs
            {
                Name = "FirstNameIndex",
                HashKey = "firstName",
                RangeKey = "submittedAt",
                ProjectionType = "ALL",
            },
            new TableGlobalSecondaryIndexArgs
            {
                Name = "LastNameIndex",
                HashKey = "lastName",
                RangeKey = "submittedAt",
                ProjectionType = "ALL",
            },
            new TableGlobalSecondaryIndexArgs
            {
                Name = "CompanyIndex",
                HashKey = "companyName",
                RangeKey = "submittedAt",
                ProjectionType = "ALL",
            },
        },
        Ttl = new TableTtlArgs
        {
            AttributeName = "expiresAt",
            Enabled = true,
        },
        Tags =
        {
            { "Name", "contact-form-table" },
            { "Environment", environment },
            { "Purpose", "ContactFormSubmissions" },
        },
    });

    var lambdaRole = new Role("contact-form-lambda-role", new()
    {
        AssumeRolePolicy = @"{
            ""Version"": ""2012-10-17"",
            ""Statement"": [
                {
                    ""Action"": ""sts:AssumeRole"",
                    ""Principal"": {
                        ""Service"": ""lambda.amazonaws.com""
                    },
                    ""Effect"": ""Allow""
                }
            ]
        }",
    });

    var lambdaPolicy = new Policy("contact-form-lambda-policy", new()
    {
        PolicyDocument = Output.Format($@"{{
            ""Version"": ""2012-10-17"",
            ""Statement"": [
                {{
                    ""Action"": [
                        ""logs:CreateLogGroup"",
                        ""logs:CreateLogStream"",
                        ""logs:PutLogEvents""
                    ],
                    ""Resource"": ""arn:aws:logs:*:*:*"",
                    ""Effect"": ""Allow""
                }},
                {{
                    ""Action"": [
                        ""dynamodb:GetItem"",
                        ""dynamodb:PutItem"",
                        ""dynamodb:UpdateItem"",
                        ""dynamodb:DeleteItem""
                    ],
                    ""Resource"": ""{contact_form_table.Arn}"",
                    ""Effect"": ""Allow""
                }},
                {{
                    ""Action"": [
                        ""secretsmanager:GetSecretValue"",
                        ""secretsmanager:DescribeSecret""
                    ],
                    ""Resource"": ""arn:aws:secretsmanager:*:*:*"",
                    ""Effect"": ""Allow""
                }}
            ]
        }}"),
    });

    var lambdaRolePolicyAttachment = new RolePolicyAttachment("contact-form-lambda-role-policy-attachment", new()
    {
        Role = lambdaRole.Name,
        PolicyArn = lambdaPolicy.Arn,
    });

    var lambdaFunction = new Function("contact-form-lambda-function", new()
    {
        Runtime = "dotnet8",
        Handler = "ContactFormLambda::ContactFormLambda.ContactFormHandler::HandleContactFormAsync",
        Role = lambdaRole.Arn,
        Code = new FileArchive("./ContactFormLambda/bin/Release/net8.0/linux-x64/publish"),
        Environment = new FunctionEnvironmentArgs
        {
            Variables =
            {
                { "DYNAMODB_TABLE_NAME", contact_form_table.Name },
            },
        },
        Timeout = 30,
        MemorySize = 256,
        Tags =
        {
            { "Environment", environment },
            { "Application", application },
            { "Purpose", "ContactFormProcessor" },
        },
    });

    var lambdaPermission = new Permission("contact-form-lambda-permission", new()
    {
        Action = "lambda:InvokeFunction",
        Function = lambdaFunction.Name,
        Principal = "apigateway.amazonaws.com",
        SourceArn = Output.Format($"{api.ExecutionArn}/*/*"),
    });

    var contactIntegration = new Integration("contact-integration", new()
    {
        RestApi = api.Id,
        ResourceId = contactResource.Id,
        HttpMethod = contactMethod.HttpMethod,
        Type = "AWS_PROXY",
        IntegrationHttpMethod = "POST",
        Uri = lambdaFunction.InvokeArn,
    });

    var deployment = new Pulumi.Aws.ApiGateway.Deployment("contact-form-api-deployment", new()
    {
        RestApi = api.Id,
        Description = "Deployment for contact form API",
    }, new CustomResourceOptions
    {
        DependsOn = { contactIntegration }, // Ensure methods are created first
    });

    var stage = new Stage("contact-form-api-stage", new()
    {
        RestApi = api.Id,
        Deployment = deployment.Id,
        StageName = "prod",
        Description = "Production stage for contact form API",
        Variables =
        {
            { "deployed_at", DateTime.UtcNow.ToString("yyyy-MM-dd HH:mm:ss") },
        },
        Tags =
        {
            { "Environment", environment },
            { "Application", application },
            { "Purpose", "ContactFormAPIStage" },
        },
    });

    var apiGatewaySecret = new Secret("contact-form-api-gateway-url-secret", new()
    {
        Name = "CONTACT_FORM_API_GATEWAY_URL",
        Description = "API Gateway base URL for contact form API",
        Tags =
        {
            { "Environment", environment },
            { "Application", application },
            { "Purpose", "APIGatewayURL" },
        },
    });

    var apiGatewaySecretVersion = new SecretVersion("contact-form-api-gateway-url-secret-version", new()
    {
        SecretId = apiGatewaySecret.Id,
        SecretString = stage.InvokeUrl.Apply(url => JsonSerializer.Serialize(new Dictionary<string, string>
        {
            { "CONTACT_FORM_API_GATEWAY_URL", url }
        })),
    });

    var apiKeySecret = new Secret("contact-form-api-key-secret", new()
    {
        Name = "CONTACT_FORM_API_KEY",
        Description = "API key for contact form API Gateway",
        Tags =
        {
            { "Environment", environment },
            { "Application", application },
            { "Purpose", "APIKey" },
        },
    });

    var apiKeySecretVersion = new SecretVersion("contact-form-api-key-secret-version", new()
    {
        SecretId = apiKeySecret.Id,
        SecretString = apiKey.Value.Apply(key => JsonSerializer.Serialize(new Dictionary<string, string>
        {
            { "CONTACT_FORM_API_KEY", key }
        })),
    });

    var usagePlan = new UsagePlan("contact-form-usage-plan", new()
    {
        Name = "contact-form-usage-plan",
        Description = "Usage plan for contact form API",
        ApiStages = new[]
        {
            new UsagePlanApiStageArgs
            {
                ApiId = api.Id,
                Stage = stage.StageName,
            },
        },
        QuotaSettings = new UsagePlanQuotaSettingsArgs
        {
            Limit = 1000,
            Period = "DAY",
        },
        ThrottleSettings = new UsagePlanThrottleSettingsArgs
        {
            RateLimit = 100,
            BurstLimit = 200,
        },
        Tags =
        {
            { "Environment", environment },
            { "Application", application },
            { "Purpose", "APIUsagePlan" },
        },
    }, new CustomResourceOptions
    {
        DependsOn = { stage }, // Ensure stage is created first
    });

    // Associate API Key with Usage Plan
    var usagePlanKey = new UsagePlanKey("contact-form-usage-plan-key", new()
    {
        KeyId = apiKey.Id,
        KeyType = "API_KEY",
        UsagePlanId = usagePlan.Id,
    });

    var logGroup = new LogGroup("sveltekit-errors-log-group", new()
    {
        Name = "/sveltekit/errors",
        RetentionInDays = 30, // Retain logs for 30 days (adjust as needed)
        Tags =
        {
            { "Environment", environment },
            { "Application", application },
            { "Purpose", "ErrorLogging" },
        },
    });

    var logStream = new LogStream("app-errors-log-stream", new()
    {
        Name = $"app-errors-{DateTime.UtcNow.ToString("yyyy-MM-dd")}",
        LogGroupName = logGroup.Name,
    });

    /*
    var githubConnection = new Connection("sveltekit-github-connection", new()
    {
        ConnectionName = "sveltekit-github-connection",
        ProviderType = "GITHUB",
    });
    */
    var ecrRepository = new Repository("sveltekit-ecr-repo", new()
    {
        Name = "sveltekit-app",
        ImageTagMutability = "MUTABLE",
        ImageScanningConfiguration = new RepositoryImageScanningConfigurationArgs
        {
            ScanOnPush = true,
        },
        Tags =
    {
        { "Environment", environment },
        { "Application", application },
        { "Purpose", "ContainerRegistry" },
    },
    });

    var appRunnerInstanceRole = new Role("apprunner-instance-role", new()
    {
        AssumeRolePolicy = @"{
        ""Version"": ""2012-10-17"",
        ""Statement"": [
            {
                ""Action"": ""sts:AssumeRole"",
                ""Principal"": {
                    ""Service"": ""tasks.apprunner.amazonaws.com""
                },
                ""Effect"": ""Allow""
            }
        ]
    }",
        Tags =
    {
        { "Environment", environment },
        { "Application", application },
        { "Purpose", "AppRunnerInstanceRole" },
    },
    });

    var appRunnerAccessRole = new Role("apprunner-access-role", new()
    {
        AssumeRolePolicy = @"{
        ""Version"": ""2012-10-17"",
        ""Statement"": [
            {
                ""Action"": ""sts:AssumeRole"",
                ""Principal"": {
                    ""Service"": ""build.apprunner.amazonaws.com""
                },
                ""Effect"": ""Allow""
            }
        ]
    }",
        Tags =
    {
        { "Environment", environment },
        { "Application", application },
        { "Purpose", "AppRunnerAccessRole" },
    },
    });

    var appRunnerEcrPolicy = new RolePolicyAttachment("apprunner-ecr-policy", new()
    {
        Role = appRunnerAccessRole.Name,
        PolicyArn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess",
    });

    var appRunnerService = new Service("sveltekit-github-apprunner", new()
    {
        ServiceName = "sveltekit-app",
        SourceConfiguration = new ServiceSourceConfigurationArgs
        {
            ImageRepository = new ServiceSourceConfigurationImageRepositoryArgs
            {
                ImageIdentifier = Output.Format($"{ecrRepository.RepositoryUrl}:latest"),
                ImageConfiguration = new ServiceSourceConfigurationImageRepositoryImageConfigurationArgs
                {
                    Port = "3000",
                    RuntimeEnvironmentVariables =
                {
                    { "NODE_ENV", environment },
                    { "PORT", "3000" },
                },
                },
                ImageRepositoryType = "ECR",
            },
            AuthenticationConfiguration = new ServiceSourceConfigurationAuthenticationConfigurationArgs
            {
                AccessRoleArn = appRunnerAccessRole.Arn,
            },
            AutoDeploymentsEnabled = false,
        },
        InstanceConfiguration = new ServiceInstanceConfigurationArgs
        {
            Cpu = "0.25 vCPU",
            Memory = "0.5 GB",
            InstanceRoleArn = appRunnerInstanceRole.Arn,
        },
        HealthCheckConfiguration = new ServiceHealthCheckConfigurationArgs
        {
            HealthyThreshold = 1,
            Interval = 20,
            Path = "/",
            Protocol = "HTTP",
            Timeout = 5,
            UnhealthyThreshold = 5,
        },
        Tags =
    {
        { "Environment", environment },
        { "Application", application },
        { "Source", "ecr" },
    },
    }, new CustomResourceOptions
    {
        DependsOn = { appRunnerEcrPolicy },
    });

    var certificate = new Certificate("main-domain-certificate", new()
    {
        DomainName = domainName,
        SubjectAlternativeNames = new[]
        {
            "www.rosskeenan.com"
        },
        ValidationMethod = "DNS",
        Tags =
        {
            { "Environment", environment },
            { "Application", application },
            { "Purpose", "SSL" },
        },
    });

    /*
    var appRunnerCustomDomain = new CustomDomainAssociation("sveltekit-custom-domain", new()
    {
        ServiceArn = appRunnerService.Arn,
        DomainName = domainName,
        EnableWwwSubdomain = true,
    }, new CustomResourceOptions
    {
        DependsOn = { appRunnerService },
    });
    */

    return new Dictionary<string, object?>
    {
        ["tableName"] = contact_form_table.Name,
        ["tableArn"] = contact_form_table.Arn,
        ["logGroupName"] = logGroup.Name,
        ["logStreamName"] = logStream.Name,
        ["apiGatewayId"] = api.Id,
        ["apiGatewayUrl"] = stage.InvokeUrl,
        ["apiKeyId"] = apiKey.Id,
        ["apiKeyValue"] = apiKey.Value,
        ["usagePlanId"] = usagePlan.Id,
        ["lambdaFunctionArn"] = lambdaFunction.Arn,
        ["apiGatewaySecretArn"] = apiGatewaySecret.Arn,
        ["ecrRepositoryUrl"] = ecrRepository.RepositoryUrl,
        ["ecrRepositoryArn"] = ecrRepository.Arn,
        ["appRunnerServiceArn"] = appRunnerService.Arn,
        ["apiKeySecretArn"] = apiKeySecret.Arn,
    };
});

