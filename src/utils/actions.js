import { redirect } from "react-router-dom";
import { DOMAIN } from "./global";
import {fetchData} from "./jsonServer"
// * processes the login data
export const loginAction = async({request}) =>{
    const formData = Object.fromEntries(await request.formData()); // converting the form data into an object
    const response = await fetchData(DOMAIN + '/api/login/', {method:'POST', body: formData, returnResponse:true})
    if(response != null){
        const data = await response.json();
    
        // process response if the user exists
        if(response.ok){
            const accessToken = data.access; // get the access token if the user is successfully logged in
            const refreshToken = data.refresh; //  get the refresh token
            localStorage.setItem('user_access_token', accessToken); // store it in local storage
            localStorage.setItem('user_refresh_token', refreshToken); // store it in local storage
            localStorage.setItem('username',data.user.username); // store the username
            localStorage.setItem('email',data.user.email); // store the username
            return redirect('/' + data.user.username);
        }
    }
    // handle the case for when the user does not exist
    // create a UI component that shows an error message
    return redirect('');
};

// * processes the signup data
export const signupAction = async({request})=>{
    const formData = Object.fromEntries(await request.formData()); // converting the form data into an object
    const response = await fetchData(DOMAIN + '/api/validate-signup/', {method:'POST', body: formData, returnResponse:true})
   
    if(response != null){
        const validationMessage = await response.json();
        if(response.ok){
            return redirect('/login');
        }
        console.log(validationMessage);
    }
    
    return redirect('');
};