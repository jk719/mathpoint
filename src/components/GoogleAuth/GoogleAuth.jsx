import React, { useState } from 'react';
import { GoogleLogin, googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Import corrected
import './GoogleAuth.css'; // Ensure the CSS is imported

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GoogleAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [error, setError] = useState('');

    const handleLoginSuccess = response => {
        console.log('Login Success:', response);
        setIsLoggedIn(true);
        const decoded = jwtDecode(response.credential);
        setUserEmail(decoded.email.split('@')[0]); // Assuming the decoded JWT contains an email field
    };

    const handleLoginFailure = response => {
        console.error('Login Failed:', response);
        setIsLoggedIn(false);
        setError('Failed to login with Google.');
    };

    const handleLogout = () => {
        googleLogout();
        setIsLoggedIn(false);
        setUserEmail('');
    };

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <div className="loginContainer">
                {!isLoggedIn ? (
                    <div className="google-btn">
                        <GoogleLogin 
                            onSuccess={handleLoginSuccess}
                            onError={handleLoginFailure}
                            useOneTap={false}
                        />
                    </div>
                ) : (
                    <div className="userInfo">
                        <p>Hi, {userEmail}</p>
                        <button onClick={handleLogout} className="logoutButton">Logout</button>
                    </div>
                )}
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </GoogleOAuthProvider>
    );
};

export default GoogleAuth;
