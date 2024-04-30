/**
 * Client-side JavaScript for handling Google Sheets API and OAuth2.0
 */

// Load the Google API client library.
function loadClient() {
    gapi.load('client:auth2', initClient);
}

// Initialize the client with API key and People API, and OAuth 2.0 scopes required.
function initClient() {
    const clientId = 'YOUR_CLIENT_ID';
    const apiKey = 'YOUR_API_KEY';
    const discoveryDocs = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];
    const scope = 'https://www.googleapis.com/auth/spreadsheets';

    gapi.client.init({
        apiKey: apiKey,
        clientId: clientId,
        discoveryDocs: discoveryDocs,
        scope: scope
    }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    }, function(error) {
        console.error(JSON.stringify(error, null, 2));
    });
}

// Called when the signed-in status changes, to update the UI appropriately. After a sign-in, the API is called.
function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
        console.log('User is signed in.');
        // Handle successful sign-in.
    } else {
        console.log('User is not signed in.');
        // Handle sign-in failures.
    }
}

// Sign in the user upon button click.
function handleSignInClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

// Sign out the user upon button click.
function handleSignOutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

// Load the API client and auth library
gapi.load('client:auth2', loadClient);
