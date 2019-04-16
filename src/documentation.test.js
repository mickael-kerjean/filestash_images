const wait = require("./helpers/wait");

describe("website::documentation", () => {
    beforeAll(async () => {
        await page.setViewport({width: 824, height: 360});
    }, 20000);

    it("/docs/configuration::0", async () => {
        await page.goto("http://files.kerjean.me");
        await expect(page).toMatchElement(".component_loader", { timeout: 5000 });
        await expect(page).not.toMatchElement(".component_loader", { timeout: 5000 });
        await expect(page).toMatchElement("form", { timeout: 5000 });
        await wait.sleep(2000)
        await page.screenshot({path: "/tmp/screenshot/documentation_config0.png"});
    }, 10000);

    it("/docs/configuration::1", async () => {
        await page.goto("http://files.kerjean.me/admin");
        await expect(page).toFill("form input", process.env.ADMIN, { timeout: 5000 });
        await expect(page).toClick("form button");
        await expect(page).toMatchElement(".component_dashboard", { timeout: 10000 })
        await wait.sleep(2000);
        await page.evaluate(() => document.querySelector(".scroll-y").scrollTo(0, 380));
        await page.screenshot({path: "/tmp/screenshot/documentation_config1.png"});
    }, 30000);

    it("/docs/install-and-upgrade", async () => {
        await page.goto("http://files.kerjean.me/admin/setup");
        await sleep(2000);
        await page.screenshot({path: "/tmp/screenshot/documentation_install_and_upgrade.png"});
    }, 30000);

});

function sleep(t = 1000) {
    return new Promise((done) => {
        setTimeout(done, t);
    });
}
