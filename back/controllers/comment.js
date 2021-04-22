const commentRouter = require('express').Router();
const Comment = require('../models/comment');

commentRouter.post('/', async (req, res) =>{
    const auth = req.currentUser;

    if(auth){
        const comment = new Comment({idList: req.body.idList, content: req.body.content, author: req.body.author});
        const savedComment = await comment.save();
        const comments = await Comment.find({});
        req.io.emit('COMMENT', comments);
        return res.status(201).json(savedComment);
    }
    return res.status(403).send('Not authorized')
});

module.exports = commentRouter;