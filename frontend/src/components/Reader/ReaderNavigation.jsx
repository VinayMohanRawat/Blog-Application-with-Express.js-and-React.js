import React from 'react'
import '../Blogger/BloggerNavigation.css';
import { Link, useRouteLoaderData } from 'react-router-dom'

export const ReaderNavigation = () => {
    const { token, } = useRouteLoaderData('root')

    return (
        <>
            {token && <ul className='blog_nav'>
                <li>
                    <Link to='/reader' >
                        <button type="button" className="btn btn-secondary px-5" aria-pressed="true">All blogger's blogs</button>
                    </Link>
                </li>
            </ul>}
        </>

    )
}
