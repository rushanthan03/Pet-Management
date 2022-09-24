const express = require('express');
const router = express.Router();
const commentsController = require('../../../../../app/http/Controller/comments/comments.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/comments/comments.validator');

router.get('/search', validateToken(), commentsController.search);

router
  .route('/')
  .get(validateToken(), commentsController.getAll)
  .post(validateBodyWithToken(createRequest), commentsController.create);

router
  .route('/:id')
  .get(validateToken(), commentsController.show)
  .patch(validateBodyWithToken(updateRequest), commentsController.edit)
  .delete(validateToken(), commentsController.delete);

module.exports = router;
