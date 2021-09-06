var express = require("express");
var router = express.Router();
var authController = require("../AuthController");
var loggedIn = require("../AuthMiddleware");
var User = require("../models/Score");
/* GET users listing. */

router.route("/").post((req, res, next) => {
    (async() => {
        const result = await authController.upsertUser(req.body);
        return result;
    })()
    .then((data) => {
            res.statusCode = 200;
            res.send(data);
        })
        .catch((err) => {
            res.render("error", {
                message: err,
            });
        });
});

router.get("/token", loggedIn, (req, res) => {
    try {
        if (req.user) {
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json");
            return res.json({
                status: "JWT valid!",
                success: true,
                user: req.user,
            });
        } else {
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            return res.json({
                status: "JWT invalid!",
                success: false,
            });
        }
    } catch (err) {
        console.log(err);
    }
});

router
    .route("/score")
    .get((req, res) => {})
    .post((req, res) => {})
    .patch((req, res) => {});
module.exports = router;