import React from 'react'
import '../Blogger/BloggerNavigation.css';
import { NavLink, useRouteLoaderData } from 'react-router-dom'

export const ReaderNavigation = () => {
    const { token, role } = useRouteLoaderData('root')

    return (
        <>
            {token && <ul className='blog_nav'>
                <li>
                    <NavLink to='reader' >
                        <button type="button" className="btn btn-secondary px-5" aria-pressed="true">All blogger's blogs</button>
                    </NavLink>
                </li>
            </ul>}
        </>

    )
}
