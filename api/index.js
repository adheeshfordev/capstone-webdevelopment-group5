const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { login, signup } = require("./controllers/AuthController");
const {
	productList,
	createProduct,
	updateProduct,
	deleteProduct,
	getProduct,
} = require("./controllers/ProductController");
const {
	userList,
	createUser,
	updateUser,
	deleteUser,
	getUser,
} = require("./controllers/UserController");
const {
	authenticateToken,
	authorizeAdmin,
} = require("./middleware/AuthMiddleware");
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

app.post("/login", login);
app.post("/signup", signup);

app.get("/products", productList);
app.get("/products/:id", getProduct);
app.post("/products", createProduct, authenticateToken, authorizeAdmin);
app.put("/products/:id", updateProduct, authenticateToken, authorizeAdmin);
app.delete("/products/:id", deleteProduct, authenticateToken, authorizeAdmin);

app.get("/users/:id", getUser, authenticateToken);
app.get("/users", userList, authenticateToken, authorizeAdmin);
app.post("/users", createUser, authenticateToken, authorizeAdmin);
app.put("/users/:id", updateUser, authenticateToken, authorizeAdmin);
app.delete("/users/:id", deleteUser, authenticateToken, authorizeAdmin);

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});
