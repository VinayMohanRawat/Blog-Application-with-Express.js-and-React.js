import React from 'react'
import './BloggerNavigation.css';
import { NavLink } from 'react-router-dom'

export const BloggerNavigation = () => {

    return (
        <ul className='blog_nav'>
            <li>
                <NavLink to='/blogger' >
                    <button type="button" className="btn btn-secondary px-5" aria-pressed="true">Your blogs</button>
                </NavLink>
            </li>
            <li>
                <NavLink to='/blogger/newblog' >
                    <button type="button" className="btn btn-secondary px-5">New Blog</button>
                </NavLink>
            </li>
        </ul>
    )
}
