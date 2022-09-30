const express = require('express');
const router = express.Router();
const petsController = require('../../../../../app/http/Controller/pets/pets.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const { validatePermission } =require('../../../../../util/checkPermission.util')

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/pets/pets.validator');

router.get('/search', validateToken(), petsController.search);

router
  .route('/')
  .get(validateToken(), validatePermission('Categories Index'),  petsController.getAll)
  .post(validateBodyWithToken(createRequest), validatePermission('Categories Create'), petsController.create);

router
  .route('/:id')
  .get(validateToken(), validatePermission('Categories Show'), petsController.show)
  .patch(validateBodyWithToken(updateRequest), validatePermission('Categories Edit'),  petsController.edit)
  .delete(validateToken(), validatePermission('Categories Delete'),  petsController.delete);

module.exports = router;
