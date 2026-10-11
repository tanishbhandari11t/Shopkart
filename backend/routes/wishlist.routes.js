const express = require("express");

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
  toggleWishlist,
} = require("../controllers/wishlist.controller");

const { authMiddleware } = require("../middlewares/auth.middleware");

const router = express.Router();

router.use(authMiddleware);

router.get("/", getWishlist);

router.post("/:productId", addToWishlist);

router.delete("/:productId", removeFromWishlist);

router.patch("/:productId/toggle", toggleWishlist);

module.exports = router;
