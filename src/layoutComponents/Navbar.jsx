import React from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

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