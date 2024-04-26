import 'bootstrap/dist/css/bootstrap.min.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { RootLayout } from './pages/Root';
import { ErrorPage } from './pages/Error';
import { HomePage } from './pages/Home';
import { SignupPage, action as sigupAction } from './pages/Signup';
import { LoginPage, action as loginAction } from './pages/Login';
import { action as logoutAction } from './pages/Logout';
import { tokenLoader } from './util/auth';
import { BloggerRootLayout } from './pages/BloggerRoot';
import { BloggerBlogsPage, loader as bloggerLoader } from './pages/BloggerBlogs';
import { NewBlogPage } from './pages/NewBlogPage';
import { BloggerBlogDetailsPage, loader as bloggerBlogsLoader, action as deleteBlogAction } from './pages/BloggerBlogDetails';
import { EditBlogPage } from './pages/EditBlog';
import { action as newBlogAction } from './components/Blogger/NewBlog'
import { AllBlogs, loader as readerLoader } from './components/Reader/AllBlogs'
import { ReaderRootLayout } from './pages/ReaderRoot';
import { BlogDetailsPage, loader as blogDetails, action as commentAction } from './pages/BlogDetails';
import { UploadImagePage } from './pages/UploadImage';
import { SuccessPage } from './pages/Success';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'signup',
        element: <SignupPage />,
        action: sigupAction
      },
      {
        path: 'login',
        element: <LoginPage />,
        action: loginAction
      },
      {
        path: 'logout',
        action: logoutAction
      },
      {
        path: 'success',
        element: <SuccessPage />
      },
      {
        path: 'blogger',
        element: <BloggerRootLayout />,
        children: [
          {
            index: true,
            element: <BloggerBlogsPage />,
            id: 'blog-list',
            loader: bloggerLoader,
          },
          {
            path: ':blogId',
            id: 'blogger-blog-details',
            loader: bloggerBlogsLoader,
            children: [
              {
                index: true,
                element: <BloggerBlogDetailsPage />,
                action: deleteBlogAction
              },
              {
                path: 'edit',
                element: <EditBlogPage />,
                action: newBlogAction
              }
            ]
          },
          {
            path: 'newblog',
            element: <NewBlogPage />,
            action: newBlogAction
          },
          {
            path: 'upload/:uploadId',
            element: <UploadImagePage />
          }
        ]
      },
      {
        path: 'reader',
        element: <ReaderRootLayout />,
        children: [
          {
            index: true,
            element: <AllBlogs />,
            loader: readerLoader
          },
          {
            path: ':blogId',
            element: <BlogDetailsPage />,
            loader: blogDetails,
            action: commentAction
          }
        ]
      }
    ]
  }

])


function App() {

  return <RouterProvider router={router} />
}

export default App
