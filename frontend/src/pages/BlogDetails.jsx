import React from 'react'
import { useLoaderData, json, redirect } from 'react-router-dom'
import { BlogDetails } from '../components/Reader/BlogDetails'
import { getAuthToken } from '../util/auth'

export const BlogDetailsPage = () => {
  const data = useLoaderData();

  return (
    <>
      <BlogDetails blog={data} />
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

  let token = getAuthToken();

  const data = await request.formData()

  const body = {
    comment: data.get('comment'),
    blogId: blogId,
  }

  const response = await fetch('https://blog-application-backend-7wcn.onrender.com/createcomment', {
    method: 'POST',
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

  if (resData.status === false) {
    throw json({ message: 'Could not authenticate user.' }, { status: 500 })
  }

  return redirect('/')

}