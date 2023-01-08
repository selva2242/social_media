const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config')
const { validateUserRegistration, validateUserInput } = require('../../utils/validators')

const generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        userName: user.userName
    },
    SECRET_KEY,
    { expiresIn: '1h' })
}

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
       const token = generateToken(newUser);

        return {
            "id" : response._id,
            "userName" : response.userName,
            "email" : response.email,
            "token" : token
        }  

       },
       async loginUser(_parent, {email, password}){
           const {errors, isValidUserDetails } = validateUserInput(email, password);

           if(!isValidUserDetails){
               throw new UserInputError('Error', {errors})
           }

           //check user exists with same email already
            const existingUser = await User.findOne({email})
            if(!existingUser){
                throw new UserInputError('Erros', {
                    error : {
                        user : "No user exists with this email"
                    }
                })
            }

            const match = await bcrypt.compare(password, existingUser.password);
            if(!match){
                throw new UserInputError('Errros', {
                    error : {
                        user : "Invalid Credentials"
                    }
                })
            }

            // generate hashToken 
            const token = generateToken(existingUser);

            return {
                "id" : existingUser._id,
                "userName" : existingUser.userName,
                "email" : existingUser.email,
                "token" : token
            }  
       }
    }
}