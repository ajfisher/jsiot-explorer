var auth = require("./auth.js");
var fs = require('fs');
var google = require('googleapis');

var TEST_CONN = false;
if (process.argv[2] == "test") {
    TEST_CONN = true;
}

// Load client secrets from a local file.
fs.readFile('2_info_radiator/gmail/client_secret.json', function processClientSecrets(err, content) {
    if (err) {
        console.log('Error loading client secret file: ' + err);
        return;
    }
    // Authorize a client with the loaded credentials, then call the
    // Gmail API.
    auth.authorize(JSON.parse(content), getInbox);
});


// Get the inbox details.
function getInbox(auth) {
    var gmail = google.gmail('v1');
    gmail.users.labels.get({
        auth: auth,
        userId: 'me',
        id: 'INBOX'
    }, function(err, response) {
        if (err) {
            console.log('API returned an err: ' + err);
            return;
        }
        if (TEST_CONN) {
            console.log(response);
        }

        // get how many unread threads you have as a proportion of the total
        var full = response.threadsUnread / response.threadsTotal;

        console.log("%s% of threads unread", (full*100).toFixed(2));


    });
}
