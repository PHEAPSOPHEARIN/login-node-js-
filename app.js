import express from "express";
import productRoutes from "./routes/product.js";

const app = express();
app.use(express.json());

app.use("/products", productRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:5000"));
export default app;
