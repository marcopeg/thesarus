// @flow
/* eslint import/prefer-default-export: off */

import type { $Response } from 'express'

export const sendError = (res: $Response, code: number, title: string, props: any = {}) => {
    res.status(code).send({
        errors: [{
            ...props,
            code,
            title,
            detail: props.detail || title,
        }],
    })
}
