const { body, validationResult } = require('express-validator');
const validation = {
    validateUser: [
        body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters long').isAlphanumeric()
            .withMessage('Username must be alphanumeric'),
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isStrongPassword().withMessage('Password must be at least 8 characters long and contain one uppercase, one lowercase, one number, and one special character'),
        body('type').optional().isIn(['ADMIN', 'REGULAR USER']).withMessage('Invalid type specified'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next(); // Move to the next middleware or controller if no errors
        }
    ],
    loginValidator: [
        body('email').isEmail().withMessage('Invalid email address'),
        body('password').isStrongPassword().withMessage('Password must be at least 8 characters long and contain one uppercase, one lowercase, one number, and one special character'),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next(); // Move to the next middleware or controller if no errors
        }
    ],
    postValidator: [
        body('title').notEmpty().withMessage("should not be empty"),
        body('content').notEmpty().withMessage("should not be empty"),
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next(); // Move to the next middleware or controller if no errors
        }
    ]
}

module.exports = validation;