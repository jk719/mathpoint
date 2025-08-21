import { test, expect } from '@playwright/test';

test.describe('Mobile Screenshot Analysis', () => {
  test('capture mobile assessment view', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    await page.goto('/');
    
    // Take initial welcome screen screenshot
    await expect(page.locator('h1', { hasText: 'MathPoint' })).toBeVisible();
    await page.screenshot({ path: 'mobile-welcome.png', fullPage: true });
    
    // Login
    await page.click('.mobile-menu-toggle');
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');
    await page.click('.login-btn');
    
    // Wait for assessment to load
    await expect(page.locator('.mathpoint-theme')).toBeVisible();
    await page.screenshot({ path: 'mobile-assessment-start.png', fullPage: true });
    
    // Start assessment
    const startButton = page.locator('.start-assessment-btn');
    if (await startButton.isVisible()) {
      await startButton.click();
      await expect(page.locator('.question-container')).toBeVisible();
    }
    
    // Take screenshot of actual question view
    await page.screenshot({ path: 'mobile-assessment-question.png', fullPage: true });
    
    // Check if floating stats button is visible
    const floatingStats = page.locator('.mobile-stats-toggle');
    if (await floatingStats.isVisible()) {
      console.log('Floating stats button found');
    }
    
    // Get viewport and content dimensions
    const viewport = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight
    }));
    
    console.log('Viewport dimensions:', viewport);
    
    // Check if scrolling is required
    const needsScroll = viewport.scrollHeight > viewport.height;
    console.log('Requires scrolling:', needsScroll);
    
    // Get question container dimensions
    const questionContainer = page.locator('.question-container');
    const containerBox = await questionContainer.boundingBox();
    if (containerBox) {
      console.log('Question container:', containerBox);
    }
  });
});