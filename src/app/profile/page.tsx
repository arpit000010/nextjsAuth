"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface User {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
}

export default function ProfilePage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // fetch logged-in user
  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      setUser(res.data.data);
    } catch (error: any) {
      toast.error("Session expired. Please login again.");
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error: any) {
      toast.error("Logout failed");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-8 text-white">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-center mb-6">Profile</h1>

        {/* User Info */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-400">Username</p>
            <p className="text-lg font-medium">{user?.username}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Verification Status</p>
            <span
              className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
                user?.isVerified
                  ? "bg-green-600/20 text-green-400"
                  : "bg-red-600/20 text-red-400"
              }`}
            >
              {user?.isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-3">
          <button
            onClick={logout}
            className="w-full rounded-lg py-2 font-medium bg-gradient-to-r from-red-500 to-pink-500 hover:opacity-90 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
