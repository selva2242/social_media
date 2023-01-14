import React, { useState } from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Register = () => {

    const [userDetails, setUserDetails ] = useState({
        'username' : '',
        'email' : '',
        'password' : '',
        'confirmPassword' : ''
    })
    const [errors, setErrors] = useState({
        'username' : '',
        'email' : '',
        'password' : '',
        'confirmPassword' : ''
    })

    const udpateUserDetails = (e) => {
        setUserDetails({...userDetails , [e.target.name] : e.target.value})
    }

    const registerUser = () => {
        // const currentErros = {}
        // if(password.length < 9){
        //     errors.password = ' Password length should be minimum 8 characters'
        // } else{
        //     errors.password = ' Passwords does not match'
        // }    
        // console.log(userDetails)
        console.log('Register user getting called')
    }

    return (
        <Form onSubmit={registerUser}>
            <Form.Field >
                <label>username</label>
                <input placeholder='username' 
                name = 'username'
                value={userDetails.username} 
                onChange={udpateUserDetails}/>
            </Form.Field>
            <Form.Field>
                <label>Email</label>
                <input placeholder='Email' 
                name='email'
                type='email' 
                value={userDetails.email} 
                onChange={udpateUserDetails}/>
            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password' 
                name='password'
                type='password' 
                value={userDetails.password} 
                onChange={udpateUserDetails}/>
            </Form.Field>
            <Form.Field>
                <label>Re-enter Password</label>
                <input placeholder='Re-enter password' 
                name='confirmPassword'
                type='password' 
                value={userDetails.confirmPassword} 
                onChange={udpateUserDetails}/>
            </Form.Field>
            <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
            </Form.Field>
            <Button type='submit'>Register</Button>
        </Form>
    )
}


  

export default Register