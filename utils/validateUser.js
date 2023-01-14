const { AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config')

const checkIsValidUser = (context) => {
    const authHeader = context.req.headers.authorization;

    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        console.log(token)
        if(token){
            const user = jwt.verify(token, SECRET_KEY);
            return user;
        }
    }
    throw new AuthenticationError('Invalid/Expired token');
}

module.exports = checkIsValidUser
