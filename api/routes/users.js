const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

//update user
router.put("/:id", async(req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch (err) {
                return res.status(500).json(err);
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can update only your account!");
    }
});

//delete user
router.delete("/:id", async(req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted");
        } catch (err) {
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can delete only your account!");
    }
});

//get a user
router.get("/:username", async(req, res) => {
    // console.log("THE REQ: ", req)
    const userId = req.body.userId;
    console.log("req.body: ", req.body)
    const username = req.body.username;
    console.log("recieved username is: ", username)
    try {
        const user = userId ?
            await User.findById(userId) :
            await User.findOne({ username: req.params.username });

        console.log("THE USER: ", user)
            // const { password, updatedAt, ...other } = user._doc;
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
    }
});

//get friends
router.get("/friends/:userId", async(req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.find({ username: friendId });
            })
        );
        // console.log("friends: ", friends)
        // let friendList = [];
        // friends.map((friend) => {
        //     const { _id, username, profilePicture } = friend;
        //     friendList.push({ _id, username, profilePicture });
        // });
        res.status(200).json(friends)
    } catch (err) {
        res.status(500).json(err);
    }
});

//follow a user

router.put("/:id/follow", async(req, res) => {
    console.log("req.body.userId: ", req.body.userId)
    console.log("req.params.id: ", req.params.id)
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findOne({ username: req.params.id });
            if (user) console.log("we found the user")
            const currentUser = await User.findOne({ username: req.body.userId });
            if (currentUser) console.log("we found the current user")
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been followed");
            } else {
                res.status(403).json("you allready follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant follow yourself");
    }
});

//unfollow a user

router.put("/:id/unfollow", async(req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findOne({ username: req.params.id });
            const currentUser = await User.findOne({ username: req.body.userId });
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed");
            } else {
                res.status(403).json("you dont follow this user");
            }
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("you cant unfollow yourself");
    }
});

module.exports = router;