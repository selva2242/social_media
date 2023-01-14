import React, { useState } from 'react'
import { Button, Form } from 'semantic-ui-react'
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router-dom';


import { useForm } from '../hooks/useForm'


const LOGIN_USER = gql`
mutation($email: String!, $password: String!){
  loginUser(email: $email, password: $password) {
    id,
    token
  }
}
`;

const Login = (props) => {

    const [errors, setErrors] = useState({})
    const history = useNavigate();

    const { onChange, onSubmit, values  } = useForm(loginUser, {
        'email' : '',
        'password' : '',
    })
    
    const [userLogin, { loading }] = useMutation(LOGIN_USER, {
      update(
        _,
        {
          data: { login: userData }
        }
      ) {
        console.log("aslkdf");
        // context.login(userData);
        history('/');
      },
      onError(err) {
        setErrors(err.graphQLErrors[0].extensions.errors);
      },
      variables: values
    })

    function loginUser(){
        setErrors({});
        console.log('login user getting called')
        userLogin();
    }

    return (
        <Form onSubmit={onSubmit} className={loading ? 'loading' : ''}>
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
            <Button type='submit'>Login</Button>
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
    )
}


  export default Login;