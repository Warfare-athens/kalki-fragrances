import Link from "next/link";

export function Footer() {
  return (
    <footer className="px-6 py-20 border-t border-border">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h4 className="font-display text-2xl mb-6">Kalki Fragrances</h4>
          <p className="font-sans text-[12px] text-muted-foreground max-w-xs leading-relaxed mb-8">
            Subscribe for olfactory dispatches and early access to rare extractions.
          </p>
          <form className="flex border-b border-foreground max-w-sm" action="/account">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              className="flex-1 bg-transparent py-2 text-[12px] font-mono outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="text-[10px] uppercase tracking-widest hover:text-accent transition-colors"
            >
              Join
            </button>
          </form>
        </div>
        <div>
          <h5 className="font-mono text-[10px] uppercase tracking-widest mb-6">Exploration</h5>
          <ul className="font-sans text-[12px] space-y-3">
            <li>
              <Link href="/#collection" className="hover:text-accent transition-colors">
                The Scent Wardrobe
              </Link>
            </li>
            <li>
              <Link href="/heritage" className="hover:text-accent transition-colors">
                Our Heritage
              </Link>
            </li>
            <li>
              <Link href="/#story" className="hover:text-accent transition-colors">
                Varanasi Atelier
              </Link>
            </li>
            <li>
              <Link href="/orders" className="hover:text-accent transition-colors">
                Orders
              </Link>
            </li>
            <li>
              <Link href="/account" className="hover:text-accent transition-colors">
                Account
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h5 className="font-mono text-[10px] uppercase tracking-widest mb-6">Care</h5>
          <ul className="font-sans text-[12px] space-y-3 text-muted-foreground">
            <li>Privacy Policy</li>
            <li>Shipping & Returns</li>
            <li>Terms of Ritual</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left">
        <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
          (c) {new Date().getFullYear()} Kalki Fragrances - All Rights Reserved
        </span>
        <div className="flex gap-3 items-center">
          <div className="size-2 rounded-full bg-accent/20" />
          <div className="size-2 rounded-full bg-accent/50" />
          <div className="size-2 rounded-full bg-accent" />
        </div>
      </div>
    </footer>
  );
}
