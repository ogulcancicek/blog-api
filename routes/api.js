const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');

router.get('/', (req, res) => {
    res.redirect('/api/posts');
});

// Get All Posts
router.get('/posts', postController.get_posts);

// Create Post
router.post('/posts',
            passport.authenticate('jwt', { session: false }),
            postController.create_post);
// Delete Post
router.delete('/posts/:id', 
            passport.authenticate('jwt', { session: false }),
            postController.delete_post);
// Update Post
router.put('/posts/:id',
            passport.authenticate('jwt', { session: false }),
            postController.update_post);
// Get Single Post
router.get('/posts/:id', postController.get_single_post);
// Get Post Comments
router.get('/posts/:postId/comments', commentController.get_comments);
// Create Comment
router.post('/posts/:postId/comments', 
            passport.authenticate('jwt', { session: false }),
            commentController.create_comment);
// Update Comment
router.put('/posts/:postId/comments/:commentId', 
            passport.authenticate('jwt', { session: false }),
            commentController.update_comment);
// Delete Post Comments
router.delete('/posts/:postId/comments', 
            passport.authenticate('jwt', { session: false }),
            commentController.delete_post_comments);
// Delete Comment
router.delete('/posts/:postId/comments/:commentId', 
            passport.authenticate('jwt', { session: false }),
            commentController.delete_single_comment);
// Get Single Comment
router.get('/posts/:postId/comments/:commentId', 
            passport.authenticate('jwt', { session: false }),
            commentController.get_single_comment);

router.post('/sign-up', userController.signup);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

module.exports = router;