"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // UX validation only
  useEffect(() => {
    const valid = user.email.includes("@") && user.password.length >= 6;

    setDisabled(!valid);
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);

      await axios.post("/api/users/login", user);

      toast.success("Login successful");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-8">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-white text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-sm text-gray-400 text-center mb-6">
          Login to continue
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm text-gray-300">Email</label>
          <input
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg bg-black/40 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="text-sm text-gray-300">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="••••••••"
            className="mt-1 w-full rounded-lg bg-black/40 border border-gray-700 px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Button */}
        <button
          onClick={onLogin}
          disabled={disabled || loading}
          className={`w-full rounded-lg py-2 font-medium transition-all duration-200 ${
            disabled || loading
              ? "bg-gray-700 cursor-not-allowed text-gray-400"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white"
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        {/* Footer */}
        <div className="text-center text-sm text-gray-400 mt-6 space-y-2">
          <p>
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="text-purple-400 hover:text-purple-300"
            >
              Sign up
            </Link>
          </p>
          <p>
            <Link
              href="/forgotpassword"
              className="text-gray-500 hover:text-gray-300"
            >
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
