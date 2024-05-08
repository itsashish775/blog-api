const user = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { username, email, password, type } = req.body;

            const userExists = await user.findOne({ $or: [{ email }, { username }] });
            if (userExists) {
                return res.status(409).send({ message: 'Email or Username already exists' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user1 = await user.create({
                username,
                email,
                password: hashedPassword,
                type
            });

            res.status(201).json({
                message: 'User registered successfully',
                userId: user1._id
            });
        } catch (error) {
            res.status(500).json({
                message: 'Failed to register user',
                error: error.message
            });
        }

    },
    userLogin: async (req, res) => {
        const { email, password } = req.body;
        console.log("this is main user Route route", email, password);

        try {
            const userExists = await user.findOne({ email });

            if (!userExists) {
                return res.status(404).json({ message: 'User does not exist with email ' + email });
            }

            const passwordMatch = await bcrypt.compare(password, userExists.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Password does not match.' });
            }

            const token = jwt.sign({ user: userExists }, 'your-secret-key', {
                expiresIn: '1h'
            });

            return res.status(200).json({ user: userExists, token });
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to login user',
                error: error.message
            });
        }

    },
    myInfo: async (req, res) => {
        try {
            const { user } = req
            return res.status(500).json({
                message: 'Login User Info',
                data: user
            })
        } catch (error) {
            return res.status(500).json({
                message: 'Failed to fetch user details',
                error: error.message
            });
        }
    },
    changePassword: async (req, res) => {
        const { currentPassword, newPassword } = req.body;
        const { _id } = req.user;

        try {
            // Find the user by login user _id
            const existUser = await user.findById(_id);



            // Compare the current password with the stored hashed password
            const passwordMatch = await bcrypt.compare(currentPassword, existUser.password);

            // If the passwords don't match, return an error
            if (!passwordMatch) {
                return res.status(401).json({ message: 'Current password is incorrect' });
            }

            // Hash the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);

            await user.findByIdAndUpdate(_id, { password: hashedNewPassword });


            return res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to change password', error: error.message });
        }
    },
    updateProfile: async (req, res) => {
        const { _id } = req.user; // Assuming userId is passed as a route parameter
        const { username, firstName, lastName, dob } = req.body;

        try {
            // check that username already exist of not

            let usernameexist = await user.findOne({ username: username })

            // Check if the user exists
            if (usernameexist) {
                return res.status(404).json({ message: 'Use a different username' });
            }

            // Update the user's profile data
            let updatedUser = {
                username: username,
                firstName,
                lastName,
                dob:new Date(dob)
            }
            await user.findByIdAndUpdate(_id, updatedUser);

            // Save the updated user object
            return res.status(200).json({ message: 'User profile updated successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Failed to update user profile', error: error.message });
        }
    }
}

module.exports = userController