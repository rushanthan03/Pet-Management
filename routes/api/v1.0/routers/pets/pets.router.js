const express = require("express");
const router = express.Router();
const petsController = require("../../../../../app/http/Controller/pets/pets.controller");

const {
  validateBodyWithToken,
  validateToken,
} = require("../../../../../util/validator.util");

const {
  createRequest,
  updateRequest,
} = require("../../../../../app/http/validator/pets/pets.validator");

router.get("/search", validateToken(), petsController.search);

router
  .route("/")
  .get(validateToken(), validatePermission('Pets  Index'),  petsController.getAll)
  .post(validateBodyWithToken(createRequest), validatePermission('Pets  Create'), petsController.create);

router.post('/:id/image-upload',validateToken(), petsController.imageUpload); 

router
  .route("/:id")
  .get(validateToken(), validatePermission('Pets  Show'), petsController.show)
  .patch(validateBodyWithToken(updateRequest), validatePermission('Pets  Edit'),  petsController.edit)
  .delete(validateToken(), validatePermission('Pets  Delete'),  petsController.delete);

module.exports = router;
