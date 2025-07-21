import { defineConfig } from '@playwright/test';

export default defineConfig({
	globalSetup: './e2e/globalSetup.ts',
	webServer: {
		command: 'npm run build && npm run preview',
		port: 5173,
		reuseExistingServer: !process.env.CI,
		env: {
			NODE_ENV: 'test'
		}
	},
	use: {
		baseURL: 'http://localhost:4173'
	},
	testDir: 'e2e'
});
