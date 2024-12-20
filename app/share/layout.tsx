import { UtopiaLogo } from "@/components/ui/utopia-logo";
import Link from "next/link";

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Custom minimal header */}
      <header className="w-full border-b border-stone-200 bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <UtopiaLogo />
          </Link>
          <Link 
            href="/overview/models/train" 
            className="text-sm px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
          >
            Create Your Own
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Simple footer */}
      <footer className="mt-auto py-6 border-t border-stone-200 bg-white">
        <div className="container mx-auto px-4 text-center text-sm text-stone-500">
          <p>Made with Utopia Photos</p>
        </div>
      </footer>
    </div>
  );
}
