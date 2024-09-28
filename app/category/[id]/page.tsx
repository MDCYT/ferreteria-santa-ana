"use client";

import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryPage from "@/components/CategoryPage";
import { useParams } from "next/navigation";

interface Props {
  id: string;
  [key: string]: string;
}

// export default function Home({ selectedCategory }: { selectedCategory: string }) {
// Get the id in the url /category/[id]
export default function Home() {

  // Get the id in the url /category/[id]
  const { id } = useParams<Props>();

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen flex flex-col">
        <Header/>
        <main className="flex-grow">
          <CategoryPage selectedCategory={id} />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
