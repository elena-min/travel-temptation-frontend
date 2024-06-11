import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlane, faUser, faSignOutAlt, faBook, faComments, faList, faPenFancy } from '@fortawesome/free-solid-svg-icons';
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
            <Link to="/">
                <h2>Travel Temptation</h2>
            </Link>
            <nav className="headernav">
            <ul>       
                <li>
                    <Link to="traveltips">Travel Tips</Link>
                </li>
                <li>
                    <Link to="about">About us</Link>
                </li>

                { isAuthenticated ? (
                <>
                {userRoles.includes("TRAVELAGENCY") && (
                    <>
                        <li>
                            <Link to="list-trip">
                                <FontAwesomeIcon icon={faList} /> List a trip!
                            </Link>
                        </li>
                        <li>
                            <Link to="mylistings">
                                <FontAwesomeIcon icon={faPlane} /> My listings
                            </Link>              
                        </li>    
                        <li>
                            <Link to="chat-history">
                                <FontAwesomeIcon icon={faComments} /> My chats
                            </Link>                        
                        </li>        
                    </>
                    
                )}
                {userRoles.includes("USER") && (
                    <>
                        <li>
                            <Link to="mybookings">
                                <FontAwesomeIcon icon={faBook} /> My bookings!
                            </Link>                        
                        </li>
                        <li>
                            <Link to="myreviews">
                                <FontAwesomeIcon icon={faPenFancy} /> My reviews!
                            </Link>
                        </li>
                    </>
                    
                )}
                    <li>
                        <Link to="profile">
                            <FontAwesomeIcon icon={faUser} /> Profile Page
                        </Link>
                    </li>
                    <li>
                        <Link onClick={handleLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                        </Link>
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