import React from "react";
import { Link } from "react-router-dom";
import './style/Header.css'

function Header() {
    return (
        <div className="Header">
        <h2>Travel Temptation</h2>
        <nav>
            <Link to="/">Home</Link>
            <ul>       
                <li>
                    <Link to="tips">Travel Tips</Link>
                </li>
                <li>
                    <Link to="list-trip">List a trip!</Link>
                </li>
                <li>
                    <Link to="about">About us</Link>
                </li>
                <li>
                    <Link to="contacts">Contacts</Link>
                </li>
            </ul>
        </nav>
        
        </div>
        
    );
}
 export default Header;