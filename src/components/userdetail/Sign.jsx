import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getApiEndpoint } from "../APIConnect";

const Sign = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [message, setMessage] = useState(null); // <-- new state
  const [messageType, setMessageType] = useState("success"); // success or error
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      setMessageType("error");
      return;
    }
    try {
      const res = await fetch(getApiEndpoint('register'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Signup successful! Redirecting to login...");
        setMessageType("success");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setMessage(data.message || "Signup failed!");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Server error!");
      setMessageType("error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white rounded-2xl shadow-xl border px-10 py-3 w-screen max-w-md">
        <h2 className="text-3xl font-bold text-blue-600 mb-2">
          Create Account
        </h2>
        <p className="text-gray-500 mb-6">Sign up for your E-Shop account</p>
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
              Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black-300 bg-gray-50"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black bg-gray-50"
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
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black-300 bg-gray-50"
                placeholder="Create a password"
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
          <div>
            <label className="block font-semibold text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-black-300 bg-gray-50"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-2 text-black-500 font-semibold text-sm focus:outline-none"
                onClick={() => setShowConfirm((prev) => !prev)}
                tabIndex={-1}
              >
                {showConfirm ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-700 text-white font-bold py-2 rounded-l hover:to-blue-300 transition"
          >
            Sign Up
          </button>
          <div className="mt-3 flex justify-center text-sm text-gray-500">
            <a
              href="#"
              className="text-blue-700 font-semibold hover:underline"
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Already have an account?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Sign;