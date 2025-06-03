import type { Handle } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// Handle Chrome DevTools requests
	if (event.url.pathname === '/.well-known/appspecific/com.chrome.devtools.json') {
		return json({});
	}

	return resolve(event);
};
