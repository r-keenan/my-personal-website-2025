import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { logError } from '$lib/clients/awsCloudWatch';
import { apiGatewayClient } from '$lib/clients/axios';

const schema = z.object({
	firstName: z
		.string()
		.min(2, 'First Name must be at least 2 characters')
		.max(50, 'First Name must not exceed 50 characters'),
	lastName: z
		.string()
		.min(2, 'Last Name must be at least 2 characters')
		.max(50, 'Last Name must not exceed 50 characters'),
	companyName: z.string().optional(),
	companyWebsite: z
		.string()
		.url('Invalid URL. Format must be: https://www.yourwebsite.com')
		.optional(),
	email: z
		.string()
		.email('Must be formatted like: hello@email.com')
		.min(8, 'Email Address must be at least 8 characters')
		.max(75, 'Email Address must not exceed 75 characters'),
	phone: z.string().optional(),
	hp: z.string().max(0).optional(),
	subject: z
		.string()
		.min(10, 'Subject must be at least 10 characters')
		.max(100, 'Subject must not exceed 100 characters'),
	message: z
		.string()
		.min(50, 'Message body must be at least 50 characters')
		.max(1000, 'Message body must not exceed 1000 characters')
});

export const load = async () => {
	const form = await superValidate(zod(schema));

	return { form };
};
// If you have a form action
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(schema));

		if (!form.valid) {
			logError('Form validation failed', request);
			return message(form, 'Please complete all required fields.', {
				status: 400
			});
		}

		if (form.data.hp && form.data.hp.length > 0) {
			// Not logging, because I do want to exit if honeypot is filled out
			return message(form, 'Error occurred when submitting your form', {
				status: 400
			});
		}

		try {
			const client = await apiGatewayClient();
			const response = await client.post('/contact', form.data);

			if (response.status != 200 && response.status != 201) {
				logError('Form validation failed', request);
				return message(
					form,
					'Unknown error occurred when trying to save contact form information.'
				);
			}

			// Set success message using SuperForms message system
			return message(form, 'Message sent! Please allow up to two business days for a reply.');
		} catch (error) {
			return message(form, 'Message sent! Please allow up to two business days for a reply.');
		}
	}
};
