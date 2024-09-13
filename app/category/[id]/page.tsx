"use client";

import { useState } from "react";
import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductPage from "@/components/ProductPage";
import { useParams } from "next/navigation";

interface Props {
  id: string;
  [key: string]: string;
}

// export default function Home({ selectedCategory }: { selectedCategory: string }) {
// Get the id in the url /category/[id]
export default function Home() {
  const [primaryColor, setPrimaryColor] = useState("#FF5733");
  const [secondaryColor, setSecondaryColor] = useState("#33FF57");

  // Get the id in the url /category/[id]
  const { id } = useParams<Props>();

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen flex flex-col">
        <Header
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          onPrimaryColorChange={setPrimaryColor}
          onSecondaryColorChange={setSecondaryColor}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          <ProductPage selectedCategory={id} />
        </main>
        <Footer primaryColor={primaryColor} />
      </div>
    </ThemeProvider>
  );
}
