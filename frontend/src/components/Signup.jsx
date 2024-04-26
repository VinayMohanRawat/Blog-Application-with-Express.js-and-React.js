import React from 'react'
import './Signup.css'


import { Form, useNavigation } from 'react-router-dom';

export const Signup = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Form method='POST' className='form'>
            <h2>Sign up</h2>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="name" className="form-control" id="name" name='name' required />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="form-control" id="email" name='email' required />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" name='password' required />
            </div>
            <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="confirmPassword" className="form-control" id="confirmPassword" name='confirmPassword' required />
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="checkbox" name="checkbox" />
                <label className="form-check-label" htmlFor="blogger">Blogger</label>
                <small id="checkbox" className="form-text text-muted">To create a blog, please check the box. Otherwise, do not select.</small>
            </div>

            <button className="btn btn-primary mt-4 " >{isSubmitting ? 'Submitting...' : 'Submit'}</button>
        </Form>
    )
}
