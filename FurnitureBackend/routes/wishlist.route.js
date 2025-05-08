import {Router} from "express";
import { createWishlist, getAllWishlists, deleteWishlist } from "../controllers/wishlist.controller.js";

const router=Router();

router.post("/create-wishlist",createWishlist);
router.get("/get-all-wishlists",getAllWishlists);
router.delete("/delete-wishlist/:id",deleteWishlist);

export default router;