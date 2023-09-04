const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String, 
        required: true,
        trim: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true
    }, 
    password: {
        type: String, 
        required: true,
    },
    profileImg: {
        type: String ,
        default: ""
    },
    coverImg: {
        type: String,
        default: ""
    },
    savedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    createdPosts: [{
            type: Schema.Types.ObjectId,
            ref: 'Post'
    }],
    savedJobs: [{
            type: Schema.Types.ObjectId,
            ref: 'JobPost'
    }],
    createdJobs: [{
            type: Schema.Types.ObjectId,
            ref: 'JobPost'
    }],
    appliedJobs: [{
        type: Schema.Types.ObjectId,
        ref: 'JobPost'
    }],
    followers : [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }],
    following : [{
            type: Schema.Types.ObjectId,
            ref: 'User'
    }],
    groups : [{
        type: Schema.Types.ObjectId,
        ref: 'Group'
}],

    endorsements: {
        type: Number,
        default: 0,

    }
    

}, {timestamps: true})

const User = mongoose.model('User', userSchema);
module.exports = User;