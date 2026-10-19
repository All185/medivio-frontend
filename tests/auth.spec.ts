import { test, expect } from '@playwright/test';

test('page login se charge', async ({ page }) => {
  await page.goto('/login');
  await expect(page.locator('input[type="email"]')).toBeVisible();
  await expect(page.locator('input[type="password"]')).toBeVisible();
});

test('login avec mauvais identifiants affiche une erreur', async ({ page }) => {
  await page.goto('/login');
  await page.fill('input[type="email"]', 'faux@test.com');
  await page.fill('input[type="password"]', 'mauvaismdp');
  await page.click('button[type="submit"]');
  await expect(page.locator('text=/incorrect|invalide|erreur/i')).toBeVisible({ timeout: 10000 });
});

test('page demande-acces se charge', async ({ page }) => {
  await page.goto('/demande-acces');
  await expect(page.locator('input[name="rpps"]')).toBeVisible();
});

test('RPPS invalide bloque la soumission', async ({ page }) => {
  await page.goto('/demande-acces');
  await page.fill('input[name="rpps"]', '12345');
  await expect(page.locator('text=/11 chiffres/i')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeDisabled();
});
