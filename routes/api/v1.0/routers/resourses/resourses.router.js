const express = require('express');
const router = express.Router();
const resoursesController = require('../../../../../app/http/Controller/resourses/resourses.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/resourses/resourses.validator');

router.get('/search', validateToken(), resoursesController.search);

router
  .route('/')
  .get(validateToken(), resoursesController.getAll)
  .post(validateBodyWithToken(createRequest), resoursesController.create);

router
  .route('/:id')
  .get(validateToken(), resoursesController.show)
  .patch(validateBodyWithToken(updateRequest), resoursesController.edit)
  .delete(validateToken(), resoursesController.delete);

module.exports = router;
