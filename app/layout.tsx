import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";

export const metadata: Metadata = {
  title: "NextLevel Food",
  description: "Delecious meals, shared by nextlevel dev",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
