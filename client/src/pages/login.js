import React from 'react'
import { Button, Form } from 'semantic-ui-react'

const Login = () => (
  <Form>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' />
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' type={'password'}/>
    </Form.Field>
    <Button type='login'>Login</Button>
  </Form>
)

export default Login;