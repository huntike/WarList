const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user: String,
    likes: Array
})

likeSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Like', likeSchema);