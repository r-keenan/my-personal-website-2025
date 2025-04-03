import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';

// Initialize the client
const client = new SecretsManagerClient({
	region: 'us-east-2'
});

const secretCache: Record<string, string> = {};

export async function getSecret(secretName: string): Promise<string> {
	// Check cache first
	if (secretCache[secretName]) {
		return secretCache[secretName];
	}

	try {
		const command = new GetSecretValueCommand({ SecretId: secretName });
		const response = await client.send(command);

		if (!response.SecretString) {
			throw new Error(`Secret ${secretName} has no string value`);
		}
		let result: string;

		try {
			const parsed = JSON.parse(response.SecretString);

			if (typeof parsed === 'object' && parsed !== null) {
				if (secretName in parsed) {
					result = String(parsed[secretName]);
				} else if (Object.keys(parsed).length === 1) {
					result = String(Object.values(parsed)[0]);
				} else if ('value' in parsed) {
					result = String(parsed.value);
				} else {
					console.warn(`Unexpected JSON structure for secret ${secretName}:`, parsed);
					result = JSON.stringify(parsed);
				}
			} else if (typeof parsed === 'string') {
				result = parsed;
			} else {
				result = String(parsed);
			}
		} catch {
			result = response.SecretString;
		}
		secretCache[secretName] = result;
		return result;
	} catch (error) {
		console.error('Error retrieving secret');
		throw error;
	}
}
