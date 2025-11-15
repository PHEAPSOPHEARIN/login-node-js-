import React, { useState } from "react";
import axios from "axios";

const ProductForm: React.FC = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // handle file select
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file)); // preview image
    }
  };

  // submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    if (image) formData.append("image", image);

    await axios.post("http://localhost:3000/api/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    alert("Product created!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="block w-full px-3 py-2 border rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="block w-full px-3 py-2 border rounded"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-10 h-10 object-cover rounded"
        />
      )}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save
      </button>
    </form>
  );
};

export default ProductForm;
