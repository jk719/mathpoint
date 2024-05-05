import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {
  const [isSigningIn, setIsSigningIn] = useState(false); // Track sign-in state

  const handleSuccess = (response) => {
    console.log("JWT ID token for user:", response.credential);
    setIsSigningIn(false); // Reset sign-in state on success
  };

  const handleError = (error) => {
    console.error('Failed to login with Google:', error);
    setIsSigningIn(false); // Reset sign-in state on error
  };

  const initiateSignIn = () => {
    setIsSigningIn(true); // Set sign-in state when initiating sign-in
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      <div>
        <GoogleLogin 
          onSuccess={handleSuccess} 
          onError={handleError}
          disabled={isSigningIn} // Disable button during sign-in process
          onGrant={initiateSignIn} // Start sign-in process
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
