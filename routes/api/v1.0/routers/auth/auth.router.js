const express = require('express');
const router = express.Router();
const authController = require('../../../../../app/http/Controller/auth/auth.controller');

const {
  login,
} = require('../../../../../app/http/validator/auth/loginValidator');
const {
  validateBody,
  validateToken,
} = require('../../../../../util/validator.util');

router.post('/login', validateBody(login), authController.authenticate);
router.get('/user', validateToken(), authController.user);
router.get('/changesPassword', validateToken(), authController.changesPassword);
router.get('/changesTempPassword', validateToken(), authController.changesTempPassword);
router.get('/forgetPassword', validateToken(), authController.forgetPassword);


module.exports = router;
