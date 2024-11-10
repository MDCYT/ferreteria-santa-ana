"use client";

import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchPage from "@/components/SearchPage";

export default function Home() {

    return (
      <ThemeProvider attribute="class">
        <div className="min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow">
            <SearchPage searchQuery="*" />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
}
