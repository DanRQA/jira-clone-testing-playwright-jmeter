import { Page, Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly url: string;
  private readonly loginPageHeader: Locator;
  private readonly userSelectDropdown: Locator;
  private readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.url = "/login";
    this.loginPageHeader = page.getByRole("heading", { name: "Select login user" });
    this.userSelectDropdown = page.getByRole("combobox", { name: "Open user select" });
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async navigateTo(): Promise<void> {
    await this.page.goto(this.url);
  }

  getPageUrl(): string {
    return this.url;
  }

  getLoginPageHeader(): Locator {
    return this.loginPageHeader;
  }

  getUserSelectDropDown(): Locator {
    return this.userSelectDropdown;
  }

  getLoginButton(): Locator {
    return this.loginButton;
  }

  async clickLoginButton(): Promise<void> {
    await this.getLoginButton().click();
  }
}
