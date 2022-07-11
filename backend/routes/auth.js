const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "Sourabhisgoodboy";

// ROUTE 1: Create a User using : POST "/api/auth/createuser".no log In required

router.post(
    "/createuser", [
        body("name", 'Enter a valid name').isLength({ min: 3 }),
        body("email", 'Enter A valid Email').isEmail(),
        body("password", 'passwor must be atlest 5 char').isLength({ min: 5 }),
    ],
    async(req, res) => {
        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Check weather the user with this email exiest already



            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with already exists" })
            }
            const salt = await bcrypt.genSalt(10);
            secPass = await bcrypt.hash(req.body.password, salt);


            // Create a new user
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            })

            const data = {
                user: {
                    id: user.id
                }
            }


            const authToken = jwt.sign(data, JWT_SECRET);

            await res.json({ authToken })
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server Error");
        };

    }
);



//ROUTE 2:  Authenticate a User using : POST "/api/auth/login".no log In required

router.post(
    "/login", [
        body("email", 'Enter A valid Email').isEmail(),
        body("password", 'password can not be blank').exists(),
    ], async(req, res) => {


        // if there are errors, return bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct PassWord And User Name" });
            }

            const passwordCompare = await bcrypt.compare(password, user.password);
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct PassWord And User Name" });
            }

            const data = {
                user: {
                    id: user.id
                }
            };


            const authToken = jwt.sign(data, JWT_SECRET);
            res.json({ authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        };
    }


);


//ROUTE 3:  Get user detail using : POST "/api/auth/getuser". logIn required
router.post(
    "/getuser", fetchuser, async(req, res) => {

        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.send(user)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server error");
        };
    });

module.exports = router;