"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaEnvelope, FaLock } from "react-icons/fa";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <div className="flex flex-col items-center bg-green-500 justify-center min-h-screen px-6 py-20">
      <div className="relative w-full max-w-md bg-white shadow-lg rounded-lg p-6 pt-10">
        <h1 className="text-2xl text-center font-bold text-green-600 mb-6">
          Welcome!
        </h1>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500 h-6 w-6" />
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border rounded-md shadow-sm text-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-3 top-3 text-gray-500 h-6 w-6" />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-12 pr-4 py-3 border rounded-md shadow-sm text-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-600 bg-red-100 text-sm text-center py-2 px-4 rounded-md">
              {error}
            </p>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-bold text-lg transition-colors"
          >
            Login
          </button>
        </form>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-white text-center font-bold">
        <p className="text-xl">Your Trusted Partner in Digital Transactions</p>
      </div>
    </div>
  );
}
