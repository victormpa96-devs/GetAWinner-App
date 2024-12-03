var express = require('express');
var router  = express.Router();
const middlewares = require("../middlewares/validator");
const controllerGET = require("../controllers/competitors/controllerGET");
const controllerPOST = require("../controllers/competitors/controllerPOST");
const controllerPUT = require("../controllers/competitors/controllerPUT");
const controllerDELETE = require("../controllers/competitors/controllerDELETE");


router.get('/', middlewares.isNotAuthenticated, controllerGET.getAllCompetitors);
router.get('/:id', middlewares.isNotAuthenticated, controllerGET.getCompetitorByID);

router.post('/', middlewares.isNotAuthenticated, middlewares.competitorNameIsEmpty, controllerPOST.postCompetitor);

router.put('/:id', middlewares.isNotAuthenticated, controllerPUT.updateCompetitor);

router.delete('/', middlewares.isNotAuthenticated, controllerDELETE.deleteAllCompetitors);
router.delete('/:id', middlewares.isNotAuthenticated, controllerDELETE.deletCompetitorByID);


module.exports = router;