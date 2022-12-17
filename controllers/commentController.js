const Comment = require('../models/comment');
const { body, validationResult } = require('express-validator');

exports.get_comments = async (req, res, next) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId });

        if (!comments) {
            return res.status(404)
                      .json({ err: `Comments not found.` });
        }

        res.status(200).json({ comments });
    } catch (err) {
        next(err);
    }
}

exports.get_single_comment = async (req, res, next) => {
    try {
        const comment = await Comment.findById(eq.params.id);

        if (!comment) {
            return res.status(404)
                      .json({ err: `Comment with id ${req.params.id} not found.` });
        }

        res.status(200).json({ comment });
    } catch (err) {
        next(err);
    }
}

exports.create_comment = [
    body('text', 'Empty text').trim().escape(),
    body('user', 'Empty user').trim().escape(),
    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.json({
                data: req.body,
                errors: errors.array()
            });
        }

        const comment = new Comment({
            text: req.body.text,
            user: req.body.uesr
        });

        comment.save( err => {
            if (err) return next(err);

            res.status(200).json({
                comment,
                msg: 'Comment Sent'
            });
        });
    }
];

exports.update_comment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id);

        if (!comment) {
            return res.status(404)
                      .json({ err: `comment with id ${req.params.id} not found.` });
        }

        res.status(200).json({ 
            post,
            msg: `comment with id ${req.params.id} updated successfuly.` 
        });
    } catch (err) {
        next(err);        
    }
}

exports.delete_post_comments = async (req, res, next) => {
    try {
        const comments = await Comment.deleteMany({ postId: req.params.postId });

        if (!comments) {
            return res.status(404)
                      .json({ err: `Comments not found.` });
        }

        res.status(200).json({ comments });
    } catch (err) {
        next(err);
    }
}

exports.delete_single_comment = async (req, res, next) => {
    try {
        const comment = await Comment.findByIdAndRemove(req.params.id);

        if (!comment) {
            return res.status(404)
                      .json({ err: `comment with id ${req.params.id} not found.` });
        }

        res.status(200).json({ 
            post,
            msg: `comment with id ${req.params.id} deleted successfuly.` 
        });
    } catch (err) {
        next(err);        
    }
}