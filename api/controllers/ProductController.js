const Product = require("../models/Product");

const productList = async (req, res) => {
	try {
		const products = await Product.find({});
		// react-admin expects the id to be present for each entry(temporary solution)
		const productsWithId = products.map((product) => {
			return { id: product._id, ...product._doc };
		});
		// content-range header is expected by react-admin
		res.header(
			"Content-Range",
			`products 0-${productsWithId.length - 1}/${productsWithId.length}`,
		);
		res.json(productsWithId);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

module.exports = { productList };

