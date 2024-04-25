import React from 'react'
import './BloggerBlogsList.css';
import { Link } from 'react-router-dom';
import { CardItem } from '../CardItem';
import { getRole } from '../../util/auth';


export const BloggerBlogsList = ({ bloggerBlogs }) => {
    const role = getRole()

    return (
        <ul className='blogger-blogs-list'>
            {bloggerBlogs.length == 0 && <h6>No blog is available at this time.
                To initiate the creation of your first blog,
                please <Link to='/blogger/newblog' >click here</Link>.</h6>}

            {bloggerBlogs.map((blog) =>
                <CardItem
                    key={blog.id}
                    id={blog.id}
                    title={blog.title}
                    image={blog.image}
                    role={role}
                />
            )}
        </ul>
    )
}


