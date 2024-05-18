import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './style/Header.css';
import TokenManager from "../apis/TokenManager";

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRoles, setUserRoles] = useState([]);

    useEffect(() => {
        const token = TokenManager.getAccessToken();
        if(token){
            setIsAuthenticated(true);
            const roles = TokenManager.getUserRoles();
            setUserRoles(roles);
        }else{
            setIsAuthenticated(false);
            setUserRoles([]);
        }
    }, []);

    useEffect(() =>{
        const token = TokenManager.getAccessToken();
        if(token){
            setIsAuthenticated(true);
        }
        else{ 
            setIsAuthenticated(false);
        }
    }, [])

    const handleLogout = () =>{
        TokenManager.clear();
        setIsAuthenticated(false);
        window.location.href = `/`;
    }
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
                    <Link to="about">About us</Link>
                </li>
                <li>
                    <Link to="contacts">Contacts</Link>
                </li>

                { isAuthenticated ? (
                <>
                {userRoles.includes("TRAVELAGENCY") && (
                    <>
                    <li>
                    <Link to="list-trip">List a trip!</Link>
                    </li>
                    <li>
                    <Link to="mylistings">My listings</Link>
                    </li>
                    </>
                    
                )}
                {userRoles.includes("USER") && (
                    <li>
                    <Link to="mybookings">My bookings!</Link>
                    </li>
                    
                )}
                    
                    <li>
                    <Link to="profile">Profile Page</Link>
                    </li>
                    <li>
                    <Link onClick={handleLogout}>Logout</Link>
                    </li>
                </>
                ) : (
                    <>
                    <li>
                    <Link to="login">Login</Link>
                    </li>
                    <li>
                    <Link to="register">Register</Link>
                    </li>
                    </>
                )}
            </ul>
        </nav>
        
        </div>
        
    );
}
 export default Header;