import { Page } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Logs in to the application using the provided page and baseURL.
 *
 * @param {Page} page - The Playwright Page object to interact with.
 * @param {string} [userId] - The user ID to log in with. Defaults to the value of the DS_USER_ID environment variable.
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 */
export async function login(
  page: Page,
  userId: string = process.env.DS_USER_ID ?? ""
): Promise<void> {
  if (!userId) {
    throw new Error("User ID is required for login");
  }

  await page.request.post("/login", {
    form: {
      _data: "routes/login",
      user: userId,
      _action: "setUser",
    },
  });
}
