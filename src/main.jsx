import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AuthLayout from "./components/AuthLayout.jsx"
import Home from "./pages/Home.jsx"
import './index.css'
import Login from "./pages/Login.jsx"
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store.js'
import Signup from './pages/Signup.jsx'
import allPosts from './pages/AllPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'




const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path :"/",
        element: <Home/>


      },
      {
        path:"/login",
        element: (
          <AuthLayout authentication ={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path: "/signup",
        element:(
          <AuthLayout authentication={false}>
            <Signup/>

          </AuthLayout>
        )
      },
      {
        path: "/all-posts",
        element:(
          <AuthLayout authentication>
            <allPosts/>   
            {/* //we can check if the user is login or not by giving a query */}

          </AuthLayout>
        )

      },
      {
        path:"/edit-post/:slug",
        element:(
          <AuthLayout authentication>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path:"/post/:slug",
        element:(
          <AuthLayout authentication>
            <Post/>
          </AuthLayout>
        )
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
