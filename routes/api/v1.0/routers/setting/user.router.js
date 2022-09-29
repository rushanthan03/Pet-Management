const express = require('express');
const router = express.Router();
const userController = require('../../../../../app/http/Controller/setting/user.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');
const { validatePermission } =require('../../../../../util/checkPermission.util')


const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/setting/user.validator');

router.get('/search', validateToken(), userController.search);

router.route('/')
    .get(validateToken(), validatePermission('User Index'), userController.getAll)
    .post(validateBodyWithToken(createRequest), validatePermission('User Create'), userController.create);
    
router.route('/:id')
    .get(validateToken(), validatePermission('User Show'), userController.show)
    .patch(validateBodyWithToken(updateRequest), validatePermission('User Edit'), userController.edit)
    .delete(validateToken(), validatePermission('User Delete'), userController.delete);

module.exports = router;
