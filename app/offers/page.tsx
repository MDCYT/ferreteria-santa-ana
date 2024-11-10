"use client";

import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OfferPage from "@/components/OfferPage";

export default function Home() {

    return (
      <ThemeProvider attribute="class">
        <div className="min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow">
            <OfferPage />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
}
