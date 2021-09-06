const jwt = require("jsonwebtoken");
const User = require("./models/user");

const loggedIn = (req, res, next) => {
    (async() => {
        const token = req.headers["x-access-token"];
        if (!token) throw new Error("Invalid Token");
        const payload = await jwt.verify(token, "abc12345");
        let user = await User.findById(payload._id);
        if (user) return user;
        else throw new Error("Invalid Token");
    })()
    .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err.message);
            res.status(401).send(err.message);
        });
};

module.exports = loggedIn;