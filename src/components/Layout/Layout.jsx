import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from 'react-router-dom'
import  { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <>
     
    <Header/>
    <main style={{minHeight:"70vh"}}>
      <Toaster />
      <Outlet/>
    </main>
    <Footer/>
    </>
  );
};

export default Layout;
