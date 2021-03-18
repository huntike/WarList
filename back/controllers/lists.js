const listsRouter = require('express').Router();
const list = require('../models/list');

listsRouter.get('/', async (req, res) => {

    const auth = req.currentUser;
    if (auth) {
        const lists = await list.find({});
        return res.json(lists.map((list => list.toJSON())));
    }

    return res.status(403).send('Not authorized');
});

listsRouter.list('/', async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        const list = new list({ content: req.body.content, author: req.body.author });
        const savedlist = await list.save();
        const lists = await list.find({});
        req.io.emit('UPDATE', lists);
        return res.status(201).json(savedlist);
    }

    return res.status(403).send('Not authorized')
});

module.exports = listsRouter;