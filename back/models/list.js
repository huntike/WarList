const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    content: Array,
    author: String,
    comment: Array,
    
})

listSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('List', listSchema);