const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config')
const { validateUserRegistration } = require('../../utils/validators')


module.exports = {
    Mutation : {
       async registerUser(_parent, {registerInput : {userName, email, password, confirmPassword}} ){
           
        //validating user details
        const { errors, isValidUserDetails} = validateUserRegistration(userName, email, password, confirmPassword)
        if(!isValidUserDetails){
            throw new UserInputError('Errors', {errors})
        }

        //check user exists with same email already
        const isUserExists = await User.findOne({email})
        if(isUserExists){
            throw new UserInputError('Erros', {
                error : {
                    user : "User already exists with this email"
                }
            })
        }

        //hashing the password 
        const hashedPassword =  await bcrypt.hash(password, 12)

        const newUser = new User({
            userName : userName,
            email    : email, 
            password : hashedPassword,
            createdAt : new Date().toISOString()
        })
        const response = await newUser.save();

        // generate hashToken 
        const token = jwt.sign({
            id: newUser.id,
            email: newUser.email,
            userName: newUser.userName
        },
        SECRET_KEY,
        { expiresIn: '1h' })

        return {
            "id" : response._id,
            "userName" : response.userName,
            "email" : response.email,
            "token" : token
        }  

       }
    }
}