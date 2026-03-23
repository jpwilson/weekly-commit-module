"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDemoLogin = (role: "individual" | "manager") => {
    // Demo mode — skip auth and go directly to dashboard
    if (role === "manager") {
      router.push("/manager");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // In production, this would use Supabase auth
      // For now, demo mode
      if (email && password) {
        router.push("/dashboard");
      } else {
        setError("Please enter email and password");
      }
    } catch {
      setError("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-8">
        {/* Logo */}
        <div className="text-center space-y-2">
          <div className="text-5xl font-headline font-extrabold text-primary tracking-tighter">
            ST6
          </div>
          <div className="text-sm font-label text-on-surface-variant uppercase tracking-widest">
            Weekly Commit Module
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-surface-container-low p-8 space-y-6">
          <div>
            <h2 className="text-xl font-headline font-bold text-on-surface uppercase tracking-tight">
              Authenticate
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Sign in to access your weekly planning dashboard.
            </p>
          </div>

          {error && (
            <div className="bg-error-container/20 border border-error/30 p-3">
              <span className="text-sm text-error">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-sm font-body text-on-surface placeholder:text-on-surface-variant/30 focus:border-primary focus:outline-none"
                placeholder="operator@st6.io"
              />
            </div>
            <div>
              <label className="block text-[10px] font-label text-on-surface-variant uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface border border-outline-variant/30 px-4 py-3 text-sm font-body text-on-surface placeholder:text-on-surface-variant/30 focus:border-primary focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-on-primary py-4 font-headline font-bold uppercase tracking-tighter active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="flex-1 border-t border-dashed border-outline-variant/30" />
            <span className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest">
              Demo Access
            </span>
            <div className="flex-1 border-t border-dashed border-outline-variant/30" />
          </div>

          {/* Demo buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemoLogin("individual")}
              className="border border-primary/30 text-primary py-3 font-label text-xs uppercase tracking-widest hover:bg-primary/10 transition-colors"
            >
              Individual View
            </button>
            <button
              onClick={() => handleDemoLogin("manager")}
              className="border border-tertiary/30 text-tertiary py-3 font-label text-xs uppercase tracking-widest hover:bg-tertiary/10 transition-colors"
            >
              Manager View
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-terminal/50 tracking-widest">
            λ ST6 TERMINAL SYSTEM v1.0
          </span>
        </div>
      </div>
    </div>
  );
}
