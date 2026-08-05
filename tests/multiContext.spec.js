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
});
//here two pages are created from two different context
//stating login is isolated to only context1
test("verify isolation",async({browser})=>{
    const context1= await browser.newContext();
    const page1 = await context1.newPage();
    await page1.goto("https://www.saucedemo.com");
     await page1.locator('[data-test="username"]').fill("standard_user");
    await page1.locator('[data-test="password"]').fill("secret_sauce");
    await page1.locator('[data-test="login-button"]').click();
    await expect(page1).toHaveURL(/inventory/);
    console.log("the user is in the inventory list");
    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto("https://www.saucedemo.com/inventory.html");
    await page2.pause();
    await expect(page2).toHaveURL(/saucedemo/);
    console.log("page2 is not logged in so it doesnot navigate to inventory, it stays in saucedemo login page");

});
//every page created using the context will already have the login access
//but make sure fir the login script is run, then we can reuse the authentication
test("create context with authentication",async({browser})=>{
const context1 = await browser.newContext({storageState:"auth/user.json"});
const page1 = await context1.newPage();
await page1.goto("https://www.saucedemo.com/inventory.html");
await expect(page1).toHaveURL(/inventory/);
console.log("user lands in the inventory page without login");
});