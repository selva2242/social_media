import React from 'react'
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Register = () => (
  <Form>
    <Form.Field>
      <label>UserName</label>
      <input placeholder='userName' />
    </Form.Field>
    <Form.Field>
      <label>Email</label>
      <input placeholder='Email' type={"email"}/>
    </Form.Field>
    <Form.Field>
      <label>Password</label>
      <input placeholder='Password' type="password"/>
    </Form.Field>
    <Form.Field>
      <label>Re-enter Password</label>
      <input placeholder='Re-enter password' type="password"/>
    </Form.Field>
    <Form.Field>
      <Checkbox label='I agree to the Terms and Conditions' />
    </Form.Field>
    <Button type='register'>Register</Button>
  </Form>
)

export default Register