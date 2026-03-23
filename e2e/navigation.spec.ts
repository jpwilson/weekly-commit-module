import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("root redirects to dashboard", async ({ page }) => {
    await page.goto("/");
    await page.waitForURL("**/dashboard", { timeout: 10000 });
    await expect(page.getByText(/Week/i).first()).toBeVisible();
  });

  test("can navigate between pages", async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");

    // Navigate to reconciliation
    await page.getByRole("link", { name: "Reconciliation" }).click();
    await page.waitForURL("**/reconciliation");
    await expect(page.getByText(/Session Reconciliation/i)).toBeVisible();

    // Navigate to manager
    await page.getByRole("link", { name: "Manager" }).click();
    await page.waitForURL("**/manager");
    await expect(page.getByText(/Team Roll.up/i)).toBeVisible();

    // Navigate to analytics
    await page.getByRole("link", { name: "Analytics" }).click();
    await page.waitForURL("**/analytics");
    await expect(page.getByText(/Analytics/i).first()).toBeVisible();
  });

  test("ST6 logo links to dashboard", async ({ page }) => {
    await page.goto("/manager");
    await page.waitForLoadState("networkidle");
    await page.getByRole("link", { name: "ST6" }).first().click();
    await page.waitForURL("**/dashboard");
  });
});
