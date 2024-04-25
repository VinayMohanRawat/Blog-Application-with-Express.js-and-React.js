import React from 'react';
import './Signup.css';


import { Form, useNavigation } from 'react-router-dom'

export const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <Form method='POST' className='form'>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input type="email" className="form-control" id="email" name='email' />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" name='password' />
      </div>
      <div className="form-group form-check">
        <input type="checkbox" className="form-check-input" id="checkbox" name='checkbox' />
        <label className="form-check-label" htmlFor="checkbox">Blogger</label>
      </div>

      <button type="submit" className="btn btn-primary mt-4 ">{isSubmitting ? 'Submitting...' : 'Submit'}</button>
    </Form>
  )
}
