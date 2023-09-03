const router = require('express').Router()
const User = require('../models/userModel') 
const Post = require('../models/postModel') 

// getting logged in user
router.route('/:userId').get((req, res) => {
    const id = req.params.userId;
    User.findById(id)
        .then((user) => {
            if (user) {
                const userData = {
                    name: user.name,
                    email: user.email,
                    followers: user.followers,
                    following: user.following,
                    createdPosts: user.createdPosts,
                    createdJobs: user.createdJobs,
                    savedPosts : user.savedPosts,
                    savedJobs : user.savedJobs,
                    endorsements: user.endorsements,
                    profileImg: user.profileImg,
                    coverImg: user.coverImg,
                    createdPosts: user.createdPosts,
                };
                res.json(userData);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal server error' });
        });
});


// getting other users
router.route('/otheruser/:userId').get((req, res) => {
    const id = req.params.userId;
    User.findById(id)
        .then((user) => {
            if (user) {
                const userData = {
                    name: user.name,
                    email: user.email,
                    followers: user.followers,
                    following: user.following,
                    createdPosts: user.createdPosts,
                    createdJobs: user.createdJobs,
                    endorsements: user.endorsements,
                    profileImg: user.profileImg,
                    coverImg: user.coverImg
                };
                res.json(userData);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

// router.route('/createdJobs').get((req,res) => {
//     const id = req.body.userId;
//     User.findById(id)
//         .then((user) => {
//             if (user) {
//                 const userData = {
//                     createdJobs: user.createdJobs,
//                 };
//                 res.json(userData);
//             } else {
//                 res.status(404).json({ message: 'User not found' });
//             }
//         })
//         .catch((error) => {
//             res.status(500).json({ message: 'Internal server error' });
//         });

// })

// router.route('/savedPosts').get((req,res) => {
//     const id = req.body.userId;
//     User.findById(id)
//         .then((user) => {
//             if (user) {
//                 const userData = {
//                     savedPosts: user.savedPosts,
//                 };
//                 res.json(userData);
//             } else {
//                 res.status(404).json({ message: 'User not found' });
//             }
//         })
//         .catch((error) => {
//             res.status(500).json({ message: 'Internal server error' });
//         });
// })

// router.route('/savedJobs').get((req,res) => {
//     const id = req.body.userId;
//     User.findById(id)
//         .then((user) => {
//             if (user) {
//                 const userData = {
//                     savedJobs: user.savedJobs,
//                 };
//                 res.json(userData);
//             } else {
//                 res.status(404).json({ message: 'User not found' });
//             }
//         })
//         .catch((error) => {
//             res.status(500).json({ message: 'Internal server error' });
//         });
// })


// edit user profile
router.route('/edituser/:userId').put((req, res) => {
    const id = req.params.userId; 
    const { name, coverImg, profileImg } = req.body; 

    const updateData = {};
    if (name) updateData.name = name;
    if (coverImg) updateData.coverImg = coverImg;
    if (profileImg) updateData.profileImg = profileImg;

    User.findByIdAndUpdate(id, updateData, { new: true })
        .then((updatedUser) => {
            if (updatedUser) {
                res.json(updatedUser);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal server error' });
        });
});


module.exports = router