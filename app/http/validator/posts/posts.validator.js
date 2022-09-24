'use strict';
const Joi = require('@hapi/joi');

const createRequest = Joi.object({
  tittle: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string(),
  post_type: Joi.string().required(),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  tittle: Joi.string().required(),
  image: Joi.string(),
  description: Joi.string(),
  post_type: Joi.string().required(),
}).options({ abortEarly: false });


module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;