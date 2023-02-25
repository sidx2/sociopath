const router = require("express").Router();
const multer = require("multer")
const { v4: uuidv4 } = require("uuid")
const path = require("path")
const Post = require("../models/Post");
const User = require("../models/User");


// multer thing
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images')
    },
    filename: function(req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

let upload = multer({
    storage,
    fileFilter
})


//create a post

router.post("/", upload.single('img'), async(req, res) => {
    console.log(req.body)
    const userId = req.body.userId
    const desc = req.body.desc
    const username = req.body.username
    const img = req.file.filename
    const newPost = new Post({ userId, desc, img, username });
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        console.log(err);
    }
});
//update a post

router.put("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        } else {
            res.status(403).json("you can update only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
//delete a post

router.delete("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        } else {
            res.status(403).json("you can delete only your post");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
//like / dislike a post

router.put("/:id/like", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("The post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("The post has been disliked");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});
//get a post

router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get timeline posts

router.get("/timeline/:userId", async(req, res) => {
    console.log("req.params: ", req.params)
    try {
        const currentUser = await User.findById(req.params.userId);
        console.log("currentuser: ", currentUser, "currentuserid: ", req.params.userId)
        const userPosts = await Post.find({ username: currentUser.username });
        console.log("userposts: ", userPosts)
            // const friendPosts = await Promise.all(
            //     currentUser.followings.map(async(friendId) => {
            //         console.log("friendId:", friendId)
            //         const p = await Post.find({ username: friendId });
            //         console.log("posts of ", friendId, p)
            //         return p
            //     }));
        const friendPosts = []
        for (f of currentUser.followings) {
            console.log("f:", f)
            const fPosts = await Post.find({ username: f })
            console.log("fPosts: ", fPosts)
            friendPosts.push(fPosts)
        }
        console.log("friend posts: ", friendPosts)
        res.status(200).json(userPosts.concat(...friendPosts));
    } catch (err) {
        console.log(err);
    }
});

//get user's all posts

router.get("/profile/:id", async(req, res) => {
    console.log("username is : ", req.params.username);
    try {
        console.log("inside try");
        const user = await User.findById(req.params.id);
        console.log("found user");
        console.log("user: ", user);
        const posts = await Post.find({ userId: req.params.id });

        console.log("posts: ", posts);
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;