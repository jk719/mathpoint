import React, { useEffect, useState } from 'react';

const GoogleAuth = () => {
    const [isSignedIn, setIsSignedIn] = useState(null); // null means unknown, true means logged in, false means not logged in

    useEffect(() => {
        window.gapi.load('client:auth2', initClient);
    }, []);

    const initClient = () => {
        window.gapi.client.init({
            apiKey: process.env.REACT_APP_API_KEY,
            clientId: process.env.REACT_APP_CLIENT_ID,
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(() => {
            const authInstance = window.gapi.auth2.getAuthInstance();
            // Update state with the initial sign-in state
            setIsSignedIn(authInstance.isSignedIn.get());
            // Listen for sign-in state changes
            authInstance.isSignedIn.listen(setIsSignedIn);
        }).catch(error => {
            console.error('Error loading GAPI client for API', error);
        });
    };

    const handleSignIn = () => {
        window.gapi.auth2.getAuthInstance().signIn();
    };

    const handleSignOut = () => {
        window.gapi.auth2.getAuthInstance().signOut();
    };

    return (
        <div>
            {isSignedIn === null ? (
                <div>Loading...</div>
            ) : isSignedIn ? (
                <div>
                    <div>User is signed in.</div>
                    <button onClick={handleSignOut}>Sign Out</button>
                </div>
            ) : (
                <div>
                    <div>User is not signed in.</div>
                    <button onClick={handleSignIn}>Sign In</button>
                </div>
            )}
        </div>
    );
};

export default GoogleAuth;
