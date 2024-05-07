import Joi from 'joi'

export const createEmployeeValidation = {
    body: Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().required().email(),
        age: Joi.number().required().min(0).max(100),
        country: Joi.string().required(),
        profilePicture: Joi.string()
    }),
};

export const updateEmployeeValidation = {
    params: Joi.object().keys({
        id: Joi.number().min(1)
    }),
    body: Joi.object().keys({
        fullName: Joi.string().required(),
        email: Joi.string().required().email(),
        age: Joi.number().required().min(0).max(100),
        country: Joi.string().required(),
        profilePicture: Joi.string().optional()
    }),
}

export const deleteEmployeeValidation = {
    params: Joi.object().keys({
        id: Joi.number().min(1)
    })
}