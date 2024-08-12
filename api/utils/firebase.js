const firebaseAdmin = require("firebase-admin");

//var serviceAccount = require("../service-account.json");
const b64ServiceAccount = process.env.SERVICE_ACCOUNT_CODE;
const serviceAccount = Buffer.from(b64ServiceAccount, 'base64').toString('utf8');
console.log(serviceAccount);
firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
	storageBucket: "pixelparadisecapstone.appspot.com"
});

const bucket = firebaseAdmin.storage().bucket();

module.exports = { bucket };