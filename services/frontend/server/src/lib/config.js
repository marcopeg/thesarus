// @flow

/**
 * App Configuration
 * =================
 *
 * Strict ENV based configuration proxy
 */

export const init = async (): Promise<any> => Promise.resolve()

export const get = (key: string): string | number | null => {
    if (process.env[key] === undefined) {
        throw new Error(`Env "${key}" not defined`)
    }
    return process.env[key]
}
