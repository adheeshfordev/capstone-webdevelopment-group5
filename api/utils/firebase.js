const firebaseAdmin = require("firebase-admin");
const fs = require('fs');
const dotenv = require("dotenv");
dotenv.config();

const serviceAccountBase64 = process.env.SERVICE_ACCOUNT_CODE;

const serviceAccount = JSON.parse(Buffer.from(serviceAccountBase64, 'base64').toString('utf8'));

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(serviceAccount),
	storageBucket: "pixelparadisecapstone.appspot.com"
});

const bucket = firebaseAdmin.storage().bucket();

module.exports = { bucket };