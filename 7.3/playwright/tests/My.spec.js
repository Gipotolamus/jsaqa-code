const { describe } = require("node:test");
const user = require("../user");
const { test, expect } = require("@playwright/test");

describe("Авторизация", async ({ page }) => {
  test("Успешная авторизация", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(user.email);
    await page.getByPlaceholder("Пароль").click();
    await page.getByPlaceholder("Пароль").fill(user.password);
    await page.getByTestId("login-submit-btn").click();
    await page.waitForSelector("text=Моё обучение");
    await page.waitForURL("https://netology.ru/profile/8724044", { timeout: 5000 });
    await expect(page).toHaveURL("https://netology.ru/profile/8724044");
  });

  test("Неуспешная авторизация", async ({ page }) => {
    await page.goto("https://netology.ru/?modal=sign_in");
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder('Email').fill('ivankov@icloud.com');
    await page.getByPlaceholder('Пароль').click();
    await page.getByPlaceholder('Пароль').fill('1234qpwoei');
    await page.click('[data-testid="login-submit-btn"]');
    await page.waitForSelector('[data-testid="login-error-hint"]');

    const errorHint = await page.textContent(
      '[data-testid="login-error-hint"]'
    );
    await expect(errorHint).toContain("Вы ввели неправильно логин или пароль");
  });

  afterEach(async ({ browser }) => {
    if (browser) {
      await browser.close();
    }
  });
});
