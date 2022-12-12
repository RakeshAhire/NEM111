const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    // console.log('token: ', token);
    if (token) {
        const decoded = jwt.verify(token, 'shhhhh');
        // console.log('decoded: ', decoded);
        req.body.userid = decoded._id;
        next()
    }
    else {
        res.send({ "msg": "Please login" })
    }
}

module.exports = { Auth }