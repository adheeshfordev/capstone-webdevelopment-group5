const firebaseAdmin = require("firebase-admin");

var serviceAccount = require("../service-account.json");

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
	storageBucket: "pixelparadisecapstone.appspot.com"
});

const bucket = firebaseAdmin.storage().bucket();

module.exports = { bucket };