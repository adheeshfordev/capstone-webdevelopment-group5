const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const { adminLogin, login, signup } = require("./controllers/AuthController");
const {
	productList,
	createProduct,
	updateProduct,
	deleteProduct,
	uploadProductImage,
	getProduct,
	searchProducts,
} = require("./controllers/ProductController");
const {
	userList,
	createUser,
	updateUser,
	deleteUser,
	getUser,
	updateUserProfile,
	getUserProfile,
} = require("./controllers/UserController");
const {
	clearCart,
	removeItemFromCart,
	updateCartItemQuantity,
	addItemToCart,
	getCartByCustomerId,
} = require("./controllers/CartController");
const {
	authenticateToken,
	authorizeAdmin,
} = require("./middleware/AuthMiddleware");
const { checkout } = require("./controllers/CheckoutController");

const {
	productValidationRules,
	userValidationRules,
	validate,
} = require("./middleware/ValidationMiddleware");
const {
	forgotPassword,
	resetPassword,
} = require("./controllers/AuthController");
const { listOrders } = require("./controllers/OrderController");

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
app.get("/", (req, res) => res.send("Express on Vercel"));
app.get("/status", (request, response) => {
	const status = {
		Status: "Running",
	};

	response.send(status);
});

//https://blog.postman.com/how-to-create-a-rest-api-with-node-js-and-express/
//https://www.digitalocean.com/community/tutorials/nodejs-jwt-expressjs

app.post("/admin/login", adminLogin);
app.post("/login", login);
app.post("/signup", signup);

app.get("/products", productList);
app.get("/products/:id", getProduct);
app.post(
	"/products",
	productValidationRules,
	validate,
	authenticateToken,
	authorizeAdmin,
	createProduct,
);
app.post(
	"/products/:id/upload",
	authenticateToken,
	authorizeAdmin,
	uploadProductImage,
);
app.put("/products/:id", authenticateToken, authorizeAdmin, updateProduct);
app.delete("/products/:id", authenticateToken, authorizeAdmin, deleteProduct);

app.get("/users", authenticateToken, authorizeAdmin, userList);
app.post("/users", authenticateToken, authorizeAdmin, createUser);
app.delete("/users/:id", authenticateToken, authorizeAdmin, deleteUser);
app.put("/users/profile", authenticateToken, updateUserProfile);
app.put("/users/:id", authenticateToken, authorizeAdmin, updateUser);
app.get("/users/profile", authenticateToken, getUserProfile);
app.get("/users/:id", authenticateToken, authorizeAdmin, getUser);

app.get("/cart", authenticateToken, getCartByCustomerId);
app.post("/cart", authenticateToken, addItemToCart);
app.put("/cart", authenticateToken, updateCartItemQuantity);
app.delete("/cart/item", authenticateToken, removeItemFromCart);
app.delete("/cart", authenticateToken, clearCart);

app.post("/checkout", authenticateToken, checkout);

app.post('/forgot-password', forgotPassword);
app.post('/reset-password', resetPassword);

app.get('/orders', authenticateToken, authorizeAdmin, listOrders);
app.get('/products/search', searchProducts);


app.get("/orders", authenticateToken, authorizeAdmin, listOrders);
app.get("/search", searchProducts);

mongoose.connect(process.env.MONGO_CONNECTION_STRING);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log("Server Listening on PORT:", PORT);
});
