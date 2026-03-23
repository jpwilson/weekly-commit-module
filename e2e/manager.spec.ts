import { test, expect } from "@playwright/test";

test.describe("Manager Roll-up Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/manager");
    await page.waitForLoadState("networkidle");
  });

  test("renders manager header", async ({ page }) => {
    await expect(page.getByText(/Team Roll.up/i)).toBeVisible();
  });

  test("shows manager overview badge", async ({ page }) => {
    await expect(page.getByText(/MANAGER/i).first()).toBeVisible();
  });

  test("displays total team commits", async ({ page }) => {
    await expect(page.getByText("142")).toBeVisible();
  });

  test("shows RCDO alignment percentage", async ({ page }) => {
    await expect(page.getByText("94%").first()).toBeVisible();
  });

  test("displays team matrix with members", async ({ page }) => {
    await expect(page.getByText("Jane Doe")).toBeVisible();
    await expect(page.getByText("Marcus Kaine")).toBeVisible();
    await expect(page.getByText("Sarah Lopez")).toBeVisible();
  });

  test("shows member roles", async ({ page }) => {
    await expect(page.getByText("Senior Engineer")).toBeVisible();
    await expect(page.getByText("Fullstack Dev")).toBeVisible();
  });

  test("shows commitment status badges", async ({ page }) => {
    const locked = page.getByText("LOCKED");
    expect(await locked.count()).toBeGreaterThanOrEqual(1);
  });

  test("shows throughput multipliers", async ({ page }) => {
    await expect(page.getByText(/12\.4x/)).toBeVisible();
  });

  test("has drill-down links", async ({ page }) => {
    const drillDown = page.getByText(/Drill Down/i);
    expect(await drillDown.count()).toBeGreaterThanOrEqual(1);
  });

  test("shows system log", async ({ page }) => {
    await expect(page.getByText(/System Log/i).first()).toBeVisible();
  });

  test("shows productivity section", async ({ page }) => {
    await expect(page.getByText(/Productivity/i).first()).toBeVisible();
  });
});
