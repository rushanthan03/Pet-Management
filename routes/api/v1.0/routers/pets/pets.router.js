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
  .get(validateToken(), petsController.getAll)
  .post(validateBodyWithToken(createRequest), petsController.create);

router.post('/:id/image-upload',validateToken(), petsController.imageUpload); 

router
  .route("/:id")
  .get(validateToken(), petsController.show)
  .patch(validateBodyWithToken(updateRequest), petsController.edit)
  .delete(validateToken(), petsController.delete);

module.exports = router;
