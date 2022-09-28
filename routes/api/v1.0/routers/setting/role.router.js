const express = require('express');
const router = express.Router();
const roleController = require('../../../../../app/http/Controller/setting/role.controller');

const { validateBodyWithToken, validateToken } =require('../../../../../util/validator.util')
const { validatePermission } =require('../../../../../util/checkPermission.util')

const { createRequest, updateRequest }= require('../../../../../app/http/validator/setting/role.validator')

router.get('/search', validateToken(), roleController.search);

router.route('/')
    .get(validateToken(), validatePermission('Role Index'), roleController.getAll)
    .post(validateBodyWithToken(createRequest),  validatePermission('Role Create'), roleController.create);
    
router.route('/:id')
    .get(validateToken(),  validatePermission('Role Show'), roleController.show)
    .patch(validateBodyWithToken(updateRequest),  validatePermission('Role Edit'), roleController.edit)
    .delete(validateToken(),  validatePermission('Role Delete'), roleController.delete);

module.exports = router;
