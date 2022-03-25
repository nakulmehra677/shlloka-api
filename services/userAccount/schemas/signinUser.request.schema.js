const Joi = require('joi');

const signinUserRequestSchema = Joi.object().keys({
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } }).required(),
    password: Joi.string()
        .min(6).required(),
})

module.exports = signinUserRequestSchema