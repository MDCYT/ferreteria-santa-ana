import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const categories = [
  { id: 1, name: 'Herramientas Manuales', image: '/placeholder.svg' },
  { id: 2, name: 'Herramientas Eléctricas', image: '/placeholder.svg' },
  { id: 3, name: 'Pinturas y Accesorios', image: '/placeholder.svg' },
  { id: 4, name: 'Plomería', image: '/placeholder.svg' },
  { id: 5, name: 'Electricidad', image: '/placeholder.svg' },
  { id: 6, name: 'Jardinería', image: '/placeholder.svg' },
]

const bestSellers = [
  { id: 1, name: 'Martillo Profesional', price: 39.99, image: '/placeholder.svg' },
  { id: 2, name: 'Taladro Inalámbrico', price: 129.99, image: '/placeholder.svg' },
  { id: 3, name: 'Set de Destornilladores', price: 24.99, image: '/placeholder.svg' },
  { id: 4, name: 'Pintura Látex 20L', price: 89.99, image: '/placeholder.svg' },
]

type HomePageProps = {
  onCategorySelect: (name: string) => void;
};

export default function HomePage({ onCategorySelect }: HomePageProps) {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => onCategorySelect(category.name)}>
              <CardContent className="p-4">
                <img src={category.image} alt={category.name} className="w-full h-32 object-cover mb-2" />
                <p className="text-center font-semibold">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Productos más vendidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                <p className="text-2xl font-bold">S/ {product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Agregar al carrito</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}