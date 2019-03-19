describe('Admin page', () => {
    beforeAll(async () => {
        await page.goto("http://demo.filestash.app/admin");
    }, 20000);

    it("takes a screenshot of the dashboard", async () => {
        await page.screenshot({path: "trash.png"});
    }, 20000);
});
