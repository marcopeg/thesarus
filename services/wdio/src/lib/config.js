
let getStrict = key => {
    let val = process.env[key];

    if (val === undefined) {
        throw new Error('Undefined environment variable: ' + key)
        process.exit(1)
    }

    return val
}


let get = (key, defaultValue) => {

    // switch to strict mode in production
    if ('production' === process.env.NODE_ENV) {
        return getStrict(key)
    }

    let val = process.env[key];

    if (val === undefined) {
        return defaultValue
    } else {
        return val
    }
}

module.exports = { get, getStrict }
