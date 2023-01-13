const { UserModel } = require("../Models/user.model");
const fs = require("fs");

const userLogger = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.find({ email, password });
    if (user.length > 0) {
        fs.appendFileSync("./log.txt", `Username: ${user[0]["username"]} ----> Role: ${user[0]["role"]}\n`)
        next();
    } else {
        res.send({ "msg": 'Wrong Credntials' });
    }
};

module.exports = { userLogger }