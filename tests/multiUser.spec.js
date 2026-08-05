//this will use multiple user using different authentication reuse
const{test,expect} = require('@playwright/test');
test("multilogin",async({page})=>{
await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    //wait for successful login
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(('[data-test="title"]'))).toContainText('Products');

    //auth/user.json file is created that stores local session,cookies, storagesession exactly like browser
    await page.context().storageState({path:'auth/admin.json'});
    //this will use multiple user using different authentication reuse
});
test("locked user",async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("problem_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    //wait for successful login
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(('[data-test="title"]'))).toContainText('Products');

    //auth/user.json file is created that stores local session,cookies, storagesession exactly like browser
    await page.context().storageState({path:'auth/locked.json'});
});
test("reuse without login",async({browser})=>{
    const context1 = await browser.newContext({storageState:"auth/admin.json"});
    
    const context2 = await browser.newContext({storageState:"auth/locked.json"});
    const page1 = await context1.newPage();
    const page2 = await context2.newPage();
    console.log(await context1.storageState());
    console.log(await context2.storageState());
    await page1.goto("https://www.saucedemo.com/inventory.html");
    await page2.goto("https://www.saucedemo.com/inventory.html");
    await expect(page1).toHaveURL(/inventory/);
    await expect(page2).toHaveURL(/inventory/);
})