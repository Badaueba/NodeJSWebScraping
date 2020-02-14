const express = require("express");
const router = express.Router();
const controller = require("./contoller");

router.get("/", controller.get);
router.post("/create", controller.post);
router.delete("/:_id", controller.delete);

module.exports = router;