import pool from "../db.js";

const Product = {
  getAll: async () => {
    const [rows] = await pool.query("SELECT * FROM products");
    return rows;
  },

  getById: async (id) => {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [
      id,
    ]);
    return rows[0];
  },

  create: async (data) => {
    const { name, price } = data;
    const [result] = await pool.query(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [name, price]
    );
    return { id: result.insertId, ...data };
  },

  update: async (id, data) => {
    const { name, price } = data;
    await pool.query("UPDATE products SET name = ?, price = ? WHERE id = ?", [
      name,
      price,
      id,
    ]);
    return { id, ...data };
  },

  delete: async (id) => {
    await pool.query("DELETE FROM products WHERE id = ?", [id]);
    return { id };
  },
};

export default Product;
