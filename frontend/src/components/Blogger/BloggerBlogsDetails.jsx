import React from 'react'
import './BloggerBlogsDetails.css'
import { Link, useSubmit } from 'react-router-dom'


export const BloggerBlogsDetails = ({ blog }) => {
    const submit = useSubmit();

    function startDeleteHandler() {
        const proceed = window.confirm('Are you sure?');

        if (proceed) {
            submit(null, { method: 'delete' });
        }
    }

    return (
        <article className='blog'>
            <img src={blog.image} alt={blog.title} />
            <h1>{blog.title}</h1>
            <p>{blog.content}</p>
            <menu className="actions">
                <Link to="edit">
                    <button type="button" className="btn btn-outline-info px-4 ">Edit</button>
                </Link>
                <button type="button" className="btn btn-outline-danger px-3 " onClick={startDeleteHandler}>Delete</button>
            </menu>
        </article>

    )
}
