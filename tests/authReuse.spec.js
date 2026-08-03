//Reuse The Authentication
const{test,expect} =require('@playwright/test');
test.use({
    storageState:'auth/user.json'
});
test("open application without login",async({page})=>{
        console.log(await page.context().storageState());

    await page.goto("https://www.saucedemo.com/inventory.html");
    await expect(page).toHaveURL(/inventory/);
    console.log("the user is loggedin already");
    await expect(page.locator(('[data-test="title"]'))).toContainText('Products');
    console.log("the title is product");
})