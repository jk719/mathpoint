import React, { useState } from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleAuth = () => {
    const [error, setError] = useState('');

    const handleLoginSuccess = response => {
        console.log('Login Success:', response);
    };

    const handleLoginFailure = response => {
        console.error('Login Failed:', response);
        setError('Failed to login with Google.');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div>
                <GoogleLogin 
                    onSuccess={handleLoginSuccess}
                    onError={handleLoginFailure}
                    useOneTap={false}  // Disabled to check behavior without automatic login
                />
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
