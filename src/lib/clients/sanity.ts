import { createClient, SanityClient } from '@sanity/client';
import { getSecret } from './aws/awsSecretsManager';

// Singleton client
let client: SanityClient | null = null;

export const sanityApiVersion = '2025-02-19';

async function getConfigValue(secretName: string, envVarName: string): Promise<string> {
	// Try AWS Secrets Manager first
	try {
		const secretValue = await getSecret(secretName);
		if (typeof secretValue === 'string' && secretValue !== null) {
			return secretValue;
		}
	} catch (error) {
		console.warn(`AWS Secrets Manager not available for ${secretName}, falling back to env vars`);
	}

	// Fall back to environment variables
	const envValue = process.env[envVarName];
	if (envValue) {
		console.info(`Using environment variable for ${envVarName}`);
		return envValue;
	}

	throw new Error(
		`Failed to get ${secretName} from both AWS Secrets Manager and environment variable ${envVarName}`
	);
}

export async function sanityClient() {
	if (client) return client;
	try {
		const [projectId, dataset, token] = await Promise.all([
			getConfigValue('SANITY_PROJECT_ID', 'SANITY_PROJECT_ID'),
			getConfigValue('SANITY_DATASET', 'SANITY_DATASET'),
			getConfigValue('SANITY_TOKEN', 'SANITY_TOKEN')
		]);

		client = createClient({
			projectId,
			dataset,
			token,
			useCdn: false,
			apiVersion: sanityApiVersion,
			ignoreBrowserTokenWarning: true
		});

		return client;
	} catch (error) {
		console.error('Error initializing Sanity Client');
		throw new Error('Failed to set up Sanity Client config');
	}
}

export async function getSanityImageUrl(): Promise<string> {
	try {
		return await getConfigValue('SANITY_CDN_URL', 'SANITY_CDN_URL');
	} catch (error) {
		console.error('Error getting Sanity Image URL:', error);
		throw new Error('Failed to get Sanity Image URL');
	}
}

export function getSanityClient() {
	return sanityClient();
}

export default { getSanityClient, getSanityImageUrl };
