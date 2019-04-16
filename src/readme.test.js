const files = require("../../test/e2e/helpers/files"),
      wait = require("./helpers/wait"),
      exec = require('child_process').exec;

describe('README::navigation', () => {
    it("gif::navigation", async () => {
        await page.goto("http://demo.filestash.app/login");
        await page.setViewport({width: 824, height: 360});

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
        await expect(page).toFill("form input[name=\"username\"]", process.env.USERNAME);
        await expect(page).toFill("form textarea[name=\"password\"]", process.env.PASSWORD);
        await expect(page).toClick("label input[type=\"checkbox\"]");
        await expect(page).toFill("form input[name=\"path\"]", "/home/app/");
        await expect(page).toClick("form button");
        await expect(page).toMatchElement(".component_loader", { timeout: 5000 });

        // now that we've logged in, let's navigate around
        await expect(page).toMatchElement(".list", { timeout: 20000 });
        await expect(page).toMatchElement(".component_filename", {
            text: "blog"
        });
        await wait.sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_0004.png"});
        await page.screenshot({path: "/tmp/screenshot/navigation_0005.png"});
        await page.evaluate(() => document.querySelector(".scroll-y").scrollBy(0, 112));
        await page.screenshot({path: "/tmp/screenshot/navigation_0006.png"});
        await files.navigateInFolder(expect, page, "blog");
        await expect(page).toMatchElement(".component_filename", {
            text: "docker-compose.yml",
            timeout: 5000
        });
        await wait.sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_0007.png"});

        // showcase the text editor
        await files.navigateInFile(expect, page, "docker-compose.yml");
        await expect(page).toMatchElement(".CodeMirror", {timeout: 5000});
        await wait.sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_0008.png"});
        await expect(page).toFill(".CodeMirror", "\n");
        await expect(page).toMatchElement(".component_fab", {timeout: 5000});
        await wait.sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/navigation_0009.png"});
        await exec("convert -delay 100 -loop 0 /tmp/screenshot/navigation_00{00..09}.png .assets/navigation.gif");
    }, 40000);

    it("gif::media", async () => {
        await page.goto("http://demo.filestash.app/login");
        await page.setViewport({width: 824, height: 360});

        await expect(page).toClick("button", { text: "SFTP", timeout: 10000 });
        await expect(page).toFillForm("form", {
            "hostname": "hal.kerjean.me",
            "username": process.env.USERNAME,
            "password": process.env.PASSWORD
        });
        await expect(page).toClick("form button");
        await expect(page).toMatchElement(".component_loader", { timeout: 5000 });
        await expect(page).toMatchElement(".list", { timeout: 30000 });

        await files.navigateInFolder(expect, page, "mickael");
        await files.navigateInFolder(expect, page, "photos");
        await files.navigateInFolder(expect, page, "iphone6");
        await files.navigateInFolder(expect, page, "photos");
        await expect(page).toMatchElement(".list", { timeout: 30000 });
        await wait.sleep(1000);
        await page.evaluate(() => document.querySelector(".scroll-y").scrollTo(0, 4635));
        await wait.sleep(1000);
        await page.evaluate(() => document.querySelector(".scroll-y").scrollTo(0, 4635));
        await wait.sleep(1000);
        await page.evaluate(() => document.querySelector(".scroll-y").scrollTo(0, 4635));
        await wait.sleep(5000);
        await page.screenshot({path: "/tmp/screenshot/media_0001.png"});

        await expect(page).toClick(".component_filename", { text: "IMG_0901.JPG", timeout: 5000 });
        await expect(page).toMatchElement(".component_loader", { timeout: 5000 });
        await expect(page).not.toMatchElement(".component_loader", { timeout: 5000 });
        await wait.sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/media_0002.png"});
        await expect(page).toClick(".component_icon[alt=\"info\"]", { timeout: 5000 });
        await wait.sleep(5000);
        await page.screenshot({path: "/tmp/screenshot/media_0003.png"});

        // the normal fullscreen doesn't work with puppeteer... so we hack something around
        //await expect(page).toClick(".component_icon[alt=\"fullscreen\"]", { timeout: 5000 });
        await page.evaluate(() => document.querySelector(".component_image_container").classList.add("fullscreen"));
        await page.evaluate(() => document.querySelector(".component_menubar").style.display = 'none');
        await page.evaluate(() => document.querySelector(".component_breadcrumb").style.display = 'none');
        await page.screenshot({path: "/tmp/screenshot/media_0004.png"});
        await expect(page).toFill(".component_pager form input", "259");
        await page.screenshot({path: "/tmp/screenshot/media_0005.png"});
        await page.keyboard.press('Enter');
        await wait.sleep(5000);
        await page.screenshot({path: "/tmp/screenshot/media_0006.png"});

        await page.evaluate(() => document.querySelector("img.photo").style.transform = "translateX(-50px)");
        await wait.sleep(1000)
        await page.screenshot({path: "/tmp/screenshot/media_0007.png"});
        await page.evaluate(() => document.querySelector("img.photo").style.transform = "translateX(-300px)");
        await wait.sleep(1000)
        await page.screenshot({path: "/tmp/screenshot/media_0008.png"});
        await expect(page).toClick(".component_icon[alt=\"arrow_right_white\"]", { timeout: 5000 });
        await wait.sleep(1000);
        await page.screenshot({path: "/tmp/screenshot/media_0009.png"});

        await page.evaluate(() => document.querySelector(".component_image_container").classList.remove("fullscreen"));
        await page.evaluate(() => document.querySelector(".component_menubar").style.display = "");
        await page.evaluate(() => document.querySelector(".component_breadcrumb").style.display = "");
        await page.screenshot({path: "/tmp/screenshot/media_0010.png"});

        await exec("convert -delay 100 -loop 0 /tmp/screenshot/media_00{01..10}.png .assets/photo_management.gif");
    }, 60000);

})
