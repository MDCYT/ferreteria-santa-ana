"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchPage from '@/components/SearchPage';

const Page = () => {

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Suspense fallback={<div>Loading...</div>}>
            <SearchComponent />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

const SearchComponent = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  const router = useRouter();

  if (search) {
    return <SearchPage searchQuery={search} />;
  } else {
    router.push('/products');
  }
};

export default Page;