const Product = require("../models/product.model");
const isValidObjectId = require("../utils/isValidObjectId");

const LIST_FIELDS = "name price category image stock";

const SORT_OPTIONS = {
  price_asc: { price: 1 },
  price_desc: { price: -1 },
  newest: { createdAt: -1 },
};

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image, stock } = req.body || {};

    if (
      !name ||
      !description ||
      !category ||
      !image ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message:
          "name, description, price, category, image and stock are required",
      });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be a number greater than 0",
      });
    }

    if (!Number.isInteger(stock) || stock < 0) {
      return res.status(400).json({
        success: false,
        message: "Stock must be a whole number and cannot be negative",
      });
    }

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      stock,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: Object.values(error.errors)[0].message,
      });
    }

    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;

    const query = {};

    if (search && search.trim()) {
      query.name = { $regex: escapeRegex(search.trim()), $options: "i" };
    }

    if (category && category !== "All") {
      query.category = category;
    }

    const sortOption = SORT_OPTIONS[sort] || SORT_OPTIONS.newest;

    const products = await Product.find(query)
      .select(LIST_FIELDS)
      .sort(sortOption);

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
};
