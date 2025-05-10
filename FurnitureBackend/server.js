import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import {connectDB} from "./db/index.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: ["http://localhost:3000","http://localhost:3001"],
  credentials: true
}));
app.use(cookieParser());
connectDB();

// routes
import authRouter from "./routes/user.route.js";
import videoRouter from "./routes/video.route.js";
import productRouter from "./routes/product.route.js";
import contactRouter from "./routes/contact.route.js";
import couponRouter from "./routes/coupon.route.js";
import bannerRouter from "./routes/banner.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import subCategoryRouter from "./routes/subCategory.route.js";
import categoryRouter from "./routes/category.route.js";
import becomeFranchiseRouter from "./routes/BecomeFranchise.route.js";
import cartRouter from "./routes/cart.route.js";

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/sub-category", subCategoryRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/become-franchise", becomeFranchiseRouter);
app.use("/api/v1/banner", bannerRouter);
app.use("/api/v1/coupon", couponRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/video", videoRouter);
app.use("/api/v1/wishlist", wishlistRouter);
app.use("/api/v1/cart", cartRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.get("/developer", (req, res) => {
  res.send(
    `<h1>It is great to see you on server of <a href="https://www.linkedin.com/in/nitin-gupta-b7a9a02a1/">Nitin Gupta</a> </h1>`
  );
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port: ${port}`));
