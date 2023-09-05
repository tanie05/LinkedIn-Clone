const router = require('express').Router()
const Group = require('../models/groupModel')
const User = require('../models/userModel')
const Post = require('../models/postModel')

// getting group info
router.route('/:groupId').get((req,res) => {
    const groupId = req.params.groupId
    Group.findById(groupId)
    .then(grp => res.json(grp))
})
 
// creating a group
router.route('/:adminId').post(async (req, res) => {
    try {
        const adminId = req.params.adminId;
        const { title, description, coverImg } = req.body;
        const members = [adminId];

        // Create a new group
        const newGroup = await new Group({ adminId, title, description, members, coverImg }).save();

        // Update the admin's groups array with the new group's _id
        await User.findByIdAndUpdate(
            adminId,
            { $push: { groups: newGroup._id } }, // Push the newGroup's _id to the groups array
            { new: true } // Return the updated user document
        );

        res.status(201).send({
            success: true,
            message: 'Group created successfully',
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: 'Error in creation',
            err,
        });
    }
});




// adding new member
router.route('/addmember/:userId').put(async (req, res) => {
    const userId = req.params.userId;
    const groupId = req.body.groupId;

    try {
        
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } }, 
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Update user document: Add groupId to the groups array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { groups: groupId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'Member added successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// updating group name, description etc
router.route('/editgroup/:groupId').put(async (req, res) => {
    const groupId = req.params.groupId;
    const { name, description, coverImg } = req.body;

    try {
        // Update group document with the provided data
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            {
                $set: {
                    name: name,
                    description: description,
                    coverImg: coverImg
                }
            },
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        res.json(updatedGroup);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

// getting all post of group
router.route('/groupposts/:groupId').get(async (req, res) => {
    const groupId = req.params.groupId;

    try {
        // Find the group by ID and return its postList array
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }

        const postIds = group.postList; // Array of post _id values

        // Find all posts where the _id is in the postIds array
        const posts = await Post.find({ _id: { $in: postIds } });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


// leaving group
router.route('/removeuser/:groupId/:userId').put(async (req, res) => {
    const groupId = req.params.groupId;
    const userId = req.params.userId;

    try {
        // Update group document: Remove userId from the members array
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $pull: { members: userId } },
            { new: true }
        );

        if (!updatedGroup) {
            return res.status(404).json({ message: 'Group not found' });
        }

        // Update user document: Remove groupId from the groups array
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { groups: groupId } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User removed from group successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


// creating a post
router.route('/createpost/:userId').post(async (req, res) => {
    const userId = req.params.userId;
    const { title, description, media, belongToGroup, groupId } = req.body;

    try {
        // Validate that the group with the given groupId exists
        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ success: false, message: 'Group not found' });
        }

        // Validate that the user with the given userId exists
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Create a new Post
        const newPost = await new Post({
            userId,
            title,
            description,
            media,
            belongToGroup
        }).save();

        // Save the postId in postList of the group
        await Group.findByIdAndUpdate(groupId, {
            $push: { postList: newPost._id }
        });

        res.status(201).json({
            success: true,
            message: "Post created successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports = router;

