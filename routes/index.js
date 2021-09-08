var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("home");
});

router.get("/play/:level", (req, res) => {
    res.render("play");
});
module.exports = router;