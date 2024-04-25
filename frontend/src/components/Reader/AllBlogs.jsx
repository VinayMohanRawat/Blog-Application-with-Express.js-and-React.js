import React from 'react'
import { json, useLoaderData, useRouteLoaderData } from 'react-router-dom';
import { getAuthToken } from '../../util/auth';
import { CardItem } from '../CardItem';

export const AllBlogs = () => {
    const { token, role } = useRouteLoaderData('root');
    const data = useLoaderData();

    return (
        <>
            <ul className='blogger-blogs-list'>
                {data.length == 0 && <h6>No blog is available at this time.
                </h6>}

                {data.map((blog) =>
                    <CardItem
                        key={blog.id}
                        id={blog.id}
                        title={blog.title}
                        image={blog.image}
                        role={role}
                        commentCount={blog.comment.length}
                    />
                )}
            </ul>


        </>
    )
}


export async function loader() {
    const token = getAuthToken();

    const response = await fetch('http://localhost:3000/allblogs', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch blogs.' },
            { status: 500 }
        );
    } else {
        const resData = await response.json()
        console.log(resData)
        return resData.data
    }

}