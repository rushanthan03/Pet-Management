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
router.post('/:id/image-upload',validateToken(), resoursesController.imageUpload); 

router
  .route('/')
  .get(validateToken(), validatePermission('Resourses  Index'),  resoursesController.getAll)
  .post(validateBodyWithToken(createRequest), validatePermission('Resourses  Create'), resoursesController.create);

router
  .route('/:id')
  .get(validateToken(), validatePermission('Resourses  Show'), resoursesController.show)
  .patch(validateBodyWithToken(updateRequest), validatePermission('Resourses  Edit'),  resoursesController.edit)
  .delete(validateToken(), validatePermission('Resourses  Delete'),  resoursesController.delete);

module.exports = router;
