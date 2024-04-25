import React from 'react'
import Alert from 'react-bootstrap/Alert';

import './PageContent.css';

export const PageContent = ({ title, children }) => {
    return (
        <div>
            <>
                <Alert className='error'>
                    <Alert.Heading>{title}</Alert.Heading>
                    <p>
                        {children}
                    </p>
                    <hr />
                </Alert>
            </>
        </div>
    )
}
