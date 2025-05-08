import {Router} from "express";
import { createFranchise } from "../controllers/BecomeFranchise.controller.js";
import { deleteFranchise, getAllFranchises } from "../controllers/BecomeFranchise.controller.js";
import { verifyAdmin } from "../middlewares/adminVerification.middleware.js";

const router=Router();

router.post("/create-franchise",createFranchise);
router.get("/get-all-franchises",verifyAdmin,getAllFranchises);
router.delete("/delete-franchise/:id",verifyAdmin,deleteFranchise);
export default router;