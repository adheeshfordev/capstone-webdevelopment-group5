const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const Product = require("../models/Product");
const multer = require('multer');
const { bucket } = require("../utils/firebase");
const path = require('path');

// Validation rules
const productValidationRules = () => [
  body('name').not().isEmpty().withMessage('Name is required'),
  body('description').not().isEmpty().withMessage('Description is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('category').not().isEmpty().withMessage('Category is required'),
  body('platform').not().isEmpty().withMessage('Platform is required'),
  body('imageUrl').isURL().withMessage('Invalid URL for image'),
  body('developer').not().isEmpty().withMessage('Developer is required'),
  body('publisher').not().isEmpty().withMessage('Publisher is required'),
  body('releaseDate').isDate().withMessage('Invalid release date')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(400).json({ errors: extractedErrors });
};

// Get all products
const productList = async (req, res) => {
  try {
    let productsRaw = await Product.find({}, {});
    const products = productsRaw.map((product) => {
      product.imageUrl = product.imageUrl ? convertGsToHttps(product.imageUrl) : convertGsToHttps("gs://pixelparadisecapstone.appspot.com/lander-denys-J72jCU2HuAM-unsplash.jpg");
      return { imageUrl: product.imageUrl, ...product._doc };
    });
    console.log(products);
    res.header("Content-Range", `products 0-${products.length - 1}/${products.length}`);
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

const processImageUrl = (imageUrl) => {
  return imageUrl ? convertGsToHttps(imageUrl) : 
  convertGsToHttps("gs://pixelparadisecapstone.appspot.com/lander-denys-J72jCU2HuAM-unsplash.jpg");
}

// Get a single product
const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    product.imageUrl = processImageUrl(product.imageUrl);
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new product
const createProduct = [
  productValidationRules(),
  validate,
  async (req, res) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Bad Request" });
    }
  }
];

// Update an existing product
const updateProduct = [
  productValidationRules(),
  validate,
  async (req, res) => {
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
  }
];

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

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024 // Limit file size to 5MB
  }
});

const uploadImage = async (file) => {
  const blob = bucket.file(file.originalname);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: file.mimetype
  });

  return new Promise((resolve, reject) => {
    blobStream.on('error', (error) => reject(error));
    blobStream.on('finish', async () => {
      const publicUrl = `gs://${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });
    blobStream.end(file.buffer);
  });
};

// Endpoint to upload an image and update product.imageUrl
const uploadProductImage = [
  upload.single('image'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const imageUrl = await uploadImage(req.file);
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { imageUrl },
        { new: true, runValidators: true }
      );
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json(product);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];

const searchProducts = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } },
        { description: { $regex: searchQuery, $options: 'i' } },
        { developer: { $regex: searchQuery, $options: 'i' } },
        { platform: { $regex: searchQuery, $options: 'i' } }
      ]
    });

    const processedProducts = products.map((product) => {
      product.imageUrl = processImageUrl(product.imageUrl);
      return { imageUrl: product.imageUrl, ...product._doc };
    });

    res.json(processedProducts);
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
  uploadProductImage,
  searchProducts
};
