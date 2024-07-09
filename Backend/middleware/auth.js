const JWT = require('jsonwebtoken');
const key = "SecrateKay";
const { Token } = require('../models/db')
const auth = async (req, res, next) => {

    const token = req.header('Authorization').replace('Bearer ', '');
    const decode = await JWT.verify(token, key)

    if (!decode) {
        return res.send({ Message: "invalid token" });
    }

    const userToken = await Token.findOne({ user_id: decode.id });
    console.log(userToken);
    if (!userToken || userToken.length == 0) {
        return res.send({ Message: "invalid token" });
    } else {
        // req.body.currentUser = user;
        next()
    }

}
module.exports = { auth }