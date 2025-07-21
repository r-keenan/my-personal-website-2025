import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';
import { preprocess } from 'svelte/compiler';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				if (process.env.CI === 'true' || process.env.NODE_ENV === 'test') {
					console.warn(`Prerender error ignored: ${path} - ${message}`);
					return;
				}
				throw new Error(message);
			}
		},
		adapter: adapter({
			runtime: 'nodejs22.x'
		}),
		alias: {
			$components: path.resolve('./src/lib//components'),
			$lib: path.resolve('./src/lib'),
			$utils: path.resolve('./src/lib/utils'),
			$clients: path.resolve('./src/lib/clients'),
			$images: path.resolve('./src/lib/images/')
		}
	}
};

export default config;
