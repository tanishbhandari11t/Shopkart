const Customer = require("../models/customer.model");
const Product = require("../models/product.model");
const isValidObjectId = require("../utils/isValidObjectId");

const CART_PRODUCT_FIELDS = "name price category image stock";

const getPopulatedCart = async (customerId) => {
  const customer = await Customer.findById(customerId).populate({
    path: "cart.product",
    select: CART_PRODUCT_FIELDS,
  });

  // populate() returns null for products that were deleted after being added
  return customer.cart.filter((item) => item.product);
};

const addToCart = async (req, res) => {
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

    const existingItem = customer.cart.find((item) =>
      item.product.equals(productId)
    );

    const newQuantity = existingItem ? existingItem.quantity + 1 : 1;

    if (newQuantity > product.stock) {
      return res.status(400).json({
        success: false,
        message:
          product.stock === 0
            ? "Product is out of stock"
            : `Only ${product.stock} units available`,
      });
    }

    if (existingItem) {
      existingItem.quantity = newQuantity;
    } else {
      customer.cart.push({ product: productId, quantity: 1 });
    }

    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: await getPopulatedCart(req.user._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const getCart = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      cart: await getPopulatedCart(req.user._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body || {};

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    if (typeof quantity !== "number" || !Number.isInteger(quantity)) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a whole number",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
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

    const cartItem = customer.cart.find((item) =>
      item.product.equals(productId)
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart",
      });
    }

    if (quantity > product.stock) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} units available`,
      });
    }

    cartItem.quantity = quantity;
    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Cart updated",
      cart: await getPopulatedCart(req.user._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!isValidObjectId(productId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid product ID",
      });
    }

    const customer = await Customer.findById(req.user._id);

    const isInCart = customer.cart.some((item) =>
      item.product.equals(productId)
    );

    if (!isInCart) {
      return res.status(404).json({
        success: false,
        message: "Product not in cart",
      });
    }

    customer.cart = customer.cart.filter(
      (item) => !item.product.equals(productId)
    );
    await customer.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart",
      cart: await getPopulatedCart(req.user._id),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
};
