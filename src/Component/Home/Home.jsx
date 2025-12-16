import React, { use } from 'react';
import Header from '../../Page/Header/Header';
import { AuthContext } from '../../Provider/AuthProvider';
import Loading from '../../Loading/Loading';
import MostPoPularDecorator from '../../Page/MostPopularDecorator/MostPoPularDecorator';
import HowItWorks from '../../Page/HowItWork/HowItWork';
import OurMission from '../../Page/OurMission/OurMission';
import WhyChooseUs from '../../Page/WhyChooseUs/WhyChooseUs';

const Home = () => {
  const {loading}= use(AuthContext)
  if(loading){
   return <Loading></Loading>
  }
  return (
    <div className='max-w-6xl mx-auto'>
      <Header></Header>
      <MostPoPularDecorator></MostPoPularDecorator>
      <HowItWorks></HowItWorks>
      <OurMission></OurMission>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;