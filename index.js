
const express = require('express');
const { connection } = require('./Config/db');
const { Auth } = require('./Middleware/auth');
const { todoRouter } = require('./Routes/todo.route');
const { userRouter } = require('./Routes/user.route');
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to last evaluation NEM111")
})

app.use('/user', userRouter);
app.use('/todo', Auth, todoRouter)

app.listen(8080, async () => {
    try {
        await connection;
        console.log("App Listning port 8080");
    }
    catch (e) {
        console.log("Somethong went wrong");
        console.log('e: ', e);

    }
})