const { Schema, model } = require("mongoose");

const todoSchema = Schema({
    taskname: String,
    status: Boolean,
    tag: String,
    userid:String
})

const TodoModel = model('todo', todoSchema);

module.exports = { TodoModel };