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
                    <Link to="excursions">Excursions</Link>
                </li>
                <li>
                    <Link to="explore">Explore</Link>
                </li>
                <li>
                    <Link to="about">About</Link>
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