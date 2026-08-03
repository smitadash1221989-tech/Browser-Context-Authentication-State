const{test,expect} = require('@playwright/test');
test("login test", async({page})=>{
    await page.goto("https://www.saucedemo.com/");
    await page.locator('[data-test="username"]').fill("standard_user");
    await page.locator('[data-test="password"]').fill("secret_sauce");
    await page.locator('[data-test="login-button"]').click();
    //wait for successful login
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator(('[data-test="title"]'))).toContainText('Products');

    //auth/user.json file is created that stores local session,cookies, storagesession exactly like browser
    await page.context().storageState({path:'auth/user.json'});
    //now save the authenticated state.
    console.log("authentication done successfully");

})