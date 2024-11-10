"use client";

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SearchPage from '@/components/SearchPage';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams()
  const search = searchParams.get('q');

  if (search) {
    return (
      <ThemeProvider attribute="class">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchPage searchQuery={Array.isArray(search) ? search[0] : search} />
            </Suspense>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  } else {
    router.push('/products');
    return null;
  }
};

export default Page;