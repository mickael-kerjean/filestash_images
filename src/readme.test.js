const files = require("../../test/e2e/helpers/files");

describe('README::navigation', () => {
    beforeAll(async () => {
        await page.goto("http://127.0.0.1:8334");
        page.setViewport({width: 824, height: 360});
    })
    it("normal navigation", async () => {    
        // enter form data and take relevant screenshot
        await expect(page).toClick("button", { text: "SFTP", timeout: 10000 });
        await page.screenshot({path: "/tmp/screenshot/navigation_0000.png"});
        await expect(page).toFill("form input[name=\"hostname\"]", "ma");
        await page.screenshot({path: "/tmp/screenshot/navigation_0001.png"});
        await expect(page).toFill("form input[name=\"hostname\"]", "machine.example.com");
        await page.screenshot({path: "/tmp/screenshot/navigation_0002.png"})
        await expect(page).toFill("form input[name=\"username\"]", "username");
        await expect(page).toFill("form textarea[name=\"password\"]", "dummy password");
        await page.screenshot({path: "/tmp/screenshot/navigation_0003.png"});

        await expect(page).toFill("form input[name=\"hostname\"]", "hal.kerjean.me");
        await expect(page).toFill("form input[name=\"username\"]", "drone");
        await expect(page).toFill("form textarea[name=\"password\"]", "tXap67XRTX");
        await expect(page).toClick("label input[type=\"checkbox\"]");
        await expect(page).toFill("form input[name=\"path\"]", "/home/app/");
        await expect(page).toClick("form button");
        await expect(page).toMatchElement(".component_loader", { timeout: 5000 });

        // now that we've logged in, let's navigate around
        await sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_0004.png"});
        await expect(page).toMatchElement(".list", { timeout: 20000 });
        await expect(page).toMatchElement(".component_filename", {
            text: "blog"
        })
        await sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_0005.png"});
        await page.evaluate(() => document.querySelector(".scroll-y").scrollBy(0, 112));        
        await page.screenshot({path: "/tmp/screenshot/navigation_0006.png"});
        await files.navigateInFolder(expect, page, "blog");
        await expect(page).toMatchElement(".component_filename", {
            text: "docker-compose.yml",
            timeout: 5000
        })
        await sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_0007.png"});

        // Showcase the text editor
        await files.navigateInFile(expect, page, "docker-compose.yml");
        await expect(page).toMatchElement(".CodeMirror", {timeout: 5000});
        await sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_0008.png"});
        await expect(page).toFill(".CodeMirror", "\n");
        await expect(page).toMatchElement(".component_fab", {timeout: 5000});
        await sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_009.png"});

    }, 40000)

    it("navigation photos", async () => {
        
    }, 40000)
})


function sleep(t = 1000) {
    return new Promise((done) => {
        setTimeout(done, t);
    });
}
