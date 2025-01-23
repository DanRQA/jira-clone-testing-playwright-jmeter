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
  await test.step("User is logged in via api and starts in the Projects Page", async (): Promise<void> => {
    await projectsPage.navigateTo();
    await expect(page).toHaveURL(projectsPage.getPageUrl());
  });
});

test("User is able to logout", async ({ page }: { page: Page }): Promise<void> => {
  const loginPage = new LoginPage(page);
  const projectsPage = new ProjectsPage(page);
  await test.step("User clicks on logout button", async (): Promise<void> => {
    await projectsPage.clickUserAvatarButton();
    await projectsPage.clickLogOutButton();
  });

  await test.step("User is back at login screen", async (): Promise<void> => {
    await expect(page).toHaveURL(loginPage.getPageUrl());
    await expect(loginPage.getLoginButton()).toBeVisible();
  });
});
