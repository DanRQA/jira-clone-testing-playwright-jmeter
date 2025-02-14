import { test as setup } from "@playwright/test";
import * as dotenv from "dotenv";
dotenv.config();

const authFile = "playwright/.auth/admin.json";

setup("Admin Login", async ({ request }) => {
  await request.post("/login", {
    form: {
      _data: "routes/login",
      user: process.env.DS_USER_ID || "",
      _action: "setUser",
    },
  });
  await request.storageState({ path: authFile });
});
