import { test, expect, Page } from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import { ProjectsPage } from "../pom/projectsPage";

test("Login as default user", async ({ page, baseURL }: { page: Page, baseURL?: string }) => {
  const loginPage = new LoginPage(page);
  const projectsPage = new ProjectsPage(page);

  await test.step("Navigate to the login page", async () => {
    await page.goto(`${baseURL}/login`);
  });

  await test.step("Assert the login page header", async () => {
    await expect(loginPage.getLoginPageHeader()).toBeVisible();
  });

  await test.step("Assert user select dropdown is visible", async () => {
    await expect(loginPage.getUserSelectDropDown()).toBeVisible();
  });

  await test.step("Click login button", async () => {
    await loginPage.getLoginButton().click();
  });

  await test.step("Assert user is in the Projects Page after login", async () => {
    await expect(page).toHaveURL(projectsPage.getProjectsPageUrl());
  });
});
