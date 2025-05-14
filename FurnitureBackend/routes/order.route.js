import { Router } from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { CreateCheckout,GetAllOrders, GetSingleOrder, verifyPayment,GetOrderById,UpdateCheckout } from "../controllers/order.controller.js";
import { verifyAdmin } from "../middlewares/adminVerification.middleware.js";

const router = Router();

router.post("/create-checkout", verifyToken, CreateCheckout);
router.get("/get-all-orders", verifyToken, GetAllOrders);
router.get("/get-order", verifyToken, GetSingleOrder);
router.get("/get-order-by-id/:id", verifyAdmin, GetOrderById);
router.post("/verify-payment", verifyToken, verifyPayment);
router.put("/update-checkout/:id",verifyToken,UpdateCheckout)

export default router;
