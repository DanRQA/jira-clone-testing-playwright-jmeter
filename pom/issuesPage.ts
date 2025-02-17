import { Locator, Page } from "@playwright/test";

export class IssuesPage {
  private readonly page: Page;
  private readonly addNewToDoIssueLink: Locator;
  private readonly titleField: Locator;
  private readonly descriptionField: Locator;
  private readonly commentField: Locator;
  private readonly saveCommentButton: Locator;
  private readonly acceptButton: Locator;
  private readonly successMessageCreateIssue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewToDoIssueLink = page.getByRole("link", { name: "Add new To do issue" });
    this.titleField = page.getByRole("textbox", { name: "title" });
    this.descriptionField = page.getByRole("textbox", { name: "description" });
    this.commentField = page.getByRole("textbox", { name: "comment" });
    this.saveCommentButton = page.getByRole("button", { name: "Save" });
    this.acceptButton = page.getByRole("button", { name: "Accept" });
    this.successMessageCreateIssue = page.getByText("Issue created successfully");
  }

  async createNewToDoIssue(todo: {
    title: string;
    description: string;
    comment: string;
  }): Promise<void> {
    await this.addNewToDoIssueLink.click();
    await this.titleField.pressSequentially(todo.title, { delay: 100 });
    await this.descriptionField.pressSequentially(todo.description, { delay: 100 });
    await this.commentField.pressSequentially(todo.comment, { delay: 100 });
    await this.saveCommentButton.click();
    await this.acceptButton.click();
  }

  getIssueLinkByName(title: string): Locator {
    return this.page.getByRole("link", { name: title });
  }

  getSuccessMessageCreateIssue(): Locator {
    return this.successMessageCreateIssue;
  }
}
