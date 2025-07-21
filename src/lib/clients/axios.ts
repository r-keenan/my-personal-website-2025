import axios, { type AxiosInstance } from 'axios';
import { getApiGatewayConfig } from '../clients/aws/apiGateway';

let apiGatewayConfigPromise: Promise<{ apiBaseUrl: string; apiKey: string }> | null = null;

const getApiConfig = async () => {
	if (apiGatewayConfigPromise) return apiGatewayConfigPromise;
	apiGatewayConfigPromise = getApiGatewayConfig();
	return apiGatewayConfigPromise;
};

export const apiGatewayClient = async (): Promise<AxiosInstance> => {
	const config = await getApiConfig();
	return axios.create({
		baseURL: config.apiBaseUrl,
		timeout: 1000,
		headers: {
			'x-api-key': config.apiKey,
			'Content-Type': 'application/json'
		}
	});
};
