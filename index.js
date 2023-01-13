require('dotenv').config();
const express = require("express");
const cors = require("cors");
const { connection } = require("./Configs/config");
const { userRouter } = require('./Routes/user.router');
const { HomeRouter } = require('./Routes/home.router');
const { auth } = require('./middlewares/authantication.middleware');
const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRouter);

app.use(auth);
app.use("/home", HomeRouter);


app.listen(process.env.port, async () => {
    try {
        await connection;
        console.log("Connected to DB")
    } catch (err) {
        console.log("Error while connecting to Db")
        console.log(err);
    }
    console.log(`Server is running on ${process.env.port} port`)
});
