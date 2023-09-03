// creating a group
// fetching group postList and other data
// removing someone, adding someone, deleting some post, adding a post, editing a post
// view all group names the user is a part of

const router = require('express').Router()
const Group = require('../models/groupModel')
const User = require('../models/userModel')

// creating a group
router.route('/:adminId').post(async(req,res) => {
    try{
        const adminId = req.params.adminId;
        const {title, description} = req.body;
        const members = [adminId];

        const newGroup = await new Group({adminId, title, description, members}).save();
        res.status(201).send({
            success:true, message: "Group created successfully"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).send({
            success: false,
            message: 'Error in creation',
            err
        })
    }
})


// adding new member
router.route('/addmember/:userId').put(async (req, res) => {
    const userId = req.params.userId;
    const groupId = req.body.groupId;

    try {
        
        const updatedGroup = await Group.findByIdAndUpdate(
            groupId,
            { $addToSet: { members: userId } }, // Use $addToSet to prevent duplicate entries
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

        const postList = group.postList;
        res.json(postList);
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

module.exports = router;

