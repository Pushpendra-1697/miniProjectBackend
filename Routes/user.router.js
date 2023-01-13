const { Router, application } = require('express');
const { UserModel } = require('../Models/user.model');
const userRouter = Router();
const jwt = require('jsonwebtoken');
const { validate } = require("../middlewares/validate.middleware");
const { userLogger } = require('../middlewares/userLogger.middleware');
const bcrypt = require('bcrypt');
require('dotenv').config();

userRouter.get('/', async (req, res) => {
    try {
        let users = await UserModel.find();
        res.send(users);
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err });
    }
});

userRouter.post('/register', async (req, res) => {
    let { username, email, DOB, role, location, password, confirm_password } = req.body;
    // console.log(data);
    try {
        bcrypt.hash(password, Number(process.env.rounds), async (err, new_password) => {
            if (err) {
                console.log(err)
            } else {
                const user = new UserModel({ username, password: new_password, email, DOB, role, location, confirm_password });
                await user.save();
                res.status(200).send({"msg":"Succefully Registered user"});
            }
        });
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": "Error in registration" });
    }
});

userRouter.post('/login', userLogger, async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await UserModel.find({ email });
        // console.log(user)
        if (user.length > 0) {
            bcrypt.compare(password, user[0]["password"], (err, result) => {
                if (result) {
                    const token = jwt.sign({ course: 'backend' }, process.env.key);
                    res.send({ "masssage": "Login successful", "token": token, "username": user[0]["username"], "role": user[0]["role"] });
                } else {
                    res.send({ "msg": 'Wrong Credntials' });
                }
            });
        } else {
            res.send({ "msg": 'Wrong Credntials' });
        }
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err });
    }
});

userRouter.use(validate);

userRouter.patch('/patch/:_id', async (req, res) => {
    const { _id } = req.params;
    const data = req.body;
    try {
        await UserModel.findByIdAndUpdate({ _id }, data);
        res.send({ "msg": `updated successfully user whose id is ${_id}` });
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err.message });
    }
});

userRouter.delete('/delete/:_id', async (req, res) => {
    const { _id } = req.params;
    try {
        await UserModel.findByIdAndDelete({ _id });
        res.send({ "msg": `Deleted successfully user whose id is ${_id}` });
    } catch (err) {
        console.log(err);
        res.status(404).send({ "Error": err.message });
    }
});

module.exports = { userRouter };