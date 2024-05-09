const express = require('express');
const router = express.Router();
const userRoutes=require("../routes/userRoutes")
const postRoutes=require("../routes/postRoutes")

router.use('/user', userRoutes);
router.use('/posts', postRoutes );
router.get('/', (req,res)=>{
    return res.json({message:"api routes"})
});
// Add other routes as needed...

module.exports = router;
