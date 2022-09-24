const express = require('express');
const router = express.Router();
const categoriesController = require('../../../../../app/http/Controller/categories/categories.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/categories/categories.validator');

router.get('/search', validateToken(), categoriesController.search);

router
  .route('/')
  .get(validateToken(), categoriesController.getAll)
  .post(validateBodyWithToken(createRequest), categoriesController.create);

router
  .route('/:id')
  .get(validateToken(), categoriesController.show)
  .patch(validateBodyWithToken(updateRequest), categoriesController.edit)
  .delete(validateToken(), categoriesController.delete);

module.exports = router;
