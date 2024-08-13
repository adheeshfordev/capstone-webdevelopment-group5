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

const convertGsToHttps = (gsUrl) => {
	const bucketName = "pixelparadisecapstone.appspot.com";
	const filePath = gsUrl.split(`${bucketName}/`)[1];
	return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
  };
  
  const processImageUrl = (imageUrl) => {
	return imageUrl ? convertGsToHttps(imageUrl) : 
	convertGsToHttps("gs://pixelparadisecapstone.appspot.com/lander-denys-J72jCU2HuAM-unsplash.jpg");
  }

module.exports = { bucket, processImageUrl };