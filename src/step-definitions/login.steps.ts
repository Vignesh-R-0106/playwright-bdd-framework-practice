import { Given, When, Then } from "@cucumber/cucumber";
import { LoginPage } from "../pages/LoginPage";
import { testData } from "../utils/testData";

Given("User launch the application", async function () {
  this.loginPage = new LoginPage(this.page);
  await this.loginPage.navigate();
});

When("User login with valid admin credentials", async function () {
  await this.loginPage.loginWithCredentials(
    testData.validAdmin.username,
    testData.validAdmin.password,
  );
});

Then("User should see the admin dashboard", async function () {
  await this.loginPage.verifyDashboardVisible();
});
