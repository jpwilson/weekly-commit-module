import { test, expect } from "@playwright/test";

test.describe("Weekly Commit Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await page.waitForLoadState("networkidle");
  });

  test("renders the dashboard with Week header", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Week 12/i })).toBeVisible();
  });

  test("shows status badge", async ({ page }) => {
    await expect(page.getByText("Draft").first()).toBeVisible();
  });

  test("displays stats grid", async ({ page }) => {
    await expect(page.getByText(/Commit Density/i).first()).toBeVisible();
  });

  test("shows commit table with entries", async ({ page }) => {
    await expect(page.getByRole("heading", { name: /Backlog Commit|Engineering/i })).toBeVisible();
    await expect(page.locator('input[value="Refactor Auth Middleware"]')).toBeVisible();
  });

  test("shows commit IDs in ST6 format", async ({ page }) => {
    await expect(page.getByText("ST6-001")).toBeVisible();
    await expect(page.getByText("ST6-002")).toBeVisible();
  });

  test("displays RCDO links for commits", async ({ page }) => {
    await expect(
      page.getByText(/Operational Excellence|Platform Scalability|Customer-Centric/i).first()
    ).toBeVisible();
  });

  test("shows action buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Save Draft/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Lock Commits/i })).toBeVisible();
  });

  test("shows auto-saving indicator", async ({ page }) => {
    await expect(page.getByText(/AUTO.SAVING|Auto.Saving/i)).toBeVisible();
  });

  test("can add a new commit row", async ({ page }) => {
    const addButton = page.getByRole("button", { name: /Add Row/i });
    await addButton.click();
    // Count ST6- entries
    const commitIds = page.locator("text=/ST6-\\d{3}/");
    expect(await commitIds.count()).toBeGreaterThan(8);
  });

  test("commit name is editable in DRAFT state", async ({ page }) => {
    const input = page.locator('input[value="Refactor Auth Middleware"]');
    await expect(input).toBeVisible();
    await input.fill("Updated Auth Middleware");
    await expect(page.locator('input[value="Updated Auth Middleware"]')).toBeVisible();
  });

  test("shows category badges", async ({ page }) => {
    await expect(page.getByText("Critical Ops").first()).toBeVisible();
  });

  test("has navigation links in top nav", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Reconciliation" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Manager" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Analytics" })).toBeVisible();
  });

  test("has side navigation", async ({ page }) => {
    await expect(page.getByText("Weekly Commit Module")).toBeVisible();
  });

  test("shows terminal footer", async ({ page }) => {
    await expect(page.getByText(/ST6 TERMINAL/i)).toBeVisible();
  });
});
