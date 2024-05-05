import React from 'react'
import { BloggerBlogsDetails } from '../components/Blogger/BloggerBlogsDetails'
import { useRouteLoaderData, json, redirect } from 'react-router-dom';
import { getAuthToken } from '../util/auth';


export const BloggerBlogDetailsPage = () => {
    const data = useRouteLoaderData('blogger-blog-details');
    const token = getAuthToken();

    return (
        <>
            {token && <BloggerBlogsDetails blog={data} />}
        </>

    )
}


export async function loader({ request, params }) {
    const { blogId } = params;
    let token = getAuthToken();

    const response = await fetch('https://blog-application-backend-7wcn.onrender.com/blogdetails/' + blogId, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch blogs details.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json()
        return resData.data
    }

}


export async function action({ request, params }) {
    const blogId = params.blogId;

    const token = getAuthToken();

    const response = await fetch('https://blog-application-backend-7wcn.onrender.com/deleteblog/' + blogId, {
        method: request.method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }

    });

    if (!response.ok) {
        throw json({ message: 'Could not delete event' }, { status: 500 })
    }

    return redirect('/blogger')
}