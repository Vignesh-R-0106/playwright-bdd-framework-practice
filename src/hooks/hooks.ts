import {
  BeforeAll,
  AfterAll,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, Browser } from "@playwright/test";
import { CustomWorld } from "../support/world";
import fs from "fs";
import path from "path";

setDefaultTimeout(60 * 1000);

let browser: Browser;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: process.env.CI ? true : false,
  });

  console.log("🚀 Browser Launched");
});

Before(async function (this: CustomWorld) {
  if (!browser) {
    throw new Error("Browser not initialized");
  }

  this.context = await browser.newContext({
    recordVideo: {
      dir: "videos/",
    },
  });

  this.page = await this.context.newPage();

  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  console.log("✅ Scenario Started");
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === "FAILED") {
    if (this.page) {
      const screenshot = await this.page.screenshot();
      await this.attach(screenshot, "image/png");
    }
  }

  await this.context.close();
});

AfterAll(async function () {
  if (browser) {
    await browser.close();
    console.log("🛑 Browser Closed");
  }
});
