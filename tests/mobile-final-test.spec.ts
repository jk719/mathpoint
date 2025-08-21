import { test, expect } from '@playwright/test';

test.describe('Mobile Assessment - Final Check', () => {
  test('complete mobile assessment flow', async ({ page, isMobile }) => {
    if (!isMobile) return;
    
    await page.goto('/');
    
    // Login flow
    await page.click('.mobile-menu-toggle');
    await page.fill('input[placeholder="Username"]', 'testuser');
    await page.fill('input[placeholder="Password"]', 'testpass');
    await page.click('.login-btn');
    
    // Wait for assessment to load
    await expect(page.locator('.mathpoint-theme')).toBeVisible();
    
    // Check if we're on start screen
    const startButton = page.locator('.start-assessment-btn');
    if (await startButton.isVisible()) {
      console.log('Found start button, clicking...');
      await startButton.click();
      
      // Wait for question to appear
      await expect(page.locator('.question-container')).toBeVisible();
      await page.waitForTimeout(1000); // Wait for any animations
    }
    
    // Take screenshot of actual question state
    await page.screenshot({ path: 'mobile-final-test.png', fullPage: true });
    
    // Check for question content
    const questionPrompt = page.locator('.question-prompt, .smart-mc .question-prompt');
    const hasQuestionContent = await questionPrompt.count() > 0;
    console.log('Has question content:', hasQuestionContent);
    
    if (hasQuestionContent) {
      const questionText = await questionPrompt.first().textContent();
      console.log('Question text:', questionText?.substring(0, 100) + '...');
    }
    
    // Check answer options
    const answerOptions = page.locator('.smart-mc li, .choice-option');
    const optionCount = await answerOptions.count();
    console.log('Answer options found:', optionCount);
    
    // Check if content fits in viewport
    const viewport = await page.evaluate(() => ({
      width: window.innerWidth,
      height: window.innerHeight,
      scrollHeight: document.documentElement.scrollHeight
    }));
    
    console.log('Final viewport info:', viewport);
    console.log('Content overflows:', viewport.scrollHeight > viewport.height);
  });
});