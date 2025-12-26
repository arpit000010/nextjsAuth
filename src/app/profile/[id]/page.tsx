import mongoose from "mongoose";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

interface UserProfileProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params;

  // ❌ Invalid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        Invalid user profile
      </div>
    );
  }

  await connect();

  const user = await User.findById(id).select("username isVerified");

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl p-8 text-white text-center">
        {/* Avatar */}
        <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-3xl font-bold">
          {user.username[0].toUpperCase()}
        </div>

        {/* Username */}
        <h1 className="text-2xl font-semibold">{user.username}</h1>

        {/* Verification */}
        <p className="mt-3">
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm ${
              user.isVerified
                ? "bg-green-600/20 text-green-400"
                : "bg-gray-600/20 text-gray-400"
            }`}
          >
            {user.isVerified ? "Verified User" : "Unverified User"}
          </span>
        </p>

        {/* User ID */}
        <div className="mt-6 rounded-lg bg-black/40 border border-gray-700 px-4 py-3">
          <p className="text-xs text-gray-400">User ID</p>
          <p className="mt-1 text-sm font-mono text-purple-400 break-all">
            {id}
          </p>
        </div>
      </div>
    </div>
  );
}
