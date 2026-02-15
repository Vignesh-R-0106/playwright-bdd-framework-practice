import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "@playwright/test";

// Set this to a very high value globally
setDefaultTimeout(60000);

let browser: Browser;

BeforeAll({ timeout: 60000 }, async function () {
  // Launching with extra arguments to bypass Windows permission checks
  browser = await chromium.launch({
    headless: false,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
});

Before({ name: "Setup", timeout: 60000 }, async function () {
  // Check if browser exists before creating context
  if (!browser) {
    throw new Error("Browser was not launched in BeforeAll!");
  }

  this.context = await browser.newContext();

  // Start tracing BEFORE opening the page
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  this.page = await this.context.newPage();
  console.log("✅ Page opened and Tracing started");

  // Direct assignment without the complexity of tracing first
  this.context = await browser.newContext();
  this.page = await this.context.newPage();

  console.log("✅ Page opened successfully");
});

After({ name: "Teardown and Trace Capture" }, async function () {
  if (this.context) {
    await this.context.close();
  }
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
  }
});
