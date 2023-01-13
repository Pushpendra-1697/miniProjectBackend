const validate = (req, res, next) => {
    const { role } = req.query;
    // console.log(role)
    if (req.method === "PATCH" || req.method === "DELETE") {
        if (role === "Admin") {
            next();
        }else {
            res.send({ "msg": "You are not Admin!" })
        }
    } 
};

module.exports = { validate };