const { Router } = require('express');
const router = Router();
const PolicyController = require('../../../../../app/http/Controller/setting/policy.controller');

const { validateToken } =require('../../../../../util/validator.util')

router.get('/', validateToken(), PolicyController.getAll);

module.exports = router;
