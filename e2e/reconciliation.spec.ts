import { test, expect } from "@playwright/test";

test.describe("Reconciliation View", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/reconciliation");
    await page.waitForLoadState("networkidle");
  });

  test("renders the reconciliation header", async ({ page }) => {
    await expect(page.getByText(/Session Reconciliation/i)).toBeVisible();
  });

  test("shows reconciliation status", async ({ page }) => {
    await expect(page.getByText(/RECONCIL/i).first()).toBeVisible();
  });

  test("displays planned commits with details", async ({ page }) => {
    await expect(page.getByText("Refactor Auth Middleware")).toBeVisible();
  });

  test("shows Done and Carry Forward options", async ({ page }) => {
    const doneLabels = page.getByText(/Done/i);
    expect(await doneLabels.count()).toBeGreaterThan(0);
  });

  test("has outcome notes textareas", async ({ page }) => {
    const textareas = page.locator("textarea");
    expect(await textareas.count()).toBeGreaterThan(0);
  });

  test("pre-fills notes for carry-forward items", async ({ page }) => {
    await expect(
      page.getByText(/Dependency block|Engine team/i)
    ).toBeVisible();
  });

  test("shows action buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Save Draft/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Finalize/i })).toBeVisible();
  });
});
