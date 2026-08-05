const {test,expect} = require('@playwright/test');
//this shows that two context is created from one browser,two different page is created
//and the page are not the same, they work isolated, one is used to login, the other still remoains in the main page.
test("multiple browser context",async({browser})=>{
    const context1 = await browser.newContext();
    const context2 = await browser.newContext();
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    await page1.goto("https://www.saucedemo.com");
    await page2.goto("https://www.saucedemo.com");
    await page1.locator('[data-test="username"]').fill("standard_user");
    await page1.locator('[data-test="password"]').fill("secret_sauce");
    await page1.locator('[data-test="login-button"]').click();
    await expect(page1).toHaveURL(/inventory/);
    console.log("page1 landed on inventorylist");
    await expect(page2).toHaveURL(/saucedemo/);
    console.log("page2 is still in login page and not logged in");
    context1.close();
    context2.close();
})