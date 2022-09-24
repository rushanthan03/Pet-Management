'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  comment: Joi.string().required(),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  comment: Joi.string().required(),
}).options({ abortEarly: false });


module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;
