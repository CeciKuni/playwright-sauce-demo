import { defineConfig, devices } from "@playwright/test";
import { getEnv } from "./config/environments";

const env = getEnv();

export default defineConfig({
  testDir: "./tests",

  fullyParallel: true,

  forbidOnly: !!process.env.CI,  

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  timeout: 60000,

  use: {
    baseURL: env.baseURL,
    trace: "on",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
