var express = require('express');
var router  = express.Router();
const middlewares = require("../middlewares/validator");
const controllerGET = require("../controllers/users/controllerGET");
const controllerPOST = require("../controllers/users/controllerPOST");
const controllerPUT = require("../controllers/users/controllerPUT");
const controllerDELETE = require("../controllers/users/controllerDELETE");


router.get('/', middlewares.isNotAuthenticated, controllerGET.getAllUsers);
router.post('/', middlewares.usernameIsEmpty, middlewares.passwordIsEmpty, controllerPOST.postUser);
router.delete('/', middlewares.isNotAuthenticated, controllerDELETE.deleteAllUsers);


router.get('/:id', middlewares.isNotAuthenticated, controllerGET.getUserByID);
router.put('/:id', middlewares.isNotAuthenticated, controllerPUT.updateUser);
router.delete('/:id', middlewares.isNotAuthenticated, controllerDELETE.deletUserByID);

router.get('/profile/data', middlewares.isNotAuthenticated, controllerGET.getUserData); 



module.exports = router;