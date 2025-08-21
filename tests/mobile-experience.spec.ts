import { test, expect } from '@playwright/test';

test.describe('MathPoint Mobile Experience', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display welcome page correctly on mobile', async ({ page, isMobile }) => {
    // Check if welcome message is visible
    await expect(page.locator('h1', { hasText: 'MathPoint' })).toBeVisible();
    await expect(page.locator('h2', { hasText: 'Where Math Meets Mastery' })).toBeVisible();
    
    // Check features are displayed properly
    const features = page.locator('.feature');
    await expect(features).toHaveCount(4);
    
    if (isMobile) {
      // On mobile, features should stack vertically
      const featuresGrid = page.locator('.features');
      const gridColumns = await featuresGrid.evaluate(el => 
        window.getComputedStyle(el).getPropertyValue('grid-template-columns')
      );
      expect(gridColumns).toBe('1fr');
    }
  });

  test('should handle mobile login flow correctly', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    // Check if mobile menu toggle is visible
    await expect(page.locator('.mobile-menu-toggle')).toBeVisible();
    
    // Click mobile menu toggle
    await page.click('.mobile-menu-toggle');
    
    // Check if header right section opens
    await expect(page.locator('.header-right.menu-open')).toBeVisible();
    
    // Fill login form
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');
    
    // Submit login
    await page.click('.login-btn');
    
    // Should be authenticated now
    await expect(page.locator('.app-tabs')).toBeVisible();
  });

  test('should display assessment interface correctly on mobile', async ({ page, isMobile }) => {
    // Login first
    if (isMobile) {
      await page.click('.mobile-menu-toggle');
    }
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');
    await page.click('.login-btn');
    
    // Wait for assessment to load
    await expect(page.locator('.mathpoint-theme')).toBeVisible();
    
    // Check stats dashboard
    const statCards = page.locator('.stat-card');
    await expect(statCards).toHaveCount(4);
    
    if (isMobile) {
      // On mobile, stats should be in 2x2 grid
      const dashboard = page.locator('.stats-dashboard');
      const gridColumns = await dashboard.evaluate(el => 
        window.getComputedStyle(el).getPropertyValue('grid-template-columns')
      );
      expect(gridColumns).toContain('1fr 1fr');
    }
  });

  test('should handle whiteboard interface on mobile', async ({ page, isMobile }) => {
    // Login and navigate to whiteboard
    if (isMobile) {
      await page.click('.mobile-menu-toggle');
    }
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');
    await page.click('.login-btn');
    
    // Click whiteboard tab
    await page.click('button:has-text("Whiteboard")');
    
    // Check whiteboard components are visible
    await expect(page.locator('.whiteboard-container')).toBeVisible();
    await expect(page.locator('.toolbar')).toBeVisible();
    await expect(page.locator('.whiteboard-canvas')).toBeVisible();
    
    if (isMobile) {
      // Check toolbar wraps on mobile
      const toolbar = page.locator('.toolbar');
      const flexWrap = await toolbar.evaluate(el => 
        window.getComputedStyle(el).getPropertyValue('flex-wrap')
      );
      expect(flexWrap).toBe('wrap');
    }
  });

  test('should have proper touch targets on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    // Login first
    await page.click('.mobile-menu-toggle');
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');
    await page.click('.login-btn');
    
    // Check navigation buttons have minimum touch target size (44px)
    const navButtons = page.locator('.nav-button');
    const buttonCount = await navButtons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = navButtons.nth(i);
      const boundingBox = await button.boundingBox();
      if (boundingBox) {
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('should prevent horizontal scroll on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    // Check body and root elements don't allow horizontal scroll
    const bodyOverflow = await page.evaluate(() => 
      window.getComputedStyle(document.body).getPropertyValue('overflow-x')
    );
    expect(bodyOverflow).toBe('hidden');
    
    // Check viewport width doesn't exceed screen
    const viewportWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const screenWidth = await page.evaluate(() => window.innerWidth);
    expect(viewportWidth).toBeLessThanOrEqual(screenWidth + 1); // Allow 1px tolerance
  });

  test('should handle iOS safe area on mobile Safari', async ({ page, browserName, isMobile }) => {
    if (!isMobile || browserName !== 'webkit') return;
    
    // Login and check app content height accounts for safe area
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');
    await page.click('.login-btn');
    
    // Check if safe area insets are being used
    const appContent = page.locator('.app-content');
    const computedHeight = await appContent.evaluate(el => 
      window.getComputedStyle(el).getPropertyValue('height')
    );
    
    // Should include env(safe-area-inset-bottom) for iOS
    expect(computedHeight).toContain('env');
  });

  test('should have readable text sizes on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    // Check minimum font sizes for readability
    const textElements = [
      '.welcome-message h1',
      '.welcome-message h2', 
      '.welcome-message p',
      '.feature h3',
      '.feature p'
    ];
    
    for (const selector of textElements) {
      const element = page.locator(selector).first();
      if (await element.count() > 0) {
        const fontSize = await element.evaluate(el => 
          parseInt(window.getComputedStyle(el).getPropertyValue('font-size'))
        );
        expect(fontSize).toBeGreaterThanOrEqual(14); // Minimum readable size
      }
    }
  });

  test('should handle form inputs properly on mobile', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    // Click mobile menu to open login form
    await page.click('.mobile-menu-toggle');
    
    // Check input font size prevents iOS zoom
    const inputs = page.locator('input[type="text"], input[type="password"]');
    const inputCount = await inputs.count();
    
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const fontSize = await input.evaluate(el => 
        parseInt(window.getComputedStyle(el).getPropertyValue('font-size'))
      );
      expect(fontSize).toBeGreaterThanOrEqual(16); // Prevents iOS zoom
    }
  });
});