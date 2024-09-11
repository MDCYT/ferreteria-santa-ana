import { useTheme } from 'next-themes'
import { Sun, Moon, ShoppingCart, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'

type HeaderProps = {

    primaryColor: string;
  
    secondaryColor: string;
  
    onPrimaryColorChange: (color: string) => void;
  
    onSecondaryColorChange: (color: string) => void;
  
    onNavigate: (page: string) => void;
  
  };

  
export default function Header({ primaryColor, secondaryColor, onPrimaryColorChange, onSecondaryColorChange, onNavigate }: HeaderProps) {
  const { theme, setTheme } = useTheme()

  return (
    <header className="bg-primary text-primary-foreground shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-2xl font-bold">Ferretería Santa Ana</h1>
        </div>
        <nav className="hidden md:flex space-x-4">
          <Button variant="ghost">Inicio</Button>
          <Button variant="ghost">Productos</Button>
          <Button variant="ghost">Ofertas</Button>
          <Button variant="ghost">Contacto</Button>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-6 w-6" />
          </Button>
          <div className="hidden md:flex space-x-2">
            <input 
              type="color" 
              value={primaryColor} 
              onChange={(e) => onPrimaryColorChange(e.target.value)}
              className="w-8 h-8 rounded-full overflow-hidden"
            />
            <input 
              type="color" 
              value={secondaryColor} 
              onChange={(e) => onSecondaryColorChange(e.target.value)}
              className="w-8 h-8 rounded-full overflow-hidden"
            />
          </div>
        </div>
      </div>
    </header>
  )
}