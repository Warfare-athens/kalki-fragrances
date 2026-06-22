"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer";
import { SiteNav } from "@/components/SiteNav";

type User = {
  email: string;
  memberSince: string;
};

export default function Page() {
  const [user, setUser] = useState<User | null>(null);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Account - Kalki Fragrances";

    try {
      const rawUser = localStorage.getItem("kalki.user.v1");
      if (rawUser) {
        setUser(JSON.parse(rawUser));
      }
    } catch (e) {
      console.error("Failed to load user from localStorage", e);
    }
    setHydrated(true);
  }, []);

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setMessage("Please enter both email and password.");
      return;
    }

    const signedUser: User = {
      email: emailInput,
      memberSince: new Date().toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric"
      })
    };

    try {
      localStorage.setItem("kalki.user.v1", JSON.stringify(signedUser));
      setUser(signedUser);
      setMessage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateAccount = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!emailInput || !passwordInput) {
      setMessage("Please enter both email and password to create an account.");
      return;
    }

    const newUser: User = {
      email: emailInput,
      memberSince: new Date().toLocaleDateString("en-IN", {
        month: "long",
        year: "numeric"
      })
    };

    try {
      localStorage.setItem("kalki.user.v1", JSON.stringify(newUser));
      setUser(newUser);
      setMessage(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignOut = () => {
    try {
      localStorage.removeItem("kalki.user.v1");
      setUser(null);
      setEmailInput("");
      setPasswordInput("");
    } catch (err) {
      console.error(err);
    }
  };

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
        <SiteNav />
        <main className="max-w-5xl mx-auto px-6 py-20 flex items-center justify-center">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            Entering atelier...
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pb-24 md:pb-0">
      <SiteNav />
      <main className="max-w-5xl mx-auto px-6 py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">The Devotee</p>
        <h1 className="font-display text-5xl md:text-6xl mt-3 italic">Your account</h1>
        <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-10">
          {user ? (
            <section className="border border-border p-8 md:p-10 animate-fade-up">
              <p className="font-display text-2xl italic">Welcome back to the atelier.</p>
              <div className="mt-8 space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-1">
                    Identity
                  </span>
                  <span className="font-sans text-base font-medium">{user.email}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                    Initiation Date
                  </span>
                  <span className="font-sans text-sm text-muted-foreground">{user.memberSince}</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest block mb-1">
                    Atelier Tier
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-wider bg-accent/10 text-accent px-2.5 py-1 font-semibold inline-block">
                    Devotee Member
                  </span>
                </div>
              </div>

              <div className="mt-10 flex gap-4">
                <Link
                  href="/orders"
                  className="px-6 py-3 bg-foreground text-background font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-accent transition-colors text-center"
                >
                  View Orders
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-6 py-3 border border-border font-mono text-[11px] uppercase tracking-[0.25em] hover:border-foreground transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </section>
          ) : (
            <section className="border border-border p-8 md:p-10">
              <p className="font-display text-2xl italic">Sign in to preserve your private shelf.</p>
              <p className="mt-4 text-sm text-muted-foreground max-w-prose leading-relaxed">
                Save your order details, manage delivery addresses, and track rare macerations in one unified interface.
              </p>
              {message && (
                <div className="mt-4 text-xs font-mono text-accent">
                  {message}
                </div>
              )}
              <form className="mt-8 grid gap-4 max-w-md" onSubmit={handleSignIn}>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Email address"
                  className="border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground"
                  required
                />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Password"
                  className="border border-border bg-transparent px-4 py-3 text-sm outline-none focus:border-foreground"
                  required
                />
                <div className="flex flex-wrap gap-3 mt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-foreground text-background font-mono text-[11px] uppercase tracking-[0.25em] hover:bg-accent transition-colors cursor-pointer"
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={handleCreateAccount}
                    className="px-6 py-3 border border-border font-mono text-[11px] uppercase tracking-[0.25em] hover:border-foreground transition-colors cursor-pointer"
                  >
                    Create account
                  </button>
                </div>
              </form>
            </section>
          )}

          <aside className="bg-stone-50 p-8">
            <h2 className="font-display text-2xl italic mb-6">Member notes</h2>
            <ul className="space-y-5 text-sm text-muted-foreground">
              <li>Save preferred delivery addresses.</li>
              <li>Track fragrance orders and fulfilment status.</li>
              <li>Build a shelf of favourite extraits.</li>
              <li>Receive early access to limited macerations.</li>
            </ul>
          </aside>
        </div>
        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/"
            className="font-mono text-[11px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
          >
            Return to the altar
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
