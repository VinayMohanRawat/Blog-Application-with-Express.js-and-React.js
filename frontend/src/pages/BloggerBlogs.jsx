import React from 'react'
import { useRouteLoaderData } from 'react-router-dom'
import { BloggerBlogsList } from '../components/Blogger/BloggerBlogsList'
import { getAuthToken } from '../util/auth';

export const BloggerBlogsPage = () => {
  const data = useRouteLoaderData('blog-list');

  return (
    <>
      <BloggerBlogsList bloggerBlogs={data} />
    </>

  )
}


export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:3000/bloglist', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch blogs.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json()
    console.log('BloggerBlogs =>', resData.data)
    return resData.data
  }

}