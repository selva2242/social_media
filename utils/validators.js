

const validateUserRegistration = (userName, email, password, confirmPassword) => {
    const errors = {};
    if(userName.trim() == ""){
        errors.userName = "UserName cannot be empty"
    }
    if(email.trim() == ""){
        errors.email = "Email cannot be empty"
    }else{
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if(!email.match(regEx)){
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

module.exports = {
    validateUserRegistration
}