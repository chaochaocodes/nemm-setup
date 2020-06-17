const express = require('express');

// call router fn to create custom routes, export via module.exports, import into app.js `require('./routes/posts')`
const router = express.Router();
const Post = require('../models/Post')

// GET all posts
router.get('/', async (req, res) => {
    // res.send('You are on Posts Posts Posts!')
    try {
        // call find (a mongoose fn) on the Post model
        const posts = await Post.find(); 
        res.json(posts);
    } catch (err) {
        res.json({ message: err });
    }
});

// router.get('/specific', (req, res) => {
//     res.send('Specfic post !')
// })

// Without ASYNC / AWAIT ============================
// router.post('/', (req, res) => {
//     // console.log(req.body);
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });
//     post.save() // returns a promise, include .exec()
//     .then(data => {
//         res.json(data)
//     })
//     .catch(err => {
//         res.json({ message: err }) // can respond with res.status(200)
//     });
// });

// CREATE a post (using AWAIT / ASYNC with TRY)
router.post('/', async (req, res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save() // returns a promise, include .exec()
        res.json(savedPost);
    } catch (err) {
        res.json({ message: err });
    }
});

// GET a post
router.get('/:postId', async (req, res) => {
    // console.log(req.params.postId)
    //=> Postman GET http://localhost:3000/posts/asdf, asdf = postId 
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch(err) {
        res.json({ message: err })
    }
})


// DELETE a post
router.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({_id: req.params.postId })
        res.json(removedPost);
    } catch (err) {
        res.json({ message: err })
    }
});


// UPDATE a post
router.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: {title: req.body.title} }
        );
        res.json( updatedPost );
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;
