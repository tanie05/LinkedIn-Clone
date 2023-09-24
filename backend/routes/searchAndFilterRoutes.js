const User = require('../models/userModel')
const Post = require('../models/postModel')
const JobPost = require('../models/jobPostModel')
const Group = require('../models/groupModel')

const router = require('express').Router()

router.route('/').post(async (req, res) => {
    try {
        const searchInput = req.body.search;
        
        // Search for users
        const users = await User.find({ name: { $regex: searchInput, $options: 'i' } });

        // Search for job posts
        const jobPosts = await JobPost.find({ title: { $regex: searchInput, $options: 'i' } });

        // Search for groups (assuming you have a 'Group' model)
        const groups = await Group.find({ title: { $regex: searchInput, $options: 'i' } });

        // Search for posts 
        const posts = await Post.find({ title: { $regex: searchInput, $options: 'i' } });

        // Return the results
        res.json({ users, jobPosts, groups, posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;
