import { test, expect } from '@playwright/test';

const combos = [
  { brand: 'default', theme: 'light' },
  { brand: 'default', theme: 'dark' },
  { brand: 'figjam',  theme: 'light' },
  { brand: 'figjam',  theme: 'dark' }
];

const stories = [
  'ui-button--default',
  'ui-input--default',
  'ui-dialog--default'
];

for (const c of combos) {
  for (const s of stories) {
    test(`snap ${s} [${c.brand}/${c.theme}]`, async ({ page }) => {
      await page.goto(`/iframe.html?id=${s}`);
      await page.evaluate(({ brand, theme }) => {
        document.documentElement.setAttribute('data-brand', brand);
        document.documentElement.setAttribute('data-theme', theme);
      }, c);
      await page.waitForTimeout(50);
      expect(await page.screenshot()).toMatchSnapshot(`${s}--${c.brand}-${c.theme}.png`);
    });
  }
}

