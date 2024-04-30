import React, { useEffect } from 'react';

const GoogleAuth = () => {
    useEffect(() => {
        window.gapi.load('client:auth2', initClient);
    }, []);

    const initClient = () => {
        window.gapi.client.init({
            apiKey: process.env.REACT_APP_API_KEY,  // Access API key from environment variables
            clientId: process.env.REACT_APP_CLIENT_ID,  // Access Client ID from environment variables
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(() => {
            updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        }).catch(error => {
            console.error('Error loading GAPI client for API', error);
        });
    };

    const updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
            console.log('User is signed in.');
            // Additional logic for user sign-in
        } else {
            console.log('User is not signed in.');
            // Handle user not signed in
        }
    };

    const handleSignIn = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    };

    const handleSignOut = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    };

    return (
        <div>
            <button onClick={handleSignIn}>Sign In</button>
            <button onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default GoogleAuth;
