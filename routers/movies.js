const express = require("express");
const router = express.Router();

const { index } = require("../controllers/moviesController");

router.get("/", index);

module.exports = router;
