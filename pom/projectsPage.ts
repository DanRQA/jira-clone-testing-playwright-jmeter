import { Page } from "@playwright/test";

export class ProjectsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToProjectsPage() {
    await this.page.goto(this.getProjectsPageUrl());
  }

  getProjectsPageUrl() {
    return "/projects";
  }

  getAddProjectButton() {
    return this.page.getByRole("button", { name: "Add Project" });
  }
}
