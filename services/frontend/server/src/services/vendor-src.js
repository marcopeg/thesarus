// @flow

/**
 * Provides links to the client bundles for the application
 * - development: forward to the webpack dev server
 * - production: finds out the exact versioned name from the assets folder
 */

import path from 'path'
import fs from 'fs'
import winston from 'winston'

import { get as getConfig } from '../lib/config'

const knownJS: Array<string> = [ 'vendor', 'app' ]
const knownCSS: Array<string> = [ 'app' ]

const sources = {
    js: [],
    css: [],
}

const getFiles = (srcPath: string, extension: string): Promise<any> =>
    new Promise((resolve, reject) => {
        fs.readdir(srcPath, (err, files) => {
            if (err) {
                reject(err)
            } else {
                resolve(files.filter(file => file.indexOf(extension) !== -1))
            }
        })
    })

export const init = async () => {
    switch (getConfig('NODE_ENV')) {
        case 'development':
            sources.js = knownJS.map(name => `http://localhost:3000/${name}.js?${Date.now()}`)
            break
        default: {
            const assetsPath = path.join(__dirname, '../../react-www')
            const jsFiles = await getFiles(assetsPath, '.js')
            const cssFiles = await getFiles(assetsPath, '.css')

            sources.js = knownJS.map((name) => {
                const fname = jsFiles
                    .filter($ => $.indexOf(`${name}.js`) !== -1)
                    .map($ => `/${$}`)
                    .shift()

                return `${fname}`
            })

            sources.css = knownCSS.map((name) => {
                const fname = cssFiles
                    .filter($ => $.indexOf(`${name}.css`) !== -1)
                    .map($ => `/${$}`)
                    .shift()

                return `${fname}`
            })

            winston.verbose('assets sources: ', sources)
            break
        }
    }
}

export const getSources = () => ({
    js: [ ...sources.js ],
    css: [ ...sources.css ],
})
