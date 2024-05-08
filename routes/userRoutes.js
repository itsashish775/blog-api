const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validation = require('../middleware/validation');
const isAuthenticated = require('../middleware/authentication');

router.get('/me', isAuthenticated, userController.myInfo);
router.put('/me', isAuthenticated, userController.updateProfile);
router.post('/register', validation.validateUser, userController.registerUser);
router.post('/login', validation.loginValidator, userController.userLogin);
router.put('/me/password', isAuthenticated, userController.changePassword);
router.get('/', (req, res) => {
    return res.json({ message: "api routes" })
});
// Add other routes as needed...

module.exports = router;
