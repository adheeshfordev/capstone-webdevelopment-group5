const Product = require("../models/Product");

// Get all products
const productList = async (req, res) => {
	try {
		let productsRaw = await Product.find({}, {});
		products = productsRaw.map((product) => {
			product.imageUrl = product.imageUrl ? convertGsToHttps(product.imageUrl) : convertGsToHttps("gs://pixelparadisecapstone.appspot.com/lander-denys-J72jCU2HuAM-unsplash.jpg")
			return { imageUrl: product.imageUrl, ...product._doc };
		});
		console.log(products);
		res.header(
			"Content-Range",
			`products 0-${products.length - 1}/${products.length}`,
		);
		res.json(products);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

const convertGsToHttps = (gsUrl) => {
	const bucketName = "pixelparadisecapstone.appspot.com";
	const filePath = gsUrl.split(`${bucketName}/`)[1];
	return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
};

// Get a single product
const getProduct = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

// Create a new product
const createProduct = async (req, res) => {
	try {
		const product = new Product(req.body);
		await product.save();
		res.status(201).json(product);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Bad Request" });
	}
};

// Update an existing product
const updateProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json(product);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: "Bad Request" });
	}
};

// Delete a product
const deleteProduct = async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (!product) {
			return res.status(404).json({ error: "Product not found" });
		}
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = {
	productList,
	createProduct,
	updateProduct,
	deleteProduct,
	getProduct,
};
