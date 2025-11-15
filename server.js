import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productRoutes from "./routes/product.js";
const app = express();

// Allow requests from your frontend
app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    credentials: true, // if you need cookies
  })
);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5000}`);
});
