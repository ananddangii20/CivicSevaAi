"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, User, BadgeCheck, LogIn,  ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("citizen");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
    const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      role,
    }),
  }
);

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      // Save auth data
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect based on role
     window.location.href = "/";

    } catch (err) {
      setError("Something went wrong");
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
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">
            Login to continue using CivicSeva AI
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>
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

          

          {error && (
            <p className="text-center text-sm text-red-600">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full gap-2 bg-primary hover:bg-primary/90"
          >
            <LogIn className="h-4 w-4" />
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">
            Don’t have an account?
          </span>{" "}
          <Link
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
