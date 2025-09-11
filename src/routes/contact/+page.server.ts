import { superValidate, message } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { logError } from '../../lib/clients/aws/awsCloudWatch';
import { apiGatewayClient } from '$lib/clients/axios';
import { contactSchema } from '$lib/schemas/contactSchema';

export const load = async () => {
	const form = await superValidate(zod(contactSchema));

	return { form };
};
// If you have a form action
export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(contactSchema));

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
