import type { AxiosInstance } from 'axios';
import axios from 'axios';
import { getSecret } from './aws/awsSecretsManager';

let client: AxiosInstance | null = null;

export const githubClient = async () => {
	if (client) return client;
	const token = await getSecret('GITHUB_PAT');

	const apiClient: AxiosInstance = axios.create({
		baseURL: 'https://api.github.com',
		headers: {
			Authorization: `Bearer ${token}`,
			Accept: 'application/vnd.github.v3+json',
			'X-GitHub-Api-Version': '2022-11-28'
		}
	});

	return apiClient;
};
