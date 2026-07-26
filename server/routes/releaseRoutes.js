const express = require("express");
const router = express.Router();

const controller = require("../controllers/releaseController");

router.get("/", controller.getAll);

router.post("/", controller.create);

router.patch("/:id/steps", controller.updateSteps);

router.patch("/:id", controller.updateAdditional);

router.delete("/:id", controller.delete);

module.exports = router;