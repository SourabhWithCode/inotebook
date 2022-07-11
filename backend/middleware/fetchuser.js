const { request } = require('express');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Sourabhisgoodboy";

const fetchuser = (req, res, next) => {

    // Get The user from the jwt token and add id to req object

    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please  authenticate using a valid user token" });

    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next()
    } catch (error) {
        res.status(401).send({ error: "Please  authenticate using a valid user token" });
    }

}

module.exports = fetchuser;