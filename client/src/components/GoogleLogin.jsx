import React from 'react'
import { GoogleLogin } from 'react-google-login';

/**
 * https://www.npmjs.com/package/react-google-login
 * This is a lgon component using google OAuth2 method
 */

export default function GoogleLogin() {

    const logResponse = response => {
        console.log(response);
    }
    return (
        <div>
            <GoogleLogin
                clientId='229631852431-emr9jgbi46lhtbr3f932o34jl8o0t21r.apps.googleusercontent.com'
                buttonText='Login'
                onSuccess={logResponse}
                onFailure={logResponse}
                cookiePolicy={'single_host_origin'}
            // isSignedIn={true}
            />
        </div>
    )
}