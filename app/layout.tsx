import type { Metadata } from "next";
import { Inter, Lora, Inconsolata } from "next/font/google";
import "./globals.css";
import { FontProvider } from "./FontProvider";
import FontSelector from "./Components/FontSelector";
import ThemeSwitch from "./Components/ThemeSwitch";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

const inconsolata = Inconsolata({
  variable: "--font-inconsolata",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dictionary",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body
        className={`${inter.variable} ${lora.variable} ${inconsolata.variable} antialiased bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-gray-200 h-screen`}
      >
        <FontProvider>
          <div className="max-w-3xl mx-auto my-4 md:my-10 px-4 h-screen">
            <header className="flex justify-between gap-4">
              <div className="me-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="34"
                  height="38"
                  viewBox="0 0 34 38"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="1.5"
                  >
                    <path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28" />
                    <path strokeLinejoin="round" d="M5 37a4 4 0 1 1 0-8" />
                    <path d="M11 9h12" />
                  </g>
                </svg>
              </div>
              <div className="border-r border-gray-300 dark:border-white pe-4 me-1">
                <FontSelector />
              </div>
              <div>
                <ThemeSwitch />
              </div>
            </header>
            {children}
          </div>
        </FontProvider>
      </body>
    </html>
  );
}
