import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Search from "./Search";

function Navbar({children}) {
  
    return (
        <>
        <Header/>
            {children}
        <Footer/>

        </>
        
    );
}
 export default Navbar;