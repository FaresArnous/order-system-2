const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.render("index.ejs");
});

router.get("/orders", function (req, res) {
  res.render("orders.ejs");
});

module.exports = router;
