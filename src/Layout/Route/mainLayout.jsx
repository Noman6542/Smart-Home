import React from 'react';
import Navbar from '../../Component/Navbar/Navbar';
import Footer from '../../Component/Footer/Footer';
import { Outlet } from 'react-router';

const mainLayout = () => {
  return (
    <div className='max-w-[1600px] mx-auto'>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default mainLayout;