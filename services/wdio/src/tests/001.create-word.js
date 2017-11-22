
module.exports = browser => browser.url('http://server:8080')
    .waitForVisible('body', 5000)
    .saveScreenshot('/usr/src/screenshots/home.png')
    .then(() => 'yoho!')
