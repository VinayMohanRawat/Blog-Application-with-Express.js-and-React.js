import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { Welcome } from '../components/Welcome'
import { BloggerNavigation } from '../components/Blogger/BloggerNavigation'
import { ReaderNavigation } from '../components/Reader/ReaderNavigation'


export const HomePage = () => {
    const { token, role } = useRouteLoaderData('root')
    
    return (
        <div>
            {token && (role == 1) ? <BloggerNavigation /> : <ReaderNavigation />}
            {!token && <Welcome />}
        </div>
    )
}
