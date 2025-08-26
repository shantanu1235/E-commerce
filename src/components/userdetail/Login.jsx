import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiEndpoint } from "../APIConnect";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState(null); // custom message
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(getApiEndpoint('login'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Login successful! Redirecting...");
        setMessageType("success");
        setTimeout(() => navigate("/header"), 1500);
      } else {
        setMessage(data.message || "Login failed!");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Server error!");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-2xl shadow-2xl px-8 py-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-500 mb-6">Login to your E-Shop account</p>
        {message && (
          <div
            className={`mb-4 px-4 py-2 rounded ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-gray-50"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> 
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-300 bg-gray-50"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-black-500 font-semibold text-sm focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-600 py-2 rounded-lg shadow-md hover:from-orange-500 text-white text-lg cursor-pointer transition"
          >
            Login
          </button>
          <div className="mt-3 flex justify-center text-sm text-gray-500">
            <a
              href="#"
              className="text-blue-500 font-semibold hover:underline"
            >
              Forgot Password?
            </a>
            <span className="mx-2">|</span>
            <a
              href="#"
              className="text-blue-500 font-semibold hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              Create Account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;