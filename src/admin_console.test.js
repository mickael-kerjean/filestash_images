describe('Admin page', () => {
    beforeAll(async () => {
        await page.goto("http://demo.filestash.app/admin");
        await expect(page).toMatchElement("input[placeholder=\"Password\"]", {timeout: 20000});
        const password = "POUETTE";
        expect(page).toFill("input[placeholder=\"Password\"]", password);
        await page.keyboard.press('Enter');
    }, 20000);

    it("takes a screenshot of the dashboard", async () => {
        await page.screenshot({path: "trash.png"});
    }, 20000);
});
