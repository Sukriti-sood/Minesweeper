var express = require("express");
const app = require("../app");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
    res.render("home");
});

router.get("/play/:level", (req, res) => {
    var level = req.params.level;
    if (level == "easy") {
        console.log(level);
    }
    if (level == "medium") {
        console.log(level);
    }
    if (level == "hard") {
        console.log(level);
    }
    res.render("play", {
        level: level,
    });
});
module.exports = router;