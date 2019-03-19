describe('Login page', () => {
    it("takes a screenshot of the login page", async () => {
        await page.goto("http://files.kerjean.me/login");
        await expect(page).toMatchElement("form input", {timeout: 20000});
        await page.screenshot({path: "login.png"});
    }, 30000)
})
