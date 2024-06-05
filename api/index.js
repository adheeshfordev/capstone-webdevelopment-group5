const express = require('express');
const dotenv = require('dotenv');

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


  function generateAccessToken(username) {
   return jwt.sign(username, tokenSecret, { expiresIn: '1800s' });
 }

app.post('/signup', async (req, res) => {
   try {
       const { username, password } = req.body;
       if (!username || !password) {
           return res.status(400).json({ error: 'Username and password are required' });
       }

       const hashedPassword = await bcrypt.hash(password, 10);
       users.push({ username, password: hashedPassword });
       res.status(201).json({ message: 'User created successfully' });
   } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

app.post('/login', async (req, res) => {
   try {
       const { username, password } = req.body;
       if (!username || !password) {
           return res.status(400).json({ error: 'Username and password are required' });
       }

       const user = users.find(user => user.username === username);
       if (!user || !(await bcrypt.compare(password, user.password))) {
           return res.status(401).json({ error: 'Invalid username or password' });
       }

       const token = generateAccessToken(user.username);
       res.json({ token });
   } catch (error) {
       res.status(500).json({ error: 'Internal Server Error' });
   }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
   console.log("Server Listening on PORT:", PORT);
});