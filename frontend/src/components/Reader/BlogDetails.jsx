import React from 'react'
import './BlogDetails.css'
import { Form } from 'react-router-dom'
import { Comment } from './Comment'

export const BlogDetails = ({ blog }) => {
    console.log('blog=>', blog)
    const comments = blog.comment;

    return (
        <>
            <article className='blog'>
                <img src={blog.image} alt={blog.title} />
                <h1>{blog.title}</h1>
                <p>{blog.content}</p>
            </article>

            <section className="mb-5">
                <div className="card bg-light">
                    <div className="card-body">
                        <div className="d-flex">
                            <ul>
                                {comments.map((comment) =>
                                    <Comment
                                        key={comment.id}
                                        name={comment.customerName}
                                        comment={comment.comment}
                                    />
                                )}
                            </ul>
                        </div>

                        <Form method='POST' className="mb-4">
                            <textarea className="form-control" rows="3" placeholder="Join the discussion and leave a comment!" name='comment'>
                            </textarea>
                            <button className="btn btn-dark mt-2">Add comment</button>
                        </Form>

                    </div>
                </div>
            </section>
        </>
    )
}

