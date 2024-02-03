import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider , createBrowserRouter} from "react-router-dom"
import Home from './component/Home'
import Register from './component/Register'
import Login from './component/Login'
import Chat from "./component/Chat"
import Setavatar from './component/Setavatar'
import "./index.css"
import"./app.css"

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )

const router = createBrowserRouter([
  {
    path:"/",
    element:<Home/>,
  },
  {
    path:"/register",
    element:<Register/>,
  },
  {
    path:"/login",
    element:<Login/>,
  },
  {
    path:"/chat",
    element:<Chat/>
  },
  {
    path:"/setavatar",
    element:<Setavatar/>
  }
])

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Home />,
//     children: [
//       {
//         index: true,
//         element: <Home />, // Use the Home component for the index route
//       },
//       {
//         path: "register",  
//         element: <Register />
//       },
//       {
//         path: "login",  
//         element: <Login />
//       }
//     ]
//   }
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
