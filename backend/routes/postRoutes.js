const router = require('express').Router()
const Post = require('../models/postModel')
const User = require('../models/userModel')

//view all posts
router.route('/').get(async (req, res) => {
    try {
        const posts = await Post.find({ belongToGroup: false });
        res.json(posts);
    } catch (err) {
        res.status(400).json(err);
    }
});


//create a post 
router.route('/:userId').post(async (req, res) => {
    try {
        const userId = req.params.userId;
        const { title, description, media, belongToGroup } = req.body;

        // Create a new Post
        const newPost = await new Post({
            userId,
            title,
            description,
            media,
            belongToGroup
        }).save();

        // Update the createdPosts array of the user
        await User.findByIdAndUpdate(userId, {
            $push: { createdPosts: newPost._id }
        });

        res.status(201).send({
            success: true,
            message: "Post created successfully"
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Error in creation',
            err
        });
    }
});


//fetch a single post
router.route('/:id').get((req,res) => {
    const id = req.params.id;
    Post.findById(id)
    .then(post => res.json(post))
    .catch(err => res.status(400).json('Error: ' + err));
})

//delete a post
router.route('/:id').delete(async (req, res) => {
    const postId = req.params.id;

    try {
        // Find the Post and store its userId
        const post = await Post.findById(postId);
        const userId = post.userId;

        // Delete the Post
        await Post.findByIdAndDelete(postId);

        // Remove the postId from the createdPosts array of the user
        await User.findByIdAndUpdate(userId, {
            $pull: { createdPosts: postId }
        });

        res.json("Post deleted");
    } catch (err) {
        console.error(err);
        res.status(400).json('Error: ' + err);
    }
});


// updating a post
router.route('/updatepost/:postId').put((req, res) => {
    const id = req.params.postId; // Post ID from the route parameter
    const updatedPost = req.body; // Updated post object from the request body

    Post.findByIdAndUpdate(id, updatedPost, { new: true })
        .then((updatedPost) => {
            if (updatedPost) {
                res.json(updatedPost);
            } else {
                res.status(404).json({ message: 'Post not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal server error' });
        });
});



// Save or unsave a post
router.route('/savePost/:userId').post(async (req, res) => {
    try {
        const userId = req.params.userId;
        const postId = req.body.postId; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const index = user.savedPosts.indexOf(postId);

        if (index !== -1) {
            user.savedPosts.splice(index, 1);
            await user.save();
            return res.status(200).json({ success: true, message: 'Job unsaved successfully' });
        } else {
            user.savedPosts.push(postId);
            await user.save();
            return res.status(200).json({ success: true, message: 'Job saved successfully' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Error saving/unsaving the job', error: err });
    }
});



// getting created posts

router.route('/created/:userId').get((req, res) => {

    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            const createdIds = user.createdPosts;

            
            Post.find({ _id: { $in: createdIds } })
                .then(posts => {
                    res.json(posts);
                })
                .catch(err => {
                    res.status(500).json({ error: 'Error fetching posts' });
                });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error fetching user' });
        });
});

// getting saved post 
router.route('/saved/:userId').get((req, res) => {
    

    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            const savedIds = user.savedPosts;

            Post.find({ _id: { $in: savedIds } })
                .then(posts => {
                    res.json(posts);
                })
                .catch(err => {
                    res.status(500).json({ error: 'Error fetching posts' });
                });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error fetching user' });
        });
});


module.exports = router