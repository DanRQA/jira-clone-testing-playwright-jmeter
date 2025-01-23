import { Page, Locator } from "@playwright/test";

export class ProjectsPage {
  private readonly page: Page;
  private readonly url: string;
  private readonly newProjectUrl: string;
  private readonly addProjectButton: Locator;
  private readonly getProjectTitle: Locator;
  private readonly getProjectDescription: Locator;
  private readonly acceptButton: Locator;
  private readonly userCheckbox: Locator;
  private readonly logOutButton: Locator;
  private readonly userAvatarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "/projects";
    this.newProjectUrl = "/projects/new";
    this.addProjectButton = page.getByRole("button", { name: "Add Project" });
    this.getProjectTitle = page.getByRole("textbox", { name: "Write the title" });
    this.getProjectDescription = page.getByRole("textbox", { name: "Add a description" });
    this.acceptButton = page.getByRole("button", { name: "Accept changes" });
    this.userCheckbox = page.getByRole("checkbox");
    this.logOutButton = page.getByRole("button", { name: "Log out" });
    this.userAvatarButton = page.getByTestId("user-avatar");
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.url);
  }

  getPageUrl(): string {
    return this.url;
  }

  async clickAddProjectButton(): Promise<void> {
    await this.addProjectButton.click();
  }

  getNewProjectsPageUrl(): string {
    return this.newProjectUrl;
  }

  async selectAllUsers(): Promise<void> {
    for (const checkbox of await this.userCheckbox.all()) await checkbox.check();
  }

  async clickUserAvatarButton(): Promise<void> {
    await this.userAvatarButton.click();
  }

  async clickLogOutButton(): Promise<void> {
    await this.logOutButton.click();
  }

  async fillProjectDetails(projectTitle: string, projectDescription: string): Promise<void> {
    await this.getProjectTitle.pressSequentially(projectTitle, { delay: 100 });
    await this.getProjectDescription.pressSequentially(projectDescription, { delay: 100 });
  }

  async clickAcceptButton(): Promise<void> {
    await this.acceptButton.click();
  }

  getProjectCardTitle(projectTitle: string): Locator {
    return this.page.getByRole("heading", { name: projectTitle });
  }
}
