import React from 'react'
import './BloggerNavigation.css';
import { Link, useLocation } from 'react-router-dom'

export const BloggerNavigation = () => {
    const location = useLocation();
    const pathname = location.pathname;


    return (
        <ul className='blog_nav'>
            <li>
                {pathname === '/blogger' ?
                    <button type="button" className="btn btn-secondary px-5" aria-pressed="true" disabled>
                        Your blogs
                    </button>
                    :
                    <Link to='/blogger' className="btn btn-secondary px-5"  >
                        Your blogs
                    </Link>
                }
            </li>
            <li>
                {pathname === '/blogger/newblog' ?
                    <button className="btn btn-secondary px-5" disabled>
                        New Blog </button> :
                    <Link to='/blogger/newblog' className="btn btn-secondary px-5" >
                        New Blog
                    </Link>
                }

            </li>
        </ul >
    )
}
