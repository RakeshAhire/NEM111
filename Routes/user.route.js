const express = require('express');
const { UserModel } = require('../Models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userRouter = express.Router()

userRouter.post('/signup', async (req, res) => {
    try {
        const payload = req.body;
        bcrypt.hash(payload.password, 5, async function (err, hash) {
            if (err) {
                res.send({ "err": "Failed to signup" })
            }
            const user = new UserModel({ ...payload, password: hash });
            await user.save();
            res.send({ "msg": "User Create Successfully" })
        });
    }
    catch (e) {
        console.log('e: ', e);
        res.send({ "error": "Please try again" })
    }
});


userRouter.post('/login', async (req, res) => {
    try {
        const payload = req.body;
        const user = await UserModel.findOne({ email: payload.email });
        const match = await bcrypt.compare(payload.password, user.password);
        if (match) {
            const token = jwt.sign({ _id: user._id }, 'shhhhh');
            res.send({ "user": user.name, "token": token })
        }
        else{
            res.send({ "error": "Mail or password is wrong" })
        }
    }
    catch (e) {
        console.log('e: ', e);
    }
});

module.exports = { userRouter }