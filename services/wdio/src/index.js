
const jsonfile = require('jsonfile')
const runTests = require('./lib/run-tests')
const clearLog = require('./lib/clear-log')

runTests('/usr/src/app/tests', (tests, results) => {
    let reportsPath = '/usr/src/reports/'
    let reportTitle = null
    let reportPath = null

    if (results.hasErrors) {
        reportTitle = 'SHIT HAPPENS :-('
        reportPath = reportsPath + Date.now() + '.failed.json'

    } else {
        reportTitle = 'Everything was good today!'
        reportPath = reportsPath + Date.now() + '.json'
    }

    // produce reports in production mode only
    if (process.env.NODE_ENV === 'production') {
        jsonfile.writeFileSync(reportPath, results, {spaces: 2})
        clearLog(reportTitle, reportPath)

    // print out report in development mode
    } else {
        clearLog(reportTitle, results)
    }
})
