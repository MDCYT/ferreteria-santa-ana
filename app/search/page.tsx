"use client";

import { ThemeProvider } from "next-themes";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import SearchPage from "@/components/SearchPage";

export default function Home() {

  const searchParams = useSearchParams()
  const router = useRouter()

  const search = searchParams.get('q')

  if (search) {
    return (
      <ThemeProvider attribute="class">
        <div className="min-h-screen flex flex-col">
          <Header/>
          <main className="flex-grow">
            <SearchPage searchQuery={search} />
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  } else {
    router.push('/products')
    return null
  }
}
