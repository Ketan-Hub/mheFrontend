import React, { useEffect } from "react";

import ScrollToTop from "./ScrollToTop";
import Header from './Header'
import Home from './Home'
// import Home from './Home'
import Footer from './Footer'
// import { Route,Routes } from 'react-router-dom';
// import './Landing.css'
const Landing = () => {
  return (
    <>
      <ScrollToTop />
    <Header/>
    <Home/>
    <Footer/>
    </>
  );
};

export default Landing;
