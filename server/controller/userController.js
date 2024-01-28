const { userModel } = require("../model/userModel.js");

const register = (req, res, next) => {
    console.log(req.body);
};

module.exports = { register };
