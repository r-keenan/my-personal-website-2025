import { z } from 'zod';

export const contactSchema = z.object({
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

export type ContactFormData = z.infer<typeof contactSchema>;
