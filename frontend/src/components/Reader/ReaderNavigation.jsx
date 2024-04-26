import React from 'react'
import '../Blogger/BloggerNavigation.css';
import { Link, useRouteLoaderData, useLocation } from 'react-router-dom'

export const ReaderNavigation = () => {
    const { token, role } = useRouteLoaderData('root')
    const location = useLocation();
    const pathname = location.pathname;

    return (
        <>
            {token && role == 2 &&
                <ul className='blog_nav'>
                    <li>
                        {pathname === '/reader' ?
                            <button
                                className="btn btn-secondary px-5"
                                aria-pressed="true" disabled>
                                All blogger's blog</button> :
                            <Link to='/reader' className="btn btn-secondary px-5" >
                                All blogger's blogs
                            </Link>
                        }
                    </li>
                </ul>

            }
        </>

    )
}
