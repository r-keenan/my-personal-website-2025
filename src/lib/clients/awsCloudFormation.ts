import { CloudWatchLogsClient, PutLogEventsCommand } from '@aws-sdk/client-cloudwatch-logs';

// Configure AWS SDK
const client = new CloudWatchLogsClient({
	region: 'us-east-2'
});

// Log group and stream names
const LOG_GROUP = '/sveltekit/errors';
const LOG_STREAM = 'app-errors-' + new Date().toISOString().split('T')[0];

export async function logError(error, request) {
	try {
		const logEvent = {
			message: JSON.stringify({
				timestamp: new Date().toISOString(),
				error: error.message,
				stack: error.stack,
				path: request?.url,
				method: request?.method
			}),
			timestamp: Date.now()
		};

		const command = new PutLogEventsCommand({
			logGroupName: LOG_GROUP,
			logStreamName: LOG_STREAM,
			logEvents: [logEvent]
		});

		await client.send(command);
	} catch (err) {
		console.error('Failed to log to CloudWatch:', err);
	}
}
