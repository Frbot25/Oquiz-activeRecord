const Joi = require('@hapi/joi');

const userSchema =  Joi.object({
    firstname: Joi.string().min(4).max(25).required(),
    lastname: Joi.string().min(4).max(25).required(),
    email: Joi.string().lowercase().email().required(),
    password: Joi.string().min(4).lowercase().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
});

module.exports = {
    userSchema
}