import { test, expect } from "@playwright/test";

test.describe("Analytics Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/analytics");
    await page.waitForLoadState("networkidle");
  });

  test("renders analytics header", async ({ page }) => {
    await expect(page.getByText(/Analytics/i).first()).toBeVisible();
  });

  test("shows period selector buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: /week/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /month/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /quarter/i })).toBeVisible();
  });

  test("displays total commits stat", async ({ page }) => {
    await expect(page.getByText("142")).toBeVisible();
  });

  test("shows carry-forward rate", async ({ page }) => {
    await expect(page.getByText("18.5%")).toBeVisible();
  });

  test("shows velocity chart section", async ({ page }) => {
    await expect(page.getByText(/Weekly Velocity/i)).toBeVisible();
  });

  test("shows RCDO alignment trend section", async ({ page }) => {
    await expect(page.getByText(/RCDO Alignment Trend/i).first()).toBeVisible();
  });

  test("shows commits by category", async ({ page }) => {
    await expect(page.getByText(/Commits by Category/i)).toBeVisible();
  });

  test("shows top linked outcomes", async ({ page }) => {
    await expect(page.getByText(/Top Linked Outcomes/i)).toBeVisible();
  });

  test("shows team member activity", async ({ page }) => {
    await expect(page.getByText(/Team Member Activity/i)).toBeVisible();
    await expect(page.getByText("Jane Doe")).toBeVisible();
  });

  test("period selector toggles active state", async ({ page }) => {
    const weekBtn = page.getByRole("button", { name: "week" });
    await weekBtn.click();
    await expect(weekBtn).toHaveClass(/bg-primary/);
  });
});
