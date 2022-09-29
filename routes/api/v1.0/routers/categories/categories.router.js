const express = require('express');
const router = express.Router();
const categoriesController = require('../../../../../app/http/Controller/categories/categories.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const { validatePermission } =require('../../../../../util/checkPermission.util')

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/categories/categories.validator');

router.get('/search', validateToken(), categoriesController.search);

router
  .route('/')
  .get(validateToken(), validatePermission('Categories  Index'),  categoriesController.getAll)
  .post(validateBodyWithToken(createRequest), validatePermission('Categories  Create'), categoriesController.create);

router
  .route('/:id')
  .get(validateToken(), validatePermission('Categories  Show'), categoriesController.show)
  .patch(validateBodyWithToken(updateRequest), validatePermission('Categories  Edit'),  categoriesController.edit)
  .delete(validateToken(), validatePermission('Categories  Delete'),  categoriesController.delete);

module.exports = router;
