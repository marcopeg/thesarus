
const executeTest = require('./execute-test')

module.exports = (tests, results) => (name, next) => {
    executeTest(tests[name])
        .then(res => {
            results.data[name] = res
            next()
        })
        .catch(err => {
            results.errors[name] = err
            next()
        })
}
