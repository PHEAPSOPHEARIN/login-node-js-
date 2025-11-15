import Product from "../models/Product.js";

const ProductController = {
  getAll: async (req, res) => {
    try {
      const products = await Product.getAll();
      res.json(products);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getById: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  create: async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  update: async (req, res) => {
    try {
      const product = await Product.update(req.params.id, req.body);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  delete: async (req, res) => {
    try {
      const product = await Product.delete(req.params.id);
      res.json(product);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

export default ProductController;
