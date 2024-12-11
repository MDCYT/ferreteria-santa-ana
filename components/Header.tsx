import { useTheme } from "next-themes";
import { Sun, Moon, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCartStore } from "@/providers/CartStoreProvider";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

function SearchInput() {
  const router = useRouter();

  return (
    <Input
      placeholder="Buscar productos"
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          router.push(`/search?q=${e.currentTarget.value}`);
        }
      }}
    />
  );
}

function LogoSection() {
  return (
    <div className="flex items-center space-x-4">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/logo.svg"
          alt="Ferretería Santa Ana"
          width={100}
          height={100}
        />
        <h1 className="text-2xl font-bold">Ferretería Santa Ana</h1>
      </Link>
    </div>
  );
}

function NavigationSection() {
  return (
    <nav className="hidden md:flex space-x-4">
      <SearchInput />
      <Link href="/products">
        <Button variant="header">Productos</Button>
      </Link>
      <Link href="/offers">
        <Button variant="header">Ofertas</Button>
      </Link>
      <Link href="https://wa.me/+51994012191?text=Hola, tengo algunas preguntas sobre los productos de la tienda">
        {" "}
        <Button variant="header">Contacto</Button>
      </Link>
    </nav>
  );
}

function ActionSection({ theme, setTheme }: ReturnType<typeof useTheme>) {
  const { products } = useCartStore((state) => state);

  return (
    <div className="flex items-center space-x-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6" />
        ) : (
          <Moon className="h-6 w-6" />
        )}
      </Button>
      {/* <Button variant="ghost" size="icon">
        <ShoppingCart className="h-6 w-6" />
      </Button> */}
      {/* Put the icon with a little badge red with the count of products added */}
      <Link href="/cart">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-6 w-6" />
          {products.length > 0 && (
            <span className="bg-red-500 text-white rounded-full px-2 py-1">
              {products.length}
            </span>
          )}
        </Button>
      </Link>
    </div>
  );
}

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <LogoSection />
        <NavigationSection />
        <ActionSection theme={theme} setTheme={setTheme} themes={[]} />
      </div>
    </header>
  );
}
