import { test, expect, Page } from "@playwright/test";
import { ProjectsPage } from "../pom/projectsPage";
import { login } from "../api/loginApi";
import { faker } from "@faker-js/faker";

/**
 * Generates random project details using faker
 * @returns {{ projectTitle: string, projectDescription: string }} Object containing generated project title and description
 */
function generateProjectDetails() {
  return {
    projectTitle: `${faker.lorem.words(3)}`,
    projectDescription: `${faker.lorem.sentence()}`,
  };
}

/**
 * Asserts that a project card exists and contains the expected title
 * @param {ProjectsPage} projectsPage - The ProjectsPage instance
 * @param {string} projectTitle - The title of the project to find
 * @returns {Promise<void>}
 * @throws {Error} If project card is not found
 */
async function assertProjectCardExists(projectsPage: ProjectsPage, projectTitle: string) {
  const projectCard = await projectsPage.findLastProjectCard(projectTitle);
  await expect(projectCard).toContainText(projectTitle);
}

/**
 * Fills in the project details form with the provided title and description
 * @param {ProjectsPage} projectsPage - The ProjectsPage instance
 * @param {string} title - The title to enter in the project form
 * @param {string} description - The description to enter in the project form
 * @returns {Promise<void>}
 */
async function fillProjectDetails(projectsPage: ProjectsPage, title: string, description: string) {
  await projectsPage.getTitleField().pressSequentially(title, { delay: 100 });
  await projectsPage.getDescriptionField().pressSequentially(description, { delay: 100 });
}

test.beforeEach(async ({ page, baseURL }: { page: Page; baseURL?: string }) => {
  if (!baseURL) {
    throw new Error("baseURL is not defined");
  }
  // Default user login
  await login(page, baseURL); // uses DS_USER_ID by default

  const projectsPage = new ProjectsPage(page);
  await test.step("Default user is logged in via API and starts on the Projects Page", async () => {
    await expect(page).toHaveURL(projectsPage.getProjectsPageUrl());
  });
});

test("Default user is able to create a project", async ({ page }: { page: Page }) => {
  const projectsPage = new ProjectsPage(page);
  const { projectTitle, projectDescription } = generateProjectDetails();

  await test.step("User clicks on Add Project Button", async () => {
    await projectsPage.getAddProjectButton().click();
  });

  await test.step("User fills in project details", async () => {
    await fillProjectDetails(projectsPage, projectTitle, projectDescription);
  });

  await test.step("User clicks accept button", async () => {
    await projectsPage.getAcceptButton().click();
  });

  await test.step("Assert new project is visible in the Projects page", async () => {
    await expect(page).toHaveURL(projectsPage.getProjectsPageUrl());
    await assertProjectCardExists(projectsPage, projectTitle);
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
  const usersToSelect = [
    "Andy Davis",
    "Buzz Lightyear",
    "Emperor Zurg",
    "Jessie",
    "Little Green Men",
    "Mr Potato",
    "Ms Potato",
    "T-Rex",
    "Woody",
  ];

  await test.step("User clicks on Add Project Button", async () => {
    await projectsPage.getAddProjectButton().click();
  });

  await test.step("User fills in project details", async () => {
    await fillProjectDetails(projectsPage, projectTitle, projectDescription);
  });

  await test.step("User clicks checkbox to select each individual user from list", async () => {
    for (const userName of usersToSelect) {
      await page.locator("label").filter({ hasText: userName }).getByRole("checkbox").check();
    }
  });

  await test.step("User clicks accept button", async () => {
    await projectsPage.getAcceptButton().click();
  });

  await test.step("Assert new project is visible in the Projects page", async () => {
    await expect(page).toHaveURL(projectsPage.getProjectsPageUrl());
    await assertProjectCardExists(projectsPage, projectTitle);
  });

  // Login as second user (AD_USER_ID)
  await test.step("Second user can access the project", async () => {
    const adUserId = process.env.AD_USER_ID;
    if (!adUserId) throw new Error("AD_USER_ID is not defined");
    await login(page, baseURL, adUserId);
    await assertProjectCardExists(projectsPage, projectTitle);
  });

  // Login as third user (W_USER_ID)
  await test.step("Third user can access the project", async () => {
    const wUserId = process.env.W_USER_ID;
    if (!wUserId) throw new Error("W_USER_ID is not defined");
    await login(page, baseURL, wUserId);
    await assertProjectCardExists(projectsPage, projectTitle);
  });
});
