import {
    createBrowserRouter,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home/Home";
import JoinUs from "../pages/Home/JoinUs/JoinUs";
import Register from "../pages/Register/Register";
import PostDetails from "../pages/Home/PostDetails/PostDetails";
import Dashboard from "../layout/Dashboard";
import Announcement from "../pages/Dashboard/Announcement/Announcement";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import Comments from "../pages/Dashboard/Comments/Comments";
import Membership from "../pages/Membership/Membership";
import Payment from "../pages/Home/Payment/Payment";

  
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path: '/',
            element: <Home></Home>,
            loader: () => fetch('https://online-forum-server-beta.vercel.app/postCount')
        },
        {
           path: '/postDetails/:id',
           element: <PostDetails></PostDetails>,
           loader: ({params}) => fetch(`https://online-forum-server-beta.vercel.app/post/post_time/id/${params.id}`)
        },
        {
            path: '/joinUs',
            element: <JoinUs></JoinUs>
        },
        {
            path: '/register',
            element: <Register></Register>
        },
        {
            path: '/membership',
            element: <PrivateRoute><Membership></Membership></PrivateRoute>
        },
        {
            path: '/payment',
            element: <Payment></Payment>
        },
        
      ]
    },
    {
      path: 'dashboard',
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        // normal user routes
        {
          path: 'myProfile',
          element: <MyProfile></MyProfile>
        },
        {
          path: 'addPost',
          element: <AddPost></AddPost>
        },
        {
          path: 'myPosts',
          element: <MyPosts></MyPosts>
        },

        // admin only routes
        {
          path: 'adminProfile',
          element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
        },
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path: 'comments',
          element: <AdminRoute><Comments></Comments></AdminRoute>
        },
        {
          path: 'announcement',
          element: <AdminRoute><Announcement></Announcement></AdminRoute>
        }
      ]
    }
  ]);