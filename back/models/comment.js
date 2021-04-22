const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    idList: String,
    content: String,
    author: String,
    
})

commentSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Comment', commentSchema);