'use strict'
const  Joi = require('@hapi/joi') 

const createRequest = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    policies: Joi.array().required(),
}).options({abortEarly:false})

const updateRequest = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    policies: Joi.array().required(),
}).options({abortEarly:false})

module.exports.createRequest=createRequest
module.exports.updateRequest=updateRequest
