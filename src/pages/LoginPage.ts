import { Page, Locator, expect } from "@playwright/test";
import { config } from "../utils/config";

export class LoginPage {
  private readonly page: Page;
  private readonly userNameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly dashboardHeader: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userNameInput = page.getByPlaceholder("Username");
    this.passwordInput = page.getByPlaceholder("password");
    this.loginButton = page.getByRole("button", { name: "Login" });
    this.dashboardHeader = page.getByRole("heading", { name: "Dashboard" });
  }

  async navigate() {
    await this.page.goto(config.baseurl);
  }
  async loginWithCredentials(username: string, password: string) {
    await this.userNameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
  async verifyDashboardVisible() {
    await expect(this.dashboardHeader).toBeVisible({ timeout: 10000 });
  }
}
