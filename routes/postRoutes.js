const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');

router.get('/students', postController.getAllStudents);
router.get('/students', userController.getAllStudents);
router.get('/', (req,res)=>{
    return res.json({message:"api routes"})
});
// Add other routes as needed...

module.exports = router;
