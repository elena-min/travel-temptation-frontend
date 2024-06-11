import React from "react";
import { Route, Navigate } from "react-router-dom"
import TokenManager from "./TokenManager"

const ProtectedRoute = ({ element: Component, requiredRoles, ...rest }) => {
    const isAuthenticated = TokenManager.isAuthenticated();
    const userRoles = TokenManager.getUserRoles();

    if(!isAuthenticated){
        TokenManager.clear();
        return <Navigate to="/login" />;
    }
    if(isAuthenticated && !userRoles.some(role => requiredRoles.includes(role))){
        return <Navigate to="/unauthorized" />;
    }

    return <Component/>;
    //return TokenManager.isUserAuthenticated() ? Component : <Navigate to="/login" />;
  };
export default ProtectedRoute