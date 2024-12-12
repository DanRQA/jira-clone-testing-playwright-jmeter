import { test, expect, Page } from "@playwright/test";
import { ProjectsPage } from "../pom/projectsPage";
import { login } from "../api/loginApi";

test.beforeEach(async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
  if (!baseURL) {
    throw new Error("baseURL is not defined");
  }
  await login(page, baseURL);

  const projectsPage = new ProjectsPage(page);
  await test.step("User starts in the Projects Page after login", async () => {
    await page.goto(`${baseURL}/projects`);
    await expect(page).toHaveURL(projectsPage.getProjectsPageUrl());
  });
});

test("User is able to add a project", async ({ page }: { page: Page }) => {
  const projectsPage = new ProjectsPage(page);
  await test.step("User clicks on Add Project Button", async () => {
    await projectsPage.getAddProjectButton().click();
  });
});
