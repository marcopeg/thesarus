const webdriverio = require('webdriverio')
const config = require('./config')
const injectScriptCmd = require('../lib/wdio-inject-script')

const webdriverConf = {
    host: config.getStrict('SELENIUM_HOST'),
    port: config.getStrict('SELENIUM_PORT'),
    desiredCapabilities: {
        browserName: config.getStrict('SELENIUM_BROWSER')
    },
}

module.exports = testHandler => new Promise((resolve, reject) => {
    let browser = webdriverio.remote(webdriverConf).init();

    injectScriptCmd(browser)

    try {
        testHandler(browser)
            .then(res => {
                browser.end()
                resolve(res)
            })
            .catch(err => {
                browser.end()
                reject(err)
            })
    } catch(e) {
        browser.end()
        reject(e.message)
    }
})
