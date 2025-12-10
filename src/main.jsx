import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import App from './App.jsx'
import mainLayout from './Layout/Route/mainLayout.jsx';
import Home from './Component/Home/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Login from './Page/Login/Login.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import ErrorPage from './ErrorPage/ErrorPage.jsx';
import Register from './Page/Registar/Registar.jsx';
import Service from './Page/Service/Service.jsx';
import PrivateRoute from './PrivateRoute/PrivateRoute.jsx';
import Decorator from './Page/Decorator/Decorator.jsx';
import Coverage from './Page/Coverage/Coverage.jsx';
import ServiceDetails from './Page/Service/ServiceDetails.jsx';
import DashboardLayout from './Page/DashBoard/DashBoard.jsx';
import Profile from './Page/DashBoard/UsersAllThings/Profile/Profile.jsx';
import AddServicePage from './Page/DashBoard/AddService/AddService.jsx';
import { Toaster } from 'react-hot-toast';




const router = createBrowserRouter([
  {
    path: "/",
    Component:mainLayout,
    errorElement:<ErrorPage/>,
    children:[
      {
        index:true,
        Component:Home
      },
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      },
      {
        path:'/service',
        Component:Service
      },
      {
        path: "/service/:id", 
        Component:ServiceDetails
      }
      ,
      {
        path:'/decorator',
        element:<PrivateRoute><Decorator></Decorator></PrivateRoute>
      },
      {
        path:'/coverage',
        Component:Coverage,
        loader: ()=>fetch('/serviceCenter.json').then(res=>res.json())
      }





]},

{
    path: "/dashboard",
    Component:DashboardLayout,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'/dashboard/profile',
        Component:Profile
      },
      {
        path:'/dashboard/service',
        Component:AddServicePage
      },
    ]
  }
]);





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
       <Toaster position="top-center" reverseOrder={false} />
    </AuthProvider>
  </StrictMode>,
)
