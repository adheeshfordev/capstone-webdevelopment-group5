const express = require('express')
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
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
  });