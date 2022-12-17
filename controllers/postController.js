const Post = require('../models/post');
const {body, validationResult} = require('express-validator');

exports.create_post = [
    body('title').trim().escape(),
    body('text').trim().escape(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                data: req.body,
                errors: errors.array(),
            });
        }

        const post = new Post({
            title: req.body.title,
            text: req.body.text,
            user: req.body.user,
        });
        
        post.save( err => {
            if (err) return next(err);

            res.status(200).json({
                post,
                msg: 'Post sent'
            });
        });
    }
];

exports.get_single_post = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post == null) {
            return res.status(404)
                      .json({ err: `post with id ${req.params.id} not found.` });
        }

        res.status(200).json({ post });
    } catch (err) {
        next(err);
    }
}

exports.get_posts = async (req, res, next) => {
    try {
        const posts = await Post.find({});

        if (posts == null) {
            return res.status(404)
                      .json({ err: 'posts not found. '});
        }

        res.status(200).json({ posts });
    } catch (err) {
        next(err);
    }
}

exports.update_post = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            text: req.body.text,
            user: req.body.user,
        });

        if (post == null) {
            return res.status(404)
                      .json({ err: `post with id ${req.params.id} not found.` });
        }

        res.status(200).json({ 
            post,
            msg: `post with id ${req.params.id} updated successfuly.` 
        });
    } catch (err) {
        next(err);
    }
}

exports.delete_post = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndRemove(req.params.id);
        
        if (post == null) {
            return res.status(404)
                      .json({ err: `post with id ${req.params.id} not found.` });
        }

        res.status(200).json({ msg: `post with id ${req.params.id} deleted successfuly.` });
    } catch (err) {
        next(err);
    }
}