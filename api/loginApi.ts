import { Page } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export async function login(page: Page, baseURL: string) {
  await page.request.post(`${baseURL}/login`, {
    form: {
      _data: "routes/login",
      user: process.env.USER_ID || "",
      _action: "setUser",
    },
  });
}
