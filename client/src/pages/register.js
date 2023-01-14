import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';



import { useForm } from '../hooks/useForm'


const REGISTER_USER = gql`
  mutation registerUser(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    registerUser(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      token
    }
  }
`;

const Register = () => {

    const [errors, setErrors] = useState({})
    const history = useNavigate()
    const { onChange, onSubmit, values  } = useForm(registerUser, {
        'username' : '',
        'email' : '',
        'password' : '',
        'confirmPassword' : ''
    })
    
    const [addUser, { loading }] = useMutation(REGISTER_USER, {
        update(_, data){
            console.log(data)
            history('/');
        },
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.errors)
        },
        variables : values
    })

    function registerUser(){
        setErrors({})
        console.log('Register user getting called')
        addUser();
    }

    return (
        <div className='form-container'>
            <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
                <Form.Field >
                    <label>username</label>
                    <input placeholder='username' 
                    name = 'username'
                    value={values.username} 
                    error = {errors.username ? true : false}
                    onChange={onChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' 
                    name='email'
                    type='email' 
                    error = {errors.email ? true : false}
                    value={values.email} 
                    onChange={onChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' 
                    name='password'
                    type='password' 
                    value={values.password} 
                    error = {errors.password ? true : false}
                    onChange={onChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Re-enter Password</label>
                    <input placeholder='Re-enter password' 
                    name='confirmPassword'
                    type='password' 
                    // error = {errors.username ? true : false}
                    value={values.confirmPassword} 
                    onChange={onChange}/>
                </Form.Field>
                <Button type='submit'>Register</Button>
                {
                    Object.keys(errors).length > 0 &&
                    <div className="ui error message">
                        <ul className="list">
                            {Object.values(errors).map((value) => (
                            <li key={value}>{value}</li>
                            ))}
                        </ul>
                    </div>       
                }
            </Form>
        </div>
    )
}


  export default Register;