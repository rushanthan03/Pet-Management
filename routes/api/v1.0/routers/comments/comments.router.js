const express = require('express');
const router = express.Router();
const commentsController = require('../../../../../app/http/Controller/comments/comments.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const { validatePermission } =require('../../../../../util/checkPermission.util')

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/comments/comments.validator');

router.get('/search', validateToken(), commentsController.search);

router
  .route('/')
  .get(validateToken(), validatePermission('Comments   Index'), commentsController.getAll)
  .post(validateBodyWithToken(createRequest), validatePermission('Comments   Create'), commentsController.create);

router
  .route('/:id')
  .get(validateToken(), validatePermission('Comments   Show'), commentsController.show)
  .patch(validateBodyWithToken(updateRequest), validatePermission('Comments   Edit'), commentsController.edit)
  .delete(validateToken(), validatePermission('Comments   Delete'), commentsController.delete);

module.exports = router;
