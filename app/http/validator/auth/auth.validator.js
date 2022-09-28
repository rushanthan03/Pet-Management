'use strict'
const  Joi = require('@hapi/joi')

const changesTempPassword = Joi.object({
  username: Joi.string().required(),
  temp_password: Joi.string().required(),
  new_password:Joi.string().pattern(new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")),
  confirm_password:  Joi.ref('new_password')
}).options({abortEarly:false})

const changesPassword = Joi.object({
  current_password: Joi.string().required(),
  new_password:Joi.string().pattern(new  RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})")),
  confirm_password:  Joi.ref('new_password')
}).options({abortEarly:false})


module.exports.changesTempPassword=changesTempPassword
module.exports.changesPassword=changesPassword