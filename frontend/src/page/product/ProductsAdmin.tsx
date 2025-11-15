// src/pages/ProductsAdmin.tsx
import React, { useEffect, useState } from "react";
import api from "../../util/request";
import { Product } from "../../types/product";

const ProductsAdmin: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [error, setError] = useState("");

  // Fetch products
  const fetchProducts = async () => {
    try {
      const res = await api.get<Product[]>("/products");
      setProducts(res.data || res);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      setError("Name and price are required");
      return;
    }
    try {
      if (editingId) {
        const res = await api.put<Product>(`/products/${editingId}`, formData);
        setProducts((prev) =>
          prev.map((p) => (p.id === editingId ? res.data : p))
        );
      } else {
        const res = await api.post<Product>("/products", formData);
        setProducts((prev) => [res.data, ...prev]);
      }
      setFormData({});
      setEditingId(null);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to save product");
    }
  };

  // Edit
  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setFormData(product);
    setError("");
  };

  // Delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  if (loading)
    return (
      <p className="p-6 text-xl font-semibold text-gray-700">
        Loading products...
      </p>
    );

  return (
    <div className="p-6 mx-auto max-w-7xl">
      <h1 className="mb-6 text-4xl font-extrabold text-gray-800">
        Products Admin
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-6 mx-auto mb-8 bg-white shadow-lg rounded-xl"
      >
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          {editingId ? "Edit Product" : "Create Product"}
        </h2>
        {error && <p className="mb-3 text-red-500">{error}</p>}

        <input
          type="text"
          placeholder="Name"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={formData.price || ""}
          onChange={(e) =>
            setFormData({ ...formData, price: Number(e.target.value) })
          }
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          type="number"
          placeholder="Old Price"
          value={formData.old_price || ""}
          onChange={(e) =>
            setFormData({ ...formData, old_price: Number(e.target.value) })
          }
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.image || ""}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {formData.image && (
          <img
            src={formData.image}
            alt="Preview"
            className="object-cover w-32 h-32 mb-3 border rounded-lg"
          />
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 text-white transition rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
          >
            {editingId ? "Update Product" : "Create Product"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setFormData({});
                setError("");
              }}
              className="px-5 py-2 text-white transition bg-gray-500 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Products List */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p.id}
            className="p-4 transition transform bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="object-cover w-full h-48 mb-3 rounded-lg"
              />
            )}
            <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
            <p className="text-lg text-gray-600">
              ${p.price}{" "}
              {p.old_price && (
                <span className="text-gray-400 line-through">
                  ${p.old_price}
                </span>
              )}
            </p>
            {p.description && (
              <p className="mt-1 text-sm text-gray-500">{p.description}</p>
            )}
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(p)}
                className="flex-1 px-3 py-1 text-white transition bg-green-500 rounded-lg hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="flex-1 px-3 py-1 text-white transition bg-red-500 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;
