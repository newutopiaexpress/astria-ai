import { UtopiaLogo } from "@/components/ui/utopia-logo";
import Link from "next/link";

export function generateViewport() {
    return {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 1,
    }
}

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

<html lang="en" className="overflow-x-hidden">
<head>
  <meta name="theme-color" content="#0C0A09" data-meta-theme-swap />
</head>
<body className="flex flex-col bg-stone-950 dark:bg-stone-950 h-screen overflow-x-hidden"> 

<div className="min-h-screen bg-stone-950">
      {/* Custom minimal header */}
      <header className="w-full bg-stone-950">
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


</body>
</html>


  );
}
