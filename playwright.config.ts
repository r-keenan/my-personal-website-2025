import { defineConfig } from '@playwright/test';

export default defineConfig({
	globalSetup: './e2e/globalSetup.ts',
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	use: {
		baseURL: 'http://localhost:4173'
	},
	testDir: 'e2e'
});
