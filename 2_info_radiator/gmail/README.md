# Gmail inbox volume

This example shows you how full your email inbox is using a servo and the 
Gmail API.

## Components needed

| # | Component         |
|---|-------------------|
| 1 | Arduino           |
| 1 | Micro servo       |
| 3 | Jumper wires      |
| 1 | cardboard / arrow |

## Gmail API Set up

Derived from this [quickstart guide](https://developers.google.com/gmail/api/quickstart/nodejs).

You will need to register a Gmail API. TO do this, 
[go to the Google  Developer's Console](https://console.developers.google.com/flows/enableapi?apiid=gmail)
and register your app to get your various keys. 

* Select "Create New Project".
* Choose OAuth and select "Create new client ID"
* Select "Installed Application" as you'll be using this from the command line
* On the Consent Screen add in your various details that you want to call the application
* Back on the client ID details you need to ensure you select "Other" for the type
of installed application
* Click Create Client ID and you should get all your creds produced
* Download the JSON file and put it in the `2_info_radiator/gmail` folder and call it
`client_secret.json`

Now you can run the application using:

```
node 2_info_radiator/gmail/gmail.js test
```

This will go through an authentication process which you'll need to complete
and from there should print out the number of emails you have in your inbox.







