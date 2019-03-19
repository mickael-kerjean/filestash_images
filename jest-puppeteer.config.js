require('expect-puppeteer').setDefaultOptions({ timeout: 15000 });

let launch = {
    headless: false
};
if (process.env.CI === "true") {
    launch.headless = true
    launch.args = ['--headless', '--disable-gpu'];
}
module.exports = {
    launch: launch,
    browserContext: "default",
};
