const post = require("../models/post");
const user = require("../models/user");

const postController = {
    allPosts: async (req, res) => {
        try {
            let posts = await post.find({}).populate("author")
            res.status(200).json({
                message: 'All Post Fetched Successfully',
                posts
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to fetched Post',
                error: error.message
            });
        }
    },
    searchPost: async (req, res) => {
        let searchText = req.query.author
        let query = {};
        try {
            if (searchText) {
                const users = await user.find({
                    $or: [
                        { firstName: { $regex: searchText, $options: 'i' } }, // Case-insensitive search in first name
                        { lastName: { $regex: searchText, $options: 'i' } } // Case-insensitive search in last name
                    ]
                });

                const authorIds = users.map(user => user._id);

                query.author = { $in: authorIds };

                // Execute the search query
                const posts = await post.find(query).populate("author");
                res.status(200).json({
                    message: 'All Post Fetched Successfully',
                    posts
                });
            }
        } catch (error) {
            res.status(500).json({
                message: 'Failed to search Post',
                error: error.message
            });
        }
    },
    deletePost: async (req, res) => {
        const { id } = req.params

        try {

            if (req.user.type == "ADMIN") {
                let posts = await post.findByIdAndDelete(id)
                res.status(202).json({
                    message: 'Post Deleted Successfully',
                });
            } else {
                // check that post is created by the regular user or not
                let posts = await post.find({ _id: id, author: req.user._id }, req.body)
                if (posts.length == 0) {
                    res.status(401).json({
                        message: 'You are not author of this post so you can not delete it',
                    });
                } else {
                    let posts = await post.findByIdAndDelete(id)
                    res.status(202).json({
                        message: 'Post Deleted Successfully',
                    });
                }
            }

        } catch (error) {
            res.status(500).json({
                message: 'Failed to delete Post',
                error: error.message
            });
        }
    },
    updatePost: async (req, res) => {
        const { id } = req.params
        console.log(req.user.type);

        try {
            if (req.user.type == "ADMIN") {
                let posts = await post.findByIdAndUpdate(id, req.body)
                res.status(200).json({
                    message: 'Post Updated Successfully',
                });
            } else {
                // check that post is created by the regular user or not
                let posts = await post.find({ _id: id, author: req.user._id }, req.body)
                if (posts.length == 0) {
                    res.status(401).json({
                        message: 'You are not author of this post so you can not update it',
                    });
                } else {
                    let posts = await post.findByIdAndUpdate(id, req.body)
                    res.status(200).json({
                        message: 'Post Updated Successfully',
                    });
                }

            }
        } catch (error) {
            res.status(500).json({
                message: 'Failed to update Post',
                error: error.message
            });
        }
    },
    postById: async (req, res) => {
        const { id } = req.params
        try {
            let posts = await post.findById(id)
            res.status(200).json({
                message: 'Post fetched Successfully',
                post: posts
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to get Post by id',
                error: error.message
            });
        }
    },
    create: async (req, res) => {
        const { _id } = req.user
        try {
            let posts = await post.create({
                ...req.body,
                author: _id
            })
            res.status(201).json({
                message: 'Post Created Successfully',
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to create Post',
                error: error.message
            });
        }
    },
    getAllPost: async (req, res) => {
        const { _id } = req.user
        let filterPost = {}
        if (req.user.type == "ADMIN") {
            filterPost = {}
        } else {
            filterPost.author = _id
        }
        try {
            let posts = await post.find(filterPost).populate("author")
            res.status(200).json({
                message: 'All Post Fetched Successfully',
                posts
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to get all Posts',
                error: error.message
            });
        }
    }
}

module.exports = postController