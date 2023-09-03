const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
    adminId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    title: {
        type: String,
        required: true
    }, 
    coverImg: {
        type: String,
        default: ""
    },
    description: {
        type: String,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    postList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, { timestamps: true });

const Group = mongoose.model('Group', groupSchema);
module.exports = Group;
