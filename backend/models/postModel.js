const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    media: [
        {
            type: String
        }
        
    ],
    belongToGroup:{
        type: Boolean, 
        default: false,
    }
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
