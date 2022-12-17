const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

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

router.post('/sign-up', userController.signup);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

module.exports = router;