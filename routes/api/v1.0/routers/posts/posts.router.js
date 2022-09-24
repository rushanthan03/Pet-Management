const express = require('express');
const router = express.Router();
const postsController = require('../../../../../app/http/Controller/posts/posts.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/posts/posts.validator');

router.get('/search', validateToken(), postsController.search);

router
  .route('/')
  .get(validateToken(), postsController.getAll)
  .post(validateBodyWithToken(createRequest), postsController.create);

router
  .route('/:id')
  .get(validateToken(), postsController.show)
  .patch(validateBodyWithToken(updateRequest), postsController.edit)
  .delete(validateToken(), postsController.delete);

module.exports = router;
