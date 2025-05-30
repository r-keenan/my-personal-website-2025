import { getSecret } from '$lib/clients/awsSecretsManager';

interface ApiGatewayConfig {
	apiBaseUrl: string;
	apiKey: string;
}

let configPromise: Promise<ApiGatewayConfig> | null = null;

export const getApiGatewayConfig = async (): Promise<ApiGatewayConfig> => {
	if (configPromise) return configPromise;

	configPromise = (async () => {
		try {
			const [apiBaseUrl, apiKey] = await Promise.all([
				getSecret('CONTACT_FORM_API_GATEWAY_URL'),
				getSecret('CONTACT_FORM_API_KEY')
			]);

			if (typeof apiBaseUrl !== 'string' || typeof apiKey !== 'string') {
				throw new Error('Invalid API Gateway configuration');
			}

			return { apiBaseUrl, apiKey };
		} catch (error) {
			configPromise = null; // Reset on error so it can be retried
			console.error('Error initializing API Gateway client:', error);
			throw new Error('Failed to set up AWS API Gateway client config');
		}
	})();

	return configPromise;
};

// Legacy export for backward compatibility
export const getAwsGatewaySecrets = getApiGatewayConfig;
