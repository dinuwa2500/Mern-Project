import React from "react";

import Footer from "./newHeader/Footer";

import Header from "./Header";


const MainLayout = ({children}) => {
  return <div>
    
    <Header />
    {children}
    <Footer />

  </div>
};


export default MainLayout;
