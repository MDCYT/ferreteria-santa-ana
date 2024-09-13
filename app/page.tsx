"use client";

import { useState } from 'react'
import { ThemeProvider } from 'next-themes'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HomePage from '@/components/HomePage'

export default function Home() {
  const [primaryColor, setPrimaryColor] = useState('#FF5733')
  const [secondaryColor, setSecondaryColor] = useState('#33FF57')

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
            <HomePage />
        </main>
        <Footer primaryColor={primaryColor} />
      </div>
    </ThemeProvider>
  )
}