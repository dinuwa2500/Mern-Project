import React from 'react';
import MainLayout from '../components/MainLayout';
import Hero from './homeContent/Hero';
import LatestCollection from './homeContent/LatestCollection';
import BestSeller from './homeContent/BestSeller';
import OurPolicy from './homeContent/OurPolicy';
import NewsletterBox from './homeContent/NewsletterBox';


const Home = () => {
    return (
   
        <MainLayout>
        <Hero/>
        
 
      
        <OurPolicy/>
        <NewsletterBox/>
        </MainLayout>
    )
  }
  

export default Home;
