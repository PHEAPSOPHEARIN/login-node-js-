import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../util/request";
import type { Product } from "../../types/product";

const ProductsList: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await api.get<Product[]>("/products");
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const onClick = () => {
    navigate("/products/create");
  };
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await api.delete(`/products/${id}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    // <div className="p-6">
    //   <h1 className="mb-4 text-2xl font-bold">Products</h1>
    //   <Link
    //     to="/products/create"
    //     className="px-4 py-2 mb-4 text-white bg-blue-500 rounded hover:bg-blue-600"
    //   >
    //     Create New Product
    //   </Link>
    //   <table className="flex flex-col w-full border">
    //     <thead>
    //       <tr className="w-10">
    //         <th className="w-10 px-2 py-1 border">ID</th>
    //         <th className="w-10 px-2 py-1 border">Name</th>
    //         <th className="px-2 py-1 border">Price</th>
    //         <th className="px-2 py-1 border">Actions</th>
    //       </tr>
    //     </thead>
    //     <tbody className="w-40">
    //       {products.map((p) => (
    //         <tr key={p.id}>
    //           <td className="px-2 py-1 border">{p.id}</td>
    //           <td className="px-2 py-1 border">{p.name}</td>
    //           <td className="px-2 py-1 border">${p.price}</td>
    //           <td className="flex gap-2 px-2 py-1 border">
    //             <Link
    //               to={`/products/edit/${p.id}`}
    //               className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600"
    //             >
    //               Edit
    //             </Link>
    //             <button
    //               onClick={() => handleDelete(p.id)}
    //               className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
    //             >
    //               Delete
    //             </button>
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <>
      <div>
        <h1 className="mb-4 text-3xl font-bold text-center">Products lest</h1>
        <button
          type="button"
          className="text-white w-10 h-8 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={onClick} // just call the function directly
        >
          Create New Product
        </button>
      </div>
    </>
  );
};

export default ProductsList;
