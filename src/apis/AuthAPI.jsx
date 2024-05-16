import axios from "axios";
import TokenManager from './TokenManager';

const AuthAPI ={
    login: (username, password) => axios.post('http://localhost:8080/login', {username, password})
         .then(response => response.data.accessToken)
         .then(accessToken => {
            TokenManager.setAccessToken(accessToken);
            TokenManager.updateAxiosToken(accessToken);
            return accessToken
         }),
    registerUser: (userData) => axios.post('http://localhost:8080/register/user', userData)
         .then(response => response.data.accessToken)
         .then(accessToken => {
            TokenManager.setAccessToken(accessToken);
            TokenManager.updateAxiosToken(accessToken);
            return accessToken
         })
         ,
    registerTravelAgency: (userData) => axios.post('http://localhost:8080/register/traveling-agency', userData)
         .then(response => response.data.accessToken)
         .then(accessToken => {
            TokenManager.setAccessToken(accessToken);
            TokenManager.updateAxiosToken(accessToken);
            return accessToken
         })
         .catch(error => {
            if (error.response.status === 409) {
                throw new Error("Username already exists.");
            } else {
                throw new Error("Registration failed. Please try again later.");
            }
        }),
   
         
}
export default AuthAPI;