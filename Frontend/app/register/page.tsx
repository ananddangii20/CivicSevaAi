"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, UserPlus, User, BadgeCheck, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ MUST be before return
  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
try {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    }
  );

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Server did not return JSON");
  }

  if (!res.ok) {
    setError(data.message || "Registration failed");
    setLoading(false);
    return;
  }

  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  window.location.href = "/login";
} catch (err: any) {
  console.error("Register error:", err);
  setError(err.message || "Network error");
}


    setLoading(false);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-6 shadow-lg">
        {/* Header */}
        {/* Back to Home */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </div>

        <div className="mb-6 flex flex-col items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary">
            <Shield className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Create Account
          </h1>
          <p className="text-sm text-muted-foreground">
            Join CivicSeva AI in a few steps
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleRegister}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {/* Account Type */}
          <div className="space-y-2">
            <Label>Account Type</Label>

            <div className="grid grid-cols-2 gap-3">
              {/* Citizen */}
              <label className="relative flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition hover:border-primary has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                <input
                  type="radio"
                  name="role"
                  value="citizen"
                  checked={role === "citizen"}
                  onChange={() => setRole("citizen")}
                  className="sr-only"
                />
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Citizen</span>
                  <span className="text-xs text-muted-foreground">
                    Public user
                  </span>
                </div>
              </label>

              {/* Admin */}
              <label className="relative flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 transition hover:border-primary has-[:checked]:border-primary has-[:checked]:ring-1 has-[:checked]:ring-primary">
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                  onChange={() => setRole("admin")}
                  className="sr-only"
                />
                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-muted">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Admin</span>
                  <span className="text-xs text-muted-foreground">
                    Government / Authority
                  </span>
                </div>
              </label>
            </div>
          </div>

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full gap-2 bg-primary hover:bg-primary/90"
          >
            <UserPlus className="h-4 w-4" />
            {loading ? "Registering..." : "Register"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Already have an account?
          </span>{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
