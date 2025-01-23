import { test, expect, Page } from "@playwright/test";
import { ProjectsPage } from "../pom/projectsPage";
import { login } from "../api/loginApi";
import { faker } from "@faker-js/faker";

/**
 * Generates random project details using faker
 * @returns {{ projectTitle: string, projectDescription: string }} Object containing generated project title and description
 */
function generateProjectDetails(): { projectTitle: string; projectDescription: string } {
  return {
    projectTitle: `${faker.lorem.words(3)}`,
    projectDescription: `${faker.lorem.sentence()}`,
  };
}

test.beforeEach(async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
  if (!baseURL) {
    throw new Error("baseURL is not defined");
  }
  // Default user login
  await login(page, baseURL); // uses DS_USER_ID by default

  const projectsPage = new ProjectsPage(page);
  await test.step("Default user is logged in via API and starts on the Projects Page", async () => {
    await projectsPage.navigateTo();
    await expect(page).toHaveURL(projectsPage.getPageUrl());
  });
});

test("Default user is able to create a project", async ({ page }: { page: Page }) => {
  const projectsPage = new ProjectsPage(page);
  const { projectTitle, projectDescription } = generateProjectDetails();

  await test.step("User clicks on Add Project Button", async () => {
    await projectsPage.clickAddProjectButton();
  });

  await test.step("User fills in project details and accepts", async () => {
    await projectsPage.fillProjectDetails(projectTitle, projectDescription);
    await projectsPage.clickAcceptButton();
  });

  await test.step("Assert new project is visible in the Projects page", async () => {
    await expect(page).toHaveURL(projectsPage.getNewProjectsPageUrl());
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });
});

test("Default user can create a project and assign multiple users as owners", async ({
  page,
  baseURL,
}: {
  page: Page;
  baseURL?: string;
}) => {
  if (!baseURL) throw new Error("baseURL is not defined");

  const projectsPage = new ProjectsPage(page);
  const { projectTitle, projectDescription } = generateProjectDetails();

  await test.step("User clicks on Add Project Button", async () => {
    await projectsPage.clickAddProjectButton();
  });

  await test.step("User fills in project details", async () => {
    await projectsPage.fillProjectDetails(projectTitle, projectDescription);
  });

  await test.step("User clicks checkbox to select each individual user from list", async () => {
    await projectsPage.selectAllUsers();
  });

  await test.step("User clicks accept button", async () => {
    await projectsPage.clickAcceptButton();
  });

  await test.step("Assert new project is visible in the Projects page", async () => {
    await expect(page).toHaveURL(projectsPage.getNewProjectsPageUrl());
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });

  // Login as second user (AD_USER_ID)
  await test.step("Second user can access the project", async () => {
    const adUserId = process.env.AD_USER_ID;
    if (!adUserId) throw new Error("AD_USER_ID is not defined");
    await login(page, baseURL, adUserId);
    await projectsPage.navigateTo();
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });

  // Login as third user (W_USER_ID)
  await test.step("Third user can access the project", async () => {
    const wUserId = process.env.W_USER_ID;
    if (!wUserId) throw new Error("W_USER_ID is not defined");
    await login(page, baseURL, wUserId);
    await projectsPage.navigateTo();
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });
});

//TODO: fix test
test.skip("Project Owner is Able to Delete Project", async ({
  page,
  baseURL,
}: {
  page: Page;
  baseURL?: string;
}) => {
  if (!baseURL) throw new Error("baseURL is not defined");
  const projectsPage = new ProjectsPage(page);
  const projectDescription = faker.lorem.sentence();
  const projectTitle = faker.lorem.words(3);

  await test.step("Create new project via API", async () => {
    const postNewProject = await page.request.post(`${baseURL}/projects/new`, {
      form: {
        _data: "routes/__main/projects/new",
        title: projectTitle,
        description: projectDescription,
        user: "1c6855bf-9a0f-4a45-9641-7b7c7855c570",
        _action: "upsert",
      },
    });

    if (!postNewProject.ok()) {
      throw new Error(`Failed to create project: ${postNewProject.status()}`);
    }
  });

  await test.step("Navigate to Projects page", async () => {
    await projectsPage.navigateTo();
  });

  await test.step("Find and delete the project", async () => {
    await page.getByRole("button", { name: "Open delete issue dialog" }).last().click();
    await page.getByRole("button", { name: "Delete" }).click();
  });

  await test.step("Wait for Delete Project Modal to close", async () => {
    await expect(page.getByText("Delete issue?")).not.toBeVisible();
  });

  await test.step("Verify project is no longer found", async () => {
    expect(page.getByRole("heading", { name: projectTitle })).toBeFalsy();
  });
});
