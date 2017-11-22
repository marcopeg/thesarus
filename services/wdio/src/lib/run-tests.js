const requireDir = require('require-dir')
const async = require('async')

const processTest = require('./process-test')

module.exports = (sourceFolder, done) => {
    let tests = requireDir(sourceFolder)
    let now = new Date()
    let results = {
        date: now.toString(),
        data: {},
        hasErrors: false,
        errors: {},
    }

    async.eachSeries(Object.keys(tests), processTest(tests, results), err => {
        if (err) {
            results.errors['__process'] = err
        }
        results.hasErrors = Object.keys(results.errors).length > 0
        done(tests, results)
    })
}
