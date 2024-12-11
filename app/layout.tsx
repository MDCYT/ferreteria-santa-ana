import type { Metadata } from "next";
import "./globals.css";

import { CartStoreProvider } from "@/providers/CartStoreProvider";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Ferreteria Santa Ana",
  description:
    "Lugar donde encontrarás todo lo que necesitas para crear tu hogar ideal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider attribute="class">
          <TooltipProvider>
            <CartStoreProvider>
              <main>{children}</main>
              <Toaster />
            </CartStoreProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
