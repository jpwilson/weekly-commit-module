import { test, expect } from "@playwright/test";

test.describe("Login Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });

  test("renders login page with ST6 branding", async ({ page }) => {
    await expect(page.getByText("ST6").first()).toBeVisible();
    await expect(page.getByText("Weekly Commit Module")).toBeVisible();
  });

  test("shows authentication form", async ({ page }) => {
    await expect(page.getByText("Authenticate")).toBeVisible();
    await expect(page.getByPlaceholder("operator@st6.io")).toBeVisible();
  });

  test("has sign in button", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Sign In" })).toBeVisible();
  });

  test("has demo access buttons", async ({ page }) => {
    await expect(page.getByText("Individual View")).toBeVisible();
    await expect(page.getByText("Manager View")).toBeVisible();
  });

  test("demo individual button navigates to dashboard", async ({ page }) => {
    await page.getByRole("button", { name: "Individual View" }).click();
    await page.waitForURL("**/dashboard", { timeout: 10000 });
    await expect(page.getByRole("heading", { name: /Week \d+/i, level: 1 })).toBeVisible({ timeout: 10000 });
  });

  test("demo manager button navigates to manager view", async ({ page }) => {
    await page.getByRole("button", { name: "Manager View" }).click();
    await page.waitForURL("**/manager", { timeout: 10000 });
    await expect(page.getByText("Team Roll-up")).toBeVisible({ timeout: 10000 });
  });

  test("shows terminal footer", async ({ page }) => {
    await expect(page.getByText(/ST6 TERMINAL SYSTEM/)).toBeVisible();
  });
});
