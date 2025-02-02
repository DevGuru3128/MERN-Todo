import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import httpStatus from "http-status";

import { pick } from "../utils/pick";

export const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const validSchema = pick(schema, ['params', 'query', 'body']);
    const object = pick(req, Object.keys(validSchema));

    const { value, error } = Joi.compile(validSchema)
        .prefs({ errors: { label: 'key' }, abortEarly: false })
        .validate(object);
    
    if (error) {
        const errorMessage = error.details.map((details) => details.message).join(', ');
        console.log(errorMessage)
        return res.status(httpStatus.BAD_REQUEST).json(errorMessage)
    }
    Object.assign(req, value);
    return next()
}