import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css'
import App from './App.jsx'
import mainLayout from './Layout/Route/mainLayout.jsx';
import Home from './Component/Home/Home.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router';




const router = createBrowserRouter([
  {
    path: "/",
    Component:mainLayout,
    // errorElement:<Page404></Page404>,
    children:[
      {
        index:true,
        Component:Home
      },





]}]);





createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
