const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const jobPostSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    company: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    location: String,
    description: {
        type: String,
        required: true
    },
    requirements: [String],
    skills: [String],
    employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'],
        required: true,
        default: "Full-time"
    },
    seniorityLevel: {
        type: String,
        enum: ['Entry level', 'Mid-Senior level', 'Senior level', 'Executive'],
        required: true,
        default: "Entry-level"
    },
    applyLink: {
        type: String,
        required: true
    },
    isLocked: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const JobPost = mongoose.model('JobPost', jobPostSchema);
module.exports = JobPost;
