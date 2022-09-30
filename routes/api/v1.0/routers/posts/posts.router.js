const express = require('express');
const router = express.Router();
const postsController = require('../../../../../app/http/Controller/posts/posts.controller');

const {
  validateBodyWithToken,
  validateToken,
} = require('../../../../../util/validator.util');

const { validatePermission } =require('../../../../../util/checkPermission.util')

const {
  createRequest,
  updateRequest,
} = require('../../../../../app/http/validator/posts/posts.validator');

router.get('/search', validateToken(), postsController.search);
router.post('/:id/image-upload',validateToken(), postsController.imageUpload); 

router
  .route('/')
  .get(validateToken(), validatePermission('Posts Index'),  postsController.getAll)
  .post(validateBodyWithToken(createRequest), validatePermission('Posts Create'), postsController.create);

router
  .route('/:id')
  .get(validateToken(), validatePermission('Posts Show'), postsController.show)
  .patch(validateBodyWithToken(updateRequest), validatePermission('Posts Edit'),  postsController.edit)
  .delete(validateToken(), validatePermission('Posts Delete'),  postsController.delete);

module.exports = router;
