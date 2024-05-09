const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const isAuthenticated = require('../middleware/authentication');
const validation = require('../middleware/validation');

router.get('/allpost', postController.allPosts);
router.post('/', isAuthenticated, validation.postValidator, postController.create);
router.get('/search', isAuthenticated, postController.searchPost);
router.get('/:id', isAuthenticated, postController.postById);
router.put('/:id', isAuthenticated, validation.postValidator, postController.updatePost);
router.delete('/:id', isAuthenticated, postController.deletePost);
router.get('/', isAuthenticated, postController.getAllPost);
// router.get('/students', userController.getAllStudents);
// router.get('/', (req, res) => {
//     return res.json({ message: "api routes" })
// });
// Add other routes as needed...

module.exports = router;
