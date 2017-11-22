
module.exports = browser => browser.url('http://server:8080')
    .waitForVisible('[data-test="create-word"]', 5000)
    // .saveScreenshot('/usr/src/screenshots/home.png')
    .click('[data-test="create-word"]')
    .pause(500)
    // .saveScreenshot('/usr/src/screenshots/create-word.png')
    .setValue('[data-test="create-word-fld1"]', 'wordA')
    .setValue('[data-test="create-word-fld2"]', 'wordB')
    // .saveScreenshot('/usr/src/screenshots/create-word-filled.png')
    .click('[data-test="create-word-submit"]')
    .pause(500)
    // .saveScreenshot('/usr/src/screenshots/home-with-words.png')
    .getHTML('[data-test="words-list"]')
    .then((html) => {
        let result = 0
        result += html[0].indexOf('wordA')
        result += html[0].indexOf('wordC')

        //throw new Error('foo')

        if (result < 0) {
            throw new Error('words not found')
        }

        return 'ok'
    })
