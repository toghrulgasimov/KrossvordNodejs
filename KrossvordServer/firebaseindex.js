
async function f() {
    let admin = require('firebase-admin');
    let serviceAccount = require("./familyprotector-9fc7b-firebase-adminsdk-39knv-e27615e365.json");

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://familyprotector-9fc7b.firebaseio.com"
    });

    let registrationToken = 'fZXVjhjIQ4SoYnV4LpCJhS:APA91bGOgGhN3InPx6mN-hyyx0Z4X4GNqcCXNlIlLbO9LCbOQ8v75f3Wk8FBBQBTmUXADmNGr450Ro761nD6OLxSvDZbnrhIVeUhLxNABqiufsOtQ-yDtssfQQ6q1pmijvSKXyxeexn9';

    let s = "";
    for(let i = 0; i < 10; i++) {
        s += "a";
    }
    let message = {
        data: {
            score: s,
            time: '2:45',
            score1: '213',
            time1: '2:45',
            score2: '213',
            time2: '2:45'
        },
        token: registrationToken
    };
    console.log(s);

// Send a message to the device corresponding to the provided
// registration token.
    for(let  i = 0; i < 3; i++) {
        admin.messaging().send(message)
            .then((response) => {
                // Response is a message ID string.
                console.log('Successfully sent message:', response);
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
    }

    let mongoUtil = require( './mongoUtil' );
    let cilent = await mongoUtil.connectToServer();
    console.log("connected");

    let db = await mongoUtil.getDb();
    console.log(await db.collection("mycol").find().count());


    await require("./firebasedelete").interval(db);

}
f();

