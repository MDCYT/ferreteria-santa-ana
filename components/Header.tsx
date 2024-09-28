import { useTheme } from 'next-themes'
import { Sun, Moon, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { useCartStore } from '@/providers/CartStoreProvider'
import Link from 'next/link'

function LogoSection() {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.svg" alt="Ferretería Santa Ana" width={100} height={100} />
        <h1 className="text-2xl font-bold">Ferretería Santa Ana</h1>
      </Link>
    </div>
  );
}

function NavigationSection() {
  return (
    <nav className="hidden md:flex space-x-4">
      <Button variant="header">Inicio</Button>
      <Button variant="header">Productos</Button>
      <Button variant="header">Ofertas</Button>
      <Button variant="header">Contacto</Button>
    </nav>
  );
}

function ActionSection({ theme, setTheme }: ReturnType<typeof useTheme>) {
  const { products } = useCartStore(state => state)

  return (
    <div className="flex items-center space-x-4">
      <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
      </Button>
      {/* <Button variant="ghost" size="icon">
        <ShoppingCart className="h-6 w-6" />
      </Button> */}
      { /* Put the icon with a little badge red with the count of products added */ }
      <Link href="/cart">
      <Button variant="ghost" size="icon">
        <ShoppingCart className="h-6 w-6" />
        { products.length > 0 && <span className="bg-red-500 text-white rounded-full px-2 py-1">{products.length}</span> }
      </Button>
      </Link>
    </div>
  );
}

export default function Header() {
  const { theme, setTheme } = useTheme();
  
  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <LogoSection />
        <NavigationSection />
        <ActionSection theme={theme} setTheme={setTheme} themes={[]} />
      </div>
    </header>
  );
}
