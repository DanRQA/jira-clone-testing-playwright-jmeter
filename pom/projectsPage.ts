import { Page, Locator } from "@playwright/test";

export class ProjectsPage {
  private readonly page: Page;
  private readonly url: string;
  private readonly newProjectUrl: string;
  private readonly addProjectBtn: Locator;
  private readonly getProjectTitle: Locator;
  private readonly getProjectDescription: Locator;
  private readonly acceptBtn: Locator;
  private readonly userCheckbox: Locator;
  private readonly logOutBtn: Locator;
  private readonly userAvatarBtn: Locator;
  private readonly deleteProjectBtn: Locator;
  private readonly deleteIssueTxt: Locator;
  private readonly confirmDeleteProjectBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "/projects";
    this.newProjectUrl = "/projects/new";
    this.addProjectBtn = page.getByRole("button", { name: "Add Project" });
    this.getProjectTitle = page.getByRole("textbox", { name: "Write the title" });
    this.getProjectDescription = page.getByRole("textbox", { name: "Add a description" });
    this.acceptBtn = page.getByRole("button", { name: "Accept changes" });
    this.userCheckbox = page.getByRole("checkbox");
    this.logOutBtn = page.getByRole("button", { name: "Log out" });
    this.userAvatarBtn = page.getByTestId("user-avatar");
    this.deleteProjectBtn = page.getByTitle("Delete project");
    this.deleteIssueTxt = page.getByText("Delete issue?");
    this.confirmDeleteProjectBtn = page.getByRole("button", { name: "Delete" });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.url);
  }

  getPageUrl(): string {
    return this.url;
  }

  async clickAddProjectBtn(): Promise<void> {
    await this.addProjectBtn.click();
  }

  getNewProjectsPageUrl(): string {
    return this.newProjectUrl;
  }

  async selectAllUsers(): Promise<void> {
    for (const checkbox of await this.userCheckbox.all()) await checkbox.check();
  }

  async clickUserAvatarButton(): Promise<void> {
    await this.userAvatarBtn.click();
  }

  async clickLogOutBtn(): Promise<void> {
    await this.logOutBtn.click();
  }

  async fillProjectDetails(projectTitle: string, projectDescription: string): Promise<void> {
    await this.getProjectTitle.pressSequentially(projectTitle, { delay: 100 });
    await this.getProjectDescription.pressSequentially(projectDescription, { delay: 100 });
  }

  async clickAcceptBtn(): Promise<void> {
    await this.acceptBtn.click();
  }

  getProjectCardTitle(projectTitle: string): Locator {
    return this.page.getByRole("heading", { name: projectTitle });
  }

  async clickDeleteProjectBtn(projectTitle: string): Promise<void> {
    const projectCard = this.page
      .locator(`h2:has-text("${projectTitle}")`)
      .locator("..")
      .locator("..")
      .locator("..");
    await projectCard.locator(this.deleteProjectBtn).click();
  }

  getDeleteIssueModal(): Locator {
    return this.deleteIssueTxt;
  }

  async clickToConfirmProjectDeletion(): Promise<void> {
    await this.confirmDeleteProjectBtn.click();
  }
}
