import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-sans px-6">
      <div className="text-center">
        <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground mb-4">
          Not in this season's edition
        </p>
        <Link href="/#collection" className="font-display italic text-2xl underline">
          Return to the collection
        </Link>
      </div>
    </div>
  );
}
