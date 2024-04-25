import React from 'react'
import './Welcome.css'

import { Link } from 'react-router-dom'

export const Welcome = () => {
    return (
        <div className="jumbotron">
            <div>
                <h1 className="display-4">Welcome!</h1>
                <p className="lead">Your gateway to a world of knowledge, inspiration, and creativity! </p>
                <hr className="my-4" />
                <p>Let your imagination run wild and let's create something extraordinary together.</p>
                <Link to="/signup" className="btn btn-primary btn-lg mx-4 px-3" role="button">Create Your Blog</Link>
            </div>
        </div>
    )
}
