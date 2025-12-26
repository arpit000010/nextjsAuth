"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  const verifyUserEmail = async (token: string) => {
    try {
      await axios.post("/api/users/verifyemail", { token });
      setStatus("success");
      toast.success("Email verified successfully");
    } catch (error: any) {
      setStatus("error");
      toast.error(error.response?.data?.error || "Verification failed");
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");

    if (!urlToken) {
      setStatus("error");
      return;
    }

    setToken(urlToken);
    verifyUserEmail(urlToken);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-8 text-center text-white">
        {/* Heading */}
        <h1 className="text-3xl font-semibold mb-2">Email Verification</h1>
        <p className="text-sm text-gray-400 mb-6">
          Please wait while we verify your email
        </p>

        {/* Status */}
        {status === "loading" && (
          <div className="space-y-3">
            <div className="mx-auto h-10 w-10 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
            <p className="text-gray-400">Verifying your email...</p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="text-green-400 text-5xl">✓</div>
            <h2 className="text-xl font-medium">Email Verified Successfully</h2>
            <p className="text-gray-400 text-sm">
              Your account is now active. You can login.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-2 text-white font-medium hover:opacity-90 transition"
            >
              Go to Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="text-red-400 text-5xl">✕</div>
            <h2 className="text-xl font-medium">Verification Failed</h2>
            <p className="text-gray-400 text-sm">
              The link may be invalid or expired.
            </p>
            <Link
              href="/login"
              className="inline-block mt-4 text-purple-400 hover:text-purple-300"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
