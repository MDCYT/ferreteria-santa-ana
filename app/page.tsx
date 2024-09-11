"use client";

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomePage from '@/components/HomePage'
import ProductPage from '@/components/ProductPage'

export default function Home() {
  const [primaryColor, setPrimaryColor] = useState('#FF5733')
  const [secondaryColor, setSecondaryColor] = useState('#33FF57')
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null)

  return (
    <ThemeProvider attribute="class">
      <div className="min-h-screen flex flex-col">
        <Header 
          primaryColor={primaryColor} 
          secondaryColor={secondaryColor}
          onPrimaryColorChange={setPrimaryColor}
          onSecondaryColorChange={setSecondaryColor}
          onNavigate={setCurrentPage}
        />
        <main className="flex-grow container mx-auto px-4 py-8">
          {currentPage === 'home' && (
            <HomePage onCategorySelect={(category) => {
              setSelectedCategory(category)
              setCurrentPage('products')
            }} />
          )}
          {currentPage === 'products' && (
            <ProductPage selectedCategory={selectedCategory ?? ''} />
          )}
        </main>
        <Footer primaryColor={primaryColor} />
      </div>
    </ThemeProvider>
  )
}