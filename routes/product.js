import express from "express";
import pool from "../db.js"; // your MySQL pool connection
import { authPlugins } from "mysql2";
import authMiddleware from "../middleware/auth.js";
import ProductController from "../controllers/ProductController.js";
const router = express.Router();

// Get all products
// router.get("/", async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM products");
//     res.json(rows);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Get product by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
//       req.params.id,
//     ]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }
//     res.json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Create a new product
// router.post("/", async (req, res) => {
//   const { name, description, price, old_price, image } = req.body;

//   if (!name || !price) {
//     return res.status(400).json({ error: "Name and price are required" });
//   }

//   try {
//     const [result] = await pool.query(
//       "INSERT INTO products (name, description, price, old_price, image) VALUES (?, ?, ?, ?, ?)",
//       [name, description, price, old_price || null, image || null]
//     );

//     const insertedProductId = result.insertId;

//     const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
//       insertedProductId,
//     ]);

//     res.status(201).json(rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// router.put("/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { name, description, price } = req.body;

//     const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
//       id,
//     ]);
//     if (rows.length === 0) {
//       return res.status(404).json({ error: "Product not found" });
//     }

//     await pool.query(
//       "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?",
//       [name, description, price, id]
//     );

//     res.json({ message: "Product updated successfully" });
//   } catch (err) {
//     console.error("❌ Update Error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });
router.get("/", ProductController.getAll);
router.get("/:id", ProductController.getById);
router.post("/", ProductController.create);
router.put("/:id", ProductController.update);
router.delete("/:id", ProductController.delete);

export default router;
