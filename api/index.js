const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { login, signup } = require("./controllers/AuthController");
const {addToCart, createCart, updateCartItem, removeFromCart} = require("./controllers/CartController");
const { productList, createProduct, updateProduct, deleteProduct } = require("./controllers/ProductController");
const { userList, createUser, updateUser, deleteUser } = require("./controllers/UserController");
const { authenticateToken, authorizeAdmin } = require("./middleware/AuthMiddleware");
const cors = require("cors");

// get config vars
dotenv.config();

const mongoose = require("mongoose");

if (!process.env.MONGO_CONNECTION_STRING) {
	console.error("No connection string found");
	process.exit(1);
}

// access config var
const tokenSecret = process.env.TOKEN_SECRET;
const app = new express();
app.use(express.json());
// allow all origins (cors)
app.use(
	cors({
		exposedHeaders: ["Content-Range"],
	}),
);

app.get("/", (request, response) => {
	const status = {
		Error: "Invalid request method for this URL",
	};

	response.send(status);
});
app.get("/status", (request, response) => {
	const status = {
		Status: "Running",
	};

	response.send(status);
});

//https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/
//https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

app.post("/signup", signup);

app.post("/login", login);



app.get("/userList", authenticateToken, authorizeAdmin, userList);

app.get('/products', productList);
app.post('/products', authenticateToken, authorizeAdmin, createProduct);
app.put('/products/:id', authenticateToken, authorizeAdmin, updateProduct);
app.delete('/products/:id', authenticateToken, authorizeAdmin, deleteProduct);

app.post('/users', authenticateToken, authorizeAdmin, createUser);
app.put('/users/:id', authenticateToken, authorizeAdmin, updateUser);
app.delete('/users/:id', authenticateToken, authorizeAdmin, deleteUser);


app.post('/cart', createCart);
app.post('/cart/:cartId/items', addToCart);
app.delete('/cart/:cartId/items/:productId', removeFromCart);
app.put('/cart/:cartId/items', updateCartItem);

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});

