import { superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { logError } from '$lib/clients/awsCloudFormation';

const schema = z.object({
	firstName: z
		.string()
		.min(2, 'First Name must be at least 2 characters')
		.max(50, 'First Name must not exceed 50 characters'),
	lastName: z
		.string()
		.min(2, 'Last Name must be at least 2 characters')
		.max(50, 'Last Name must not exceed 50 characters'),
	companyName: z
		.string()
		.min(2, 'Company Name must be at least 2 characters')
		.max(100, 'Last Name must not exceed 100 characters')
		.optional(),
	companyWebsite: z
		.string()
		.url('Invalid URL. Format must be: https://www.yourwebsite.com')
		.min(6, 'Company Website must be at least 6 characters')
		.max(100, 'Company Website must not exceed 100 characters')
		.optional(),
	email: z
		.string()
		.email('Must be formatted like: hello@email.com')
		.min(8, 'Email Address must be at least 8 characters')
		.max(75, 'Email Address must not exceed 75 characters'),
	phone: z
		.string()
		.min(10, 'Email Address must be at least 10 characters')
		.max(20, 'Email Address must be at least 20 characters long')
		.optional(),
	hp: z.string().max(0).optional(), 
	subject: z
		.string()
		.min(10, 'Subject must be at least 10 characters')
		.max(100, 'Subject must be at least 100 characters'),
	message: z
		.string()
		.min(50, 'Message body must be at least 50 characters')
		.max(1000, 'Message body be at least 1000 characters')
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

		console.log(form);
		if (!form.valid) {
			logError('Form not valid', request);
			return { form };
		}

		// Process form data
		// ...

		return { form };
	}
};
