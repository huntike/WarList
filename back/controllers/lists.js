const listsRouter = require('express').Router();
const List = require('../models/list');
const Comment = require('../models/comment')

listsRouter.get('/', async (req, res) => {

    const auth = req.currentUser;
    if (auth) {
        
        const lists = await List.find({});
        for(const list of lists) {
            list.comment = []
            const comments = await Comment.find({idList:list.id});
            
            list.comment = comments;
            console.log(list.content);
        };
        

        return res.json(lists.map((list => list.toJSON())));
    }

    return res.status(403).send('Not authorized');
});

listsRouter.post('/', async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        const list = new List({ content: req.body.content, author: req.body.author });
        const savedList = await list.save();
        const lists = await List.find({});
        req.io.emit('UPDATE', lists);
        return res.status(201).json(savedList);
    }

    return res.status(403).send('Not authorized')
});

module.exports = listsRouter;