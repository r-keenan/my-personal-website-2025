import { defineConfig } from '@playwright/test';

const portNum = 5173;

export default defineConfig({
	webServer: {
		command: 'npm run dev',
		port: portNum,
		reuseExistingServer: !process.env.CI
	},
	use: {
		baseURL: `http://localhost:${portNum}`
	},
	testDir: 'e2e'
});
