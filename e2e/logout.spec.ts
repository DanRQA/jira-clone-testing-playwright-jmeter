import { test, expect, Page } from "@playwright/test";
import { ProjectsPage } from "../pom/projectsPage";
import { login } from "../api/loginApi";
import { LoginPage } from "../pom/loginPage";

test.beforeEach(async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
  if (!baseURL) {
    throw new Error("baseURL is not defined");
  }
  await login(page, baseURL);

  const projectsPage = new ProjectsPage(page);
  await test.step("User is logged in via api and starts in the Projects Page", async () => {
    await page.goto(`${baseURL}/projects`);
    await expect(page).toHaveURL(projectsPage.getProjectsPageUrl());
  });
});

test("User is able to logout", async ({ page }: { page: Page }) => {
  const loginPage = new LoginPage(page);
  const projectsPage = new ProjectsPage(page);
  await test.step("User clicks on logout button", async () => {
    await projectsPage.getUserAvatarButton().click();
    await projectsPage.getLogoutButton().click();
  });

  await test.step("User is back at login screen", async () => {
    await expect(page).toHaveURL(loginPage.getLoginPageUrl());
    await expect(loginPage.getLoginButton()).toBeVisible();
  });
});
