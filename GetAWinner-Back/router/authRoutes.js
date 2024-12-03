var express = require('express');
var router  = express.Router();
const middlewares = require("../middlewares/validator");
const controllerPOST = require("../controllers/users/controllerPOST");

router.post('/register', middlewares.isInvalidRoleParam, middlewares.usernameIsEmpty, middlewares.passwordIsEmpty, controllerPOST.postUser);
router.post('/login', middlewares.usernameIsEmpty, middlewares.passwordIsEmpty, controllerPOST.loginUser);




module.exports = router;