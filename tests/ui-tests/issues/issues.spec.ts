import { test, expect } from "@playwright/test";
import todos from "../../../test-data/todos.json";
import { ProjectsPage } from "../../../pom/projectsPage";
import { IssuesPage } from "../../../pom/issuesPage";

test.beforeEach(async ({ page }) => {
  await test.step("Default user is logged in via API and starts on the Projects Page", async () => {
    const projectsPage = new ProjectsPage(page);
    await projectsPage.navigateTo();

    await expect(page).toHaveURL(projectsPage.getPageUrl());

    await projectsPage.getProjectCardTitle("Project Jira Clone Software").click();
  });
});

test("Creates three todos", async ({ page }) => {
  const issuesPage = new IssuesPage(page);

  for (const todo of todos) {
    await issuesPage.createNewToDoIssue(todo);

    await expect(issuesPage.getSuccessMessageCreateIssue()).toBeVisible();

    await expect(issuesPage.getIssueLinkByName(todo.title)).toBeVisible();

    
  }
  await expect (page.locator('div').filter({ hasText: /^To do\( 4 \)$/ })).toBeVisible();
});
