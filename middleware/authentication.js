const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';

const isAuthenticated = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({ message: 'Bearer Token required' });
    } // Retrieve token from query parameter
    const token = authHeader.split(' ')[1];
    jwt.verify(token, secretKey, (error, decodedToken) => {
        if (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Token is valid, store the decoded user data in the request
        req.user = decodedToken.user;
        next();
    });
};
module.exports = isAuthenticated
