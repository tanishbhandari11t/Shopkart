const Customer = require("../models/customer.model");
const Product = require("../models/product.model");
const isValidObjectId = require("../utils/isValidObjectId");

const WISHLIST_FIELDS = "name price category image stock";

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const customer = await Customer.findById(req.user._id);

    const alreadySaved = customer.wishlist.some((id) => id.equals(productId));

    if (alreadySaved) {
      return res.status(409).json({
        success: false,
        message: "Product already in wishlist",
      });
    }

    customer.wishlist.push(productId);
    await customer.save();

    return res.status(201).json({
      success: true,
      message: "Product added to wishlist",
      count: customer.wishlist.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const customer = await Customer.findById(req.user._id).populate({
      path: "wishlist",
      select: WISHLIST_FIELDS,
    });

    // populate() returns null for products that were deleted after being saved
    const wishlist = customer.wishlist.filter(Boolean);

    return res.status(200).json({
      success: true,
      count: wishlist.length,
      wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const customer = await Customer.findById(req.user._id);

    const isSaved = customer.wishlist.some((id) => id.equals(productId));

    if (!isSaved) {
      return res.status(404).json({
        success: false,
        message: "Product not in wishlist",
      });
    }

    customer.wishlist = customer.wishlist.filter((id) => !id.equals(productId));
    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      count: customer.wishlist.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const customer = await Customer.findById(req.user._id);

    const isSaved = customer.wishlist.some((id) => id.equals(productId));

    if (isSaved) {
      customer.wishlist = customer.wishlist.filter(
        (id) => !id.equals(productId)
      );
    } else {
      const product = await Product.findById(productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      customer.wishlist.push(productId);
    }

    await customer.save();

    return res.status(200).json({
      success: true,
      message: isSaved
        ? "Product removed from wishlist"
        : "Product added to wishlist",
      inWishlist: !isSaved,
      count: customer.wishlist.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  toggleWishlist,
};
