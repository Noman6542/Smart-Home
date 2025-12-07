import React from 'react';
import Navbar from '../../Page/Shared/Navbar/Navbar';
import Footer from '../../Page/Shared/Footer/Footer';
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