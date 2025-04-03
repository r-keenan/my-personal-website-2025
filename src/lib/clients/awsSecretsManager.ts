import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

// Initialize the client
const client = new SecretsManagerClient({
	region: 'us-east-2'
	// AWS credentials can be provided through environment variables:
	// AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_SESSION_TOKEN
});

type SecretValue = string | number | boolean | null;
type SecretObject = Record<string, SecretValue | Record<string, SecretValue>>;

export async function getSecret<T extends SecretObject = SecretObject>(
	secretName: string
): Promise<T | string | null> {
	try {
		const command = new GetSecretValueCommand({ SecretId: secretName });
		const response = await client.send(command);

		if (response.SecretString) {
			try {
				return JSON.parse(response.SecretString);
			} catch {
				return response.SecretString;
			}
		}

		return null;
	} catch (error) {
		console.error('Error retrieving secret:', error);
		throw error;
	}
}
