import { jwtDecode } from "jwt-decode";
import axios from "axios";

const TokenManager = {
    updateAxiosToken:(token) => {
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
          delete axios.defaults.headers.common['Authorization'];
        }
      },
    getAccessToken: () => sessionStorage.getItem("accessToken"),
    getClaims: () => {
        if (!sessionStorage.getItem("claims")) {
            return undefined;
        }
        return JSON.parse(sessionStorage.getItem("claims"));
    },
    setAccessToken: (token) => {
        sessionStorage.setItem("accessToken", token);
        const claims = jwtDecode(token);
        sessionStorage.setItem("claims", JSON.stringify(claims));
        return claims;
    },
    clear: () => {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("claims");
    },
    isUserAuthenticated: () =>{
        const token = TokenManager.getAccessToken();
        if(!token) return false;
        const claims  = TokenManager.getClaims();
        return claims &&claims.role === 'USER';
    },
    getUserRoles: () => {
        const claims = TokenManager.getClaims();
        return claims && claims.roles ? claims.roles : [];
    },
    getUserIdFromToken: () => {
        const token = TokenManager.getAccessToken();
        if(!token) return false;
        const claims  = TokenManager.getClaims();
        return claims && claims.userID ?  claims.userID : null;
    }
}

export default TokenManager;