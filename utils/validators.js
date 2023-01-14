const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;


const validateUserRegistration = (username, email, password, confirmPassword) => {
    const errors = {};
    if(username.trim() == ""){
        errors.username = "username cannot be empty"
    }
    if(email.trim() == ""){
        errors.email = "Email cannot be empty"
    }else{
        if(!email.match(emailRegEx)){
            errors.email = "Please enter the valid email"
        }
    }
    if(password == ''){
        errors.password = "Password cannot be empty"
    }else if(password !== confirmPassword){
        errors.password = "password does not match"
    }

    return {
        errors, 
        isValidUserDetails : Object.keys(errors).length == 0
    }
}

const validateUserInput = (email, password) => {
    const errors = {};
    if(email.trim() == ""){
        errors.email = "Email cannot be empty"
    }else{
        if(!email.match(emailRegEx)){
            errors.email = "Please enter the valid email"
        }
    }
    if(password == ''){
        errors.password = "Password cannot be empty"
    }

    return {
        errors, 
        isValidUserDetails : Object.keys(errors).length == 0
    }
}


module.exports = {
    validateUserRegistration,
    validateUserInput
}