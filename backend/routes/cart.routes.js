const express = require("express");

const {
  addToCart,
  getCart,
  updateCartQuantity,
  removeFromCart,
} = require("../controllers/cart.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getCart);

router.post("/:productId", addToCart);

router.patch("/:productId", updateCartQuantity);

router.delete("/:productId", removeFromCart);

module.exports = router;
