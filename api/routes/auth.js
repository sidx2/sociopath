const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/authMiddleware');

//REGISTER
router.post("/register", async(req, res) => {
    try {
        //generate new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log("req.body.name: ", req.body.name)
        //create new user
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        });

        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
});

//LOGIN
router.post("/login", async(req, res) => {
    console.log(req.body);
    try {
        const user = await User.findOne({ email: req.body.email });
        !user && console.log("user not found");

        const validPassword = await bcrypt.compare(req.body.password, user.password) 
        !validPassword && console.log("wrong password")

        res.send(user)
    } catch (err) {
        console.log(err)
    }
});


// express register route
// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

router.post('/user', async(req, res) => {
    const { email, password, username, name } = req.body;

    try {
        // check if the user already exists
        user = await User.findOne({ email });
        if (user) {
            console.log({ msg: 'Email already exists' });
            // return
        }

        // create new user
        user = new User({
            email,
            password,
            username,
            name
        });

        // hash user password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // return jwt
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            "secret", { expiresIn: '7 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );
    } catch (err) {
        console.error(err.message);
        console.log('Server error');
    }
});

// express login route
router.post('/user/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        // check if the user exists
        let user = await User.findOne({ email });
        if (!user) {
            // return res.status(400).json({ msg: 'Email or password incorrect' });
            console.log({ msg: 'Email or password incorrect' });
        }

        // check is the encrypted password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // return res.status(400).json({ msg: 'Email or password incorrect' });
            console.log({ msg: 'Email or password incorrect' });
        }

        // return jwt
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            "secret", { expiresIn: '30 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
        console.log('Server error');
    }
});

// express get user info route
router.get('/user/info', auth, async(req, res) => {
    console.log("req.user.id: ", req.user.id)
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

// const res = getUserData("http://localhost:8800/api/auth/user/info/")
// axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;