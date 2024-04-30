import React, { useEffect } from 'react';

const GoogleAuth = () => {
    useEffect(() => {
        window.gapi.load('client:auth2', initClient);
    }, []);

    const initClient = () => {
        window.gapi.client.init({
            apiKey: '2d535e7db5a9b6f80489e51924c424c2f0e6a47e	',
            clientId: '384939632446-3tfh8ig2csf5adqj66iljf9bejjhciac.apps.googleusercontent.com',
            discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
            scope: 'https://www.googleapis.com/auth/spreadsheets'
        }).then(() => {
            updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
            window.gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
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
