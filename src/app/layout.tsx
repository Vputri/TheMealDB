import { Providers } from "./providers";
import { Header } from "@/component/common/header";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Recipe Explorer",
  description: "Explore the world of food and recipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
