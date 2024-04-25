import React from 'react'
import { Outlet } from 'react-router-dom'
import { BloggerNavigation } from '../components/Blogger/BloggerNavigation'

export const BloggerRootLayout = () => {

  return (
    <>
      <BloggerNavigation />
      <Outlet />
    </>
  )
}
