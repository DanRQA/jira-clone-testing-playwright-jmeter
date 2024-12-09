import { test, expect, Page } from "@playwright/test";

test("Login as Default User", async ({ page }: { page: Page }) => {
  await test.step("Navigate to the login page", async () => {
    await page.goto("/");
  });

  await test.step("Assert the login page header", async () => {
    await expect(page.getByRole("heading", { name: "Select login user" })).toBeVisible();
  });

  await test.step("Click login button", async () => {
    await page.getByRole("button", { name: "Login" }).click();
  });

  await test.step("Assert correct URL after login", async () => {
    await expect(page).toHaveURL("/projects");
  });
});
