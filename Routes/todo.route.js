const express = require('express');
const { TodoModel } = require('../Models/todo.model');

const todoRouter = express.Router()

todoRouter.get('/', async (req, res) => {
    const { status } = req.query;
    try {
        const data = await TodoModel.find(status)
        res.send(data)
    }
    catch (e) {
        console.log('e: ', e);
        res.send({ "msg": "Please try again" })
    }
});



todoRouter.post('/add', async (req, res) => {
    try {
        const payload = req.body;
        // console.log('payload: ', payload);
        const todo = new TodoModel(payload);
        await todo.save();
        res.send({ "msg": "Todo added Successfully" });
    }
    catch (e) {
        console.log('e: ', e);
        res.send({ "msg": "Please try again" })

    }
});

todoRouter.patch('/edit/:id', async (req, res) => {
    try {
        const payload = req.body;
        const { id } = req.params;
        await TodoModel.findByIdAndUpdate({ _id: id }, payload);
        res.send({ "msg": "Todo Updated Successfully" });
    }
    catch (e) {
        console.log('e: ', e);
        res.send({ "msg": "Please try again" })
    }
});

todoRouter.delete('/delete/:id', async (req, res) => {
    try {
        const payload = req.body;
        const { id } = req.params;
        console.log('id: ', id);
        await TodoModel.findByIdAndDelete( { _id: id });
        res.send({ "msg": "Todo Deleted Successfully" });
    }
    catch (e) {
        console.log('e: ', e);
        res.send({ "msg": "Please try again" })
    }
});

module.exports = { todoRouter }