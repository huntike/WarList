const likesRouter = require('express').Router();
const Like = require('../models/like');
const { ObjectId } = require('mongoose').Types;

//Récupération des likes d'un user
likesRouter.get('/:user', async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        const like = await Like.findOne({ user: req.params.user });
        return res.json(like.likes.map((like => like.toJSON())));
    }

    return res.status(403).send('Not authorized');
});

//Ajout d'un link sur un list
likesRouter.post('/', async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        let userLikes = await Like.findOne({ user: req.body.author });

        if (userLikes === null) {
            const likes = [];
            likes.push(new ObjectId(req.body.list));
            userLikes = new Like({ user: req.body.author, likes: likes });
        } else {
            userLikes.likes.push(new ObjectId(req.body.list));
        }

        await userLikes.save();

        const like = await Like.findOne({ user: req.body.author });
        req.io.emit('LIKES', like.likes);

        return res.status(201);
    }

    return res.status(403).send('Not authorized')
});

//Retrait d'un like sur un list
likesRouter.put('/', async (req, res) => {
    const auth = req.currentUser;

    if (auth) {
        let userLikes = await Like.findOne({ user: req.body.author });
        userLikes.likes = userLikes.likes.filter(x => x.toString() !== req.body.list);

        await userLikes.save();

        const like = await Like.findOne({ user: req.body.author });
        req.io.emit('LIKES', like.likes);

        return res.status(201);
    }

    return res.status(403).send('Not authorized');
});

module.exports = likesRouter;