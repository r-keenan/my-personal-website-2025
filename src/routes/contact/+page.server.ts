import { message } from 'sveltekit-superforms';
import { fail } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, your_adapter(schema));
		console.log(form);

		if (!form.valid) {
			// Return { form } and things will just work.
			return fail(400, { form });
		}

		// TODO: Do something with the validated form.data

		// Return the form with a status message
		return message(form, 'Form posted successfully!');
	}
};
