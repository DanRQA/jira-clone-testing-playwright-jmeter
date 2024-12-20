import { Page } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

/**
 * Logs in to the application using the provided page and baseURL.
 *
 * @param {Page} page - The Playwright Page object to interact with.
 * @param {string} baseURL - The base URL of the application.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function login(page: Page, baseURL: string): Promise<void> {
  await page.request.post(`${baseURL}/login`, {
    form: {
      _data: "routes/login",
      user: process.env.USER_ID || "",
      _action: "setUser",
    },
  });
  await page.goto(`${baseURL}/projects`);
}
