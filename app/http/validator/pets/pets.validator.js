"use strict";
const Joi = require("@hapi/joi");

const createRequest = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  age: Joi.number().required(),
  image: Joi.string(),
  weight: Joi.number().required(),
  cat_code: Joi.string().required(),
  is_vaccinated: Joi.boolean().required(),
  description: Joi.string().required(),
  additional_info: Joi.string(),
  status: Joi.string(),
  transfer_status: Joi.string(),
}).options({ abortEarly: false });

const updateRequest = Joi.object({
  name: Joi.string().required(),
  gender: Joi.string().required(),
  age: Joi.number().required(),
  image: Joi.string(),
  weight: Joi.number().required(),
  cat_code: Joi.string().required(),
  is_vaccinated: Joi.boolean().required(),
  description: Joi.string().required(),
  additional_info: Joi.string(),
  status: Joi.string(),
  transfer_status: Joi.string(),}).options({ abortEarly: false });

module.exports.createRequest = createRequest;
module.exports.updateRequest = updateRequest;
