// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { decodeToken, removeToken } from "../../util/auth";
const Dashboard: React.FC = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // optional: decode token to show email
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setEmail(payload.email);
    } catch (error) {
      console.error("Invalid token:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between p-4 text-white bg-blue-500">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-blue-500 bg-white rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow p-8">
        <div className="max-w-4xl p-6 mx-auto bg-white rounded shadow">
          <h2 className="mb-4 text-2xl font-bold">Welcome, {email}!</h2>
          <p className="mb-6 text-gray-700">
            This is a secure page protected by JWT authentication.
          </p>

          {/* Link to product detail */}
          <Link
            to="/products/1"
            className="inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            View Product Detail
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
