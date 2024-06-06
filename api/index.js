const express = require('express');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const { login, signup } = require('./controllers/AuthController');
const { authenticateToken } = require('./middleware/AuthMiddleware');

// get config vars
dotenv.config();

// access config var
const tokenSecret = process.env.TOKEN_SECRET;
const app = new express();
app.use(express.json());

app.get("/", (request, response) => {
    const status = {
       "Error": "Invalid request method for this URL"
    };
    
    response.send(status);
 });
app.get("/status", (request, response) => {
    const status = {
       "Status": "Running"
    };
    
    response.send(status);
 });

//https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/
 //https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

app.post('/signup', signup);

app.post('/login', login);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log("Server Listening on PORT:", PORT);
});