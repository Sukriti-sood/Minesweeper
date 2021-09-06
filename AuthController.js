const jwt = require("jsonwebtoken");
const User = require("./models/user");

async function upsertUser(user) {
    const data = await User.findOne({
        user_id: user.user_id,
    });
    if (data) {
        return await generateJWT({ _id: data._id });
    }
    let newUser = new User(user);
    newUser = await newUser.save();
    return await generateJWT({ _id: newUser._id });
}
async function generateJWT(data) {
    return await jwt.sign(data, process.env.secretorkey, { expiresIn: "7d" });
}

const AuthController = {
    upsertUser: upsertUser,
};

module.exports = AuthController;