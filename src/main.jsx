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
      }





]}]);





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
