import { Router } from "express";
import { AddToCart, getAllCarts, removeFromCart, updateCartQuantity } from "../controllers/cart.controller.js";
import verifyToken from "../middlewares/verifyToken.middleware.js";

const router = Router();

router.post("/add-to-cart",verifyToken, AddToCart);
router.get("/get-all-carts",verifyToken, getAllCarts);
router.delete("/remove-from-cart",verifyToken,removeFromCart);
router.put("/update-cart-quantity",verifyToken,updateCartQuantity);

export default router;
