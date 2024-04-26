import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';

export const SuccessPage = () => {
    return (
        <Alert key='success' variant='success' className='p-5'>
            <p style={{ textAlign: 'center', fontSize:'20px' }}>
                Your account has been successfully created.
                Please
                <span class="badge badge-success mx-2">
                    <Link to='/login' style={{color:'white'}}> Login </Link>
                </span> 
                with the email and password you provided.
            </p>
        </Alert>
    )
}


