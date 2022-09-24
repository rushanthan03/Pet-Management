'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  tittle: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string(),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  tittle: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string(),
}).options({ abortEarly: false });


module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;
