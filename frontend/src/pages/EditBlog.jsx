import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { NewBlog } from '../components/Blogger/NewBlog'


export const EditBlogPage = () => {
    const data = useRouteLoaderData('blogger-blog-details');

    return (
        <NewBlog method='PUT' blog={data} />
    )
}
