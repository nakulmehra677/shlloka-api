const Joi = require('joi');

const signupUserRequestSchema = Joi.object().keys({
    fullName: Joi.string()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required(),
    password: Joi.string()
        .min(6).required(),
})

module.exports = signupUserRequestSchema