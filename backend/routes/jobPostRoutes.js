const router = require('express').Router()
const JobPost = require('../models/jobPostModel')
const User = require('../models/userModel')

//view all Jobposts
router.route('/').get((req,res) => {
    JobPost.find()
    .then((job) => res.json(job))
    .catch((err) => res.status(400).json(err))
}) 

//create a JobPost
router.route('/:userId').post(async (req, res) => {
    try {
        const userId = req.params.userId;
        const {
            company,
            title,
            description,
            location,
            requirements,
            skills,
            employmentType,
            applyLink,
            seniorityLevel
        } = req.body;

        // Create a new JobPost
        const newJobPost = await new JobPost({
            userId,
            company,
            title,
            description,
            location,
            requirements,
            skills,
            employmentType,
            applyLink,
            seniorityLevel
        }).save();

        // Update the createdJobs array of the user
        await User.findByIdAndUpdate(userId, {
            $push: { createdJobs: newJobPost._id }
        });

        res.status(201).send({
            success: true,
            message: "JobPost created successfully"
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


//fetch a single JobPost
router.route('/:id').get((req,res) => {
    const id = req.params.id;
    JobPost.findById(id)
    .then(JobPost => res.json(JobPost))
    .catch(err => res.status(400).json('Error: ' + err));
}) 

//delete a JobPost
router.route('/:id').delete(async (req, res) => {
    const jobId = req.params.id;

    try {
        // Find the JobPost and store its userId
        const jobPost = await JobPost.findById(jobId);
        const userId = jobPost.userId;

        // Delete the JobPost
        await JobPost.findByIdAndDelete(jobId);

        // Remove the jobId from the createdJobs array of the user
        await User.findByIdAndUpdate(userId, {
            $pull: { createdJobs: jobId }
        });

        res.json("JobPost deleted");
    } catch (err) {
        console.error(err);
        res.status(400).json('Error: ' + err);
    }
});


// updating a JobPost
router.route('/updateJobPost/:JobPostId').put((req, res) => {
    const id = req.params.JobPostId; 
    const updatedJobPost = req.body; 

    JobPost.findByIdAndUpdate(id, updatedJobPost, { new: true })
        .then((updatedJobPost) => {
            if (updatedJobPost) {
                res.json(updatedJobPost);
            } else {
                res.status(404).json({ message: 'JobPost not found' });
            }
        })
        .catch((error) => {
            res.status(500).json({ message: 'Internal server error' });
        });
});

// locking a post
router.route('/lock/:JobPostId').put((req,res) => {
    const id = req.params.JobPostId;
    const isLocked = req.body.isLocked;
    JobPost.findByIdAndUpdate(id, {isLocked: isLocked})
    .then((updatedJobPost) => {
        if (updatedJobPost) {
            res.json(updatedJobPost);
        } else {
            res.status(404).json({ message: 'JobPost not found' });
        }
    })
    .catch((error) => {
        res.status(500).json({ message: 'Internal server error' });
    });
})


// Save or unsave a job
router.route('/saveJob/:userId').post(async (req, res) => {
    try {
        const userId = req.params.userId;
        const jobId = req.body.jobId; 

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const index = user.savedJobs.indexOf(jobId);

        if (index !== -1) {
            user.savedJobs.splice(index, 1);
            await user.save();
            return res.status(200).json({ success: true, message: 'Job unsaved successfully' });
        } else {
            user.savedJobs.push(jobId);
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
    // you have to return those jobs whose userId is userId
    // return the jobs created by userId 
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            const createdIds = user.createdJobs;

            // Use the createdIds to query the jobs collection
            JobPost.find({ _id: { $in: createdIds } })
                .then(jobs => {
                    res.json(jobs);
                })
                .catch(err => {
                    res.status(500).json({ error: 'Error fetching jobs' });
                });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error fetching user' });
        });
});

// getting saved jobs
router.route('/saved/:userId').get((req, res) => {
    // you have to return those jobs whose userId is userId
    // return the jobs created by userId 
    const userId = req.params.userId;
    User.findById(userId)
        .then(user => {
            const savedIds = user.savedJobs;

            // Use the savedIds to query the jobs collection
            JobPost.find({ _id: { $in: savedIds } })
                .then(jobs => {
                    res.json(jobs);
                })
                .catch(err => {
                    res.status(500).json({ error: 'Error fetching jobs' });
                });
        })
        .catch(err => {
            res.status(500).json({ error: 'Error fetching user' });
        });
});


module.exports = router