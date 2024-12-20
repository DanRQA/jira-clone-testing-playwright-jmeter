import { test, expect, Page } from "@playwright/test";
import { ProjectsPage } from "../pom/projectsPage";
import { login } from "../api/loginApi";
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
  if (!baseURL) {
    throw new Error("baseURL is not defined");
  }
  await login(page, baseURL);

  const projectsPage = new ProjectsPage(page);
  await test.step("User is logged in via api and starts in the Projects Page", async () => {
    await expect(page).toHaveURL(projectsPage.getProjectsPageUrl());
  });
});

test("User is able to add a project", async ({ page }: { page: Page }) => {
  const projectsPage = new ProjectsPage(page);
  const projectTitle = `${faker.lorem.words(3)} Title`;
  const projectDescription = `${faker.lorem.sentence()} Description`;

  await test.step("User clicks on Add Project Button", async () => {
    await projectsPage.getAddProjectButton().click();
  });

  await test.step("User types project title", async () => {
    await projectsPage.setProjectTitle().pressSequentially(projectTitle, { delay: 100 });
  });

  await test.step("User types project description", async () => {
    await projectsPage.setProjectDescription().pressSequentially(projectDescription, { delay: 100 });
  });

  await test.step("User clicks accept button", async () => {
    await projectsPage.getAcceptButton().click();
  });

  await test.step("Assert new project is visible in the Projects page", async () => {
    await expect(page).toHaveURL(projectsPage.getProjectsPageUrl());
    const projectCard = await projectsPage.findLastProjectCard(projectTitle);
    expect(projectCard).not.toBeNull();
  });
});
