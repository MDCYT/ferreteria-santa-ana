import type { Metadata } from "next";
import "./globals.css";

import { CartStoreProvider } from "@/providers/CartStoreProvider";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";

export const metadata: Metadata = {
  title: "Ferreteria Santa Ana",
  description: "Lugar donde encontrarás todo lo que necesitas para crear tu hogar ideal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
      // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {" "}
        <ThemeProvider attribute="class">
          <TooltipProvider>
            <CartStoreProvider>{children}</CartStoreProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
