import { Page } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToLoginPage() {
    await this.page.goto("/");
  }

  getLoginPageUrl() {
    return "/";
  }

  getLoginPageHeader() {
    return this.page.getByRole("heading", { name: "Select login user" });
  }

  getUserSelectDropDown() {
    return this.page.getByRole("combobox", { name: "Open user select" });
  }

  getLoginButton() {
    return this.page.getByRole("button", { name: "Login" });
  }
}
