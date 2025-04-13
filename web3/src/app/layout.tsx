import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/DemoSidebar"; // Import Sidebar component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "thirdweb SDK + Next starter",
  description:
    "Starter template for using thirdweb SDK with Next.js App router",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <ThirdwebProvider>
          <div className="flex">
            {/* Sidebar on the left */}
            <div className="w-64">
              <Sidebar />
            </div>

            {/* Main content area */}
            <div className="flex-1">
              <Navbar />
              {children}
            </div>
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
