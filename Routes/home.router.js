const { Router } = require('express');
const HomeRouter = Router();

HomeRouter.get('/', (req, res) => {
    res.send("Welcome to Home Page");
});


module.exports = { HomeRouter };