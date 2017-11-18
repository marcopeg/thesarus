// @flow
/* eslint import/prefer-default-export: off */

import type { $Response } from 'express'

export const sendData = (res: $Response, data: any, code: number = 200) => {
    res
        .type('application/vnd.api+json')
        .status(code)
        .send(data)
}

export const sendError = (res: $Response, code: number, title: string, props: any = {}) => {
    sendData(res, {
        errors: [{
            ...props,
            code,
            title,
            detail: props.detail || title,
        }],
    }, code)
}
