import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Nigerian Food Daily - Authentic Nigerian Recipes & Daily Suggestions",
  description: "Discover authentic Nigerian dishes from all tribes and regions. Get personalized daily meal suggestions celebrating Nigeria's rich culinary heritage.",
  keywords: "Nigerian food, African cuisine, Nigerian recipes, Yoruba food, Igbo food, Hausa food, daily meal suggestions",
  authors: [{ name: "Nigerian Food Daily" }],
  creator: "Nigerian Food Daily",
  publisher: "Nigerian Food Daily",
  openGraph: {
    title: "Nigerian Food Daily - Authentic Nigerian Recipes",
    description: "Discover authentic Nigerian dishes from all tribes and regions.",
    url: process.env.NEXTAUTH_URL || "http://localhost:3000",
    siteName: "Nigerian Food Daily",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nigerian Food Daily - Authentic Nigerian Recipes",
    description: "Discover authentic Nigerian dishes from all tribes and regions.",
    creator: "@nigerianfooddaily",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#16a34a",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      </head>
      <body className="antialiased bg-gray-50 font-sans">
        <div className="flex flex-col min-h-screen">
          {/* Navigation Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 py-4">
            <nav className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 h-auto md:h-20">
                <div className="flex items-center justify-center w-full md:w-auto mb-2 md:mb-0">
                  <div className="text-3xl font-bold text-green-600 text-center">
                    🇳🇬 Nigerian Food Daily
                  </div>
                </div>
                <div className="hidden md:block w-full md:w-auto">
                  <div className="flex items-center justify-center md:justify-end gap-6">
                    <a href="/" className="text-gray-900 hover:text-green-600 px-4 py-2 rounded-md text-base font-medium transition-colors">
                      Daily Suggestions
                    </a>
                    <a href="/dishes" className="text-gray-600 hover:text-green-600 px-4 py-2 rounded-md text-base font-medium transition-colors">
                      All Dishes
                    </a>
                    <a href="/tribes" className="text-gray-600 hover:text-green-600 px-4 py-2 rounded-md text-base font-medium transition-colors">
                      By Tribe
                    </a>
                    <a href="/about" className="text-gray-600 hover:text-green-600 px-4 py-2 rounded-md text-base font-medium transition-colors">
                      About
                    </a>
                  </div>
                </div>
                <div className="md:hidden w-full flex justify-center mt-2">
                  <button 
                    type="button" 
                    className="bg-gray-50 inline-flex items-center justify-center p-3 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
                    aria-controls="mobile-menu" 
                    aria-expanded="false"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg className="block h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </nav>
          </header>

          {/* Main Content */}
          <main className="flex-grow flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white mt-8">
            <div className="max-w-7xl mx-auto py-20 sm:py-24 px-6 sm:px-10 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 place-items-center text-center">
                <div className="flex flex-col items-center text-center">
                  <div className="text-2xl font-bold text-green-400 mb-6">
                    🇳🇬 Nigerian Food Daily
                  </div>
                  <p className="text-gray-300 mb-6 max-w-md">
                    Celebrating Nigeria's rich culinary heritage through authentic recipes and daily meal suggestions from all tribes and regions.
                  </p>
                  <p className="text-sm text-gray-400">
                    © 2024 Nigerian Food Daily. All rights reserved.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-base font-semibold text-gray-100 tracking-wider uppercase mb-6">
                    Explore
                  </h3>
                  <ul className="space-y-3">
                    <li><a href="/" className="text-gray-300 hover:text-white transition-colors">Daily Suggestions</a></li>
                    <li><a href="/dishes" className="text-gray-300 hover:text-white transition-colors">All Dishes</a></li>
                    <li><a href="/tribes" className="text-gray-300 hover:text-white transition-colors">By Tribe</a></li>
                    <li><a href="/search" className="text-gray-300 hover:text-white transition-colors">Search</a></li>
                  </ul>
                </div>
                <div className="flex flex-col items-center text-center">
                  <h3 className="text-base font-semibold text-gray-100 tracking-wider uppercase mb-6">
                    Nigerian Tribes
                  </h3>
                  <ul className="space-y-3">
                    <li><a href="/tribes/yoruba" className="text-gray-300 hover:text-white transition-colors">Yoruba</a></li>
                    <li><a href="/tribes/igbo" className="text-gray-300 hover:text-white transition-colors">Igbo</a></li>
                    <li><a href="/tribes/hausa" className="text-gray-300 hover:text-white transition-colors">Hausa</a></li>
                    <li><a href="/tribes/efik" className="text-gray-300 hover:text-white transition-colors">Efik</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
} 