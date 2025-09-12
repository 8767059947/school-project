import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"; // Header ko import karein

export const dynamic = 'force-dynamic';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "School Directory",
  description: "A project to manage school listings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header /> {/* Header ko yahan add karein */}
        <main>{children}</main>
      </body>
    </html>
  );
}