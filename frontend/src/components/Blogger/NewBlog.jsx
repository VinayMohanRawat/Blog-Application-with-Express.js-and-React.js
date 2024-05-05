import React from 'react'
import { Form, useNavigate, useNavigation, json, redirect } from 'react-router-dom'
import './NewBlog.css';
import { getAuthToken } from '../../util/auth';

export const NewBlog = ({ method, blog }) => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const navigate = useNavigate();

    function cancelHandler() {
        navigate('..')
    }

    return (
        <Form method={method} className='new-blog-form' encType="multipart/form-data">
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input type="title" className="form-control" id="title" name="title" required defaultValue={blog ? blog.title : ''} />
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea className="form-control" id="content" rows="3" name="content" required defaultValue={blog ? blog.content : ''}></textarea>
            </div>

            <div>
                <button className="btn btn-success px-5 mt-4 mr-2">{isSubmitting ? 'Submitting...' : 'Submit'}</button>

                <button type="button" className="btn btn-light px-5 mt-4 ml-2" onClick={cancelHandler} disabled={isSubmitting}>
                    Cancel
                </button>
            </div>
        </Form>
    )
}


export async function action({ request, params }) {
    let method = request.method;
    const blogId = params.blogId;

    const token = getAuthToken();

    let body = Object.fromEntries(await request.formData())

    let url = 'https://blog-application-backend-7wcn.onrender.com/createblog'

    if (method === 'PUT') {
        body.blogId = blogId
        url = 'https://blog-application-backend-7wcn.onrender.com/editblog'
    }

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(body)
    })

    if (response.status === 422 || response.status === 401) {
        return response
    }

    if (!response.ok) {
        throw json({ message: 'Could not authenticate user.' }, { status: 500 })
    }

    const resData = await response.json();
    let accountId = String(resData.accountId)

    if (method === 'PUT') {
        accountId = String(blogId)
    }

    return redirect('/blogger/upload/' + accountId)

}