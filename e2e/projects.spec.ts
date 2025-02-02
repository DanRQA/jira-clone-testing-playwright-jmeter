import { test, expect, Page } from "@playwright/test";
import { ProjectsPage } from "../pom/projectsPage";
import { login } from "../api/loginApi";
import { faker } from "@faker-js/faker";
import * as dotenv from "dotenv";
dotenv.config();

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

test.beforeEach(async ({ page }: { page: Page }) => {
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
    await projectsPage.clickAddProjectBtn();
  });

  await test.step("User fills in project details and accepts", async () => {
    await projectsPage.fillProjectDetails(projectTitle, projectDescription);
    await projectsPage.clickAcceptBtn();
  });

  await test.step("Assert new project is visible in the Projects page", async () => {
    await expect(page).toHaveURL(projectsPage.getNewProjectsPageUrl());
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });
});

test("Default user can create a project and assign multiple users as owners", async ({
  page,
}: {
  page: Page;
}) => {
  const projectsPage = new ProjectsPage(page);
  const { projectTitle, projectDescription } = generateProjectDetails();

  await test.step("User clicks on Add Project Button", async () => {
    await projectsPage.clickAddProjectBtn();
  });

  await test.step("User fills in project details", async () => {
    await projectsPage.fillProjectDetails(projectTitle, projectDescription);
  });

  await test.step("User clicks checkbox to select each individual user from list", async () => {
    await projectsPage.selectAllUsers();
  });

  await test.step("User clicks accept button", async () => {
    await projectsPage.clickAcceptBtn();
  });

  await test.step("Assert new project is visible in the Projects page", async () => {
    await expect(page).toHaveURL(projectsPage.getNewProjectsPageUrl());
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });

  // Login as second user (AD_USER_ID)
  await test.step("Second user can access the project", async () => {
    const adUserId = process.env.AD_USER_ID;
    if (!adUserId) throw new Error("AD_USER_ID is not defined");
    await login(page, adUserId);
    await projectsPage.navigateTo();
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });

  // Login as third user (W_USER_ID)
  await test.step("Third user can access the project", async () => {
    const wUserId = process.env.W_USER_ID;
    if (!wUserId) throw new Error("W_USER_ID is not defined");
    await login(page, wUserId);
    await projectsPage.navigateTo();
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });
});

test("Project Owner is Able to Delete Project", async ({ page }: { page: Page }) => {
  const projectsPage = new ProjectsPage(page);

  const { projectTitle, projectDescription } = generateProjectDetails();

  await test.step("Create new project via API", async () => {
    const postNewProject = await page.request.post("/projects/new", {
      form: {
        _data: "routes/__main/projects/new",
        title: projectTitle,
        description: projectDescription,
        user: process.env.DS_USER_ID || "",
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

  await test.step("Assert project is found", async () => {
    await expect(projectsPage.getProjectCardTitle(projectTitle)).toBeVisible();
  });

  await test.step("Find project by title", async () => {
    await projectsPage.clickDeleteProjectBtn(projectTitle);
  });

  await test.step("Enter delete project modal", async () => {
    await expect(projectsPage.getDeleteIssueModal()).toBeVisible();
  });

  await test.step("Delete the project", async () => {
    await projectsPage.clickToConfirmProjectDeletion();
  });

  await test.step("Assert delete project modal closed ", async () => {
    await expect(projectsPage.getDeleteIssueModal()).not.toBeVisible();
  });

  await test.step("Assert project is no longer found", async () => {
    await expect(projectsPage.getProjectCardTitle(projectTitle)).not.toBeVisible();
  });
});
