import React, { use } from 'react';
import Header from '../../Page/Header/Header';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../Loading/Loading';

const Home = () => {
  const {loading}= use(AuthContext)
  if(loading){
   return <Loading></Loading>
  }
  return (
    <div className='max-w-6xl mx-auto'>
      <Header></Header>
    </div>
  );
};

export default Home;