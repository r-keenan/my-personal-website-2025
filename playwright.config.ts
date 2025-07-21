import { defineConfig } from '@playwright/test';

const portNum = 4173;

export default defineConfig({
	globalSetup: './e2e/globalSetup.ts',
	webServer: {
		command: 'npm run build && npm run preview',
		port: portNum,
		reuseExistingServer: !process.env.CI,
		env: {
			NODE_ENV: 'test'
		}
	},
	use: {
		baseURL: `http://localhost:${portNum}`
	},
	testDir: 'e2e'
});
