import { Page, Locator } from "@playwright/test";

export class ProjectsPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getProjectsPageUrl(): string {
    return "/projects";
  }

  getAddProjectButton(): Locator {
    return this.page.getByRole("button", { name: "Add Project" });
  }

  getNewProjectsPageUrl(): string {
    return "/projects/new";
  }

  getUserAvatarButton(): Locator {
    return this.page.getByTestId('user-avatar');
  }

  getLogoutButton(): Locator {
    return this.page.getByRole("button", { name: "Log out" });
  }

  getTitleField(): Locator {
    return this.page.getByRole("textbox", { name: "Write the title" });
  }

  getDescriptionField(): Locator {
    return this.page.getByRole("textbox", { name: "Add a description" });
  }

  getAcceptButton(): Locator {
    return this.page.getByRole("button", { name: "Accept changes" });
  }

  getProjectsCard(): Locator {
    return this.page.locator('a[href^="/projects/"]:not([href="/projects/new"])');
  }

  async findLastProjectCard(projectName: string): Promise<Locator | null> {
    await this.getProjectsCard().last().waitFor();
    const projectCards = this.getProjectsCard();
    const projectCardsCount = await projectCards.count();
    for (let i = 0; i < projectCardsCount; i++) {
      const projectCard = projectCards.nth(i);
      const projectCardText = await projectCard.textContent();
      if (projectCardText?.includes(projectName)) {
        return projectCard;
      }
    }
    return null;
  }
}
