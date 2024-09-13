import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const categories = [
  { id: 1, name: 'Herramientas Manuales', image: 'https://picsum.photos/600/400' },
  { id: 2, name: 'Herramientas Eléctricas', image: 'https://picsum.photos/600/400' },
  { id: 3, name: 'Pinturas y Accesorios', image: 'https://picsum.photos/600/400' },
  { id: 4, name: 'Plomería', image: 'https://picsum.photos/600/400' },
  { id: 5, name: 'Electricidad', image: 'https://picsum.photos/600/400' },
  { id: 6, name: 'Jardinería', image: 'https://picsum.photos/600/400' },
]

const bestSellers = [
  { id: 1, name: 'Martillo Profesional', price: 39.99, image: 'https://picsum.photos/600/400' },
  { id: 2, name: 'Taladro Inalámbrico', price: 129.99, image: 'https://picsum.photos/600/400' },
  { id: 3, name: 'Set de Destornilladores', price: 24.99, image: 'https://picsum.photos/600/400' },
  { id: 4, name: 'Pintura Látex 20L', price: 89.99, image: 'https://picsum.photos/600/400' },
]

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link href={`/category/${category.id}`} key={category.id}>
              <Card key={category.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <Image src={category.image} alt={category.name} className="w-full h-32 object-cover mb-2" width={600} height={400} />
                <p className="text-center font-semibold">{category.name}</p>
              </CardContent>
            </Card>
            </Link>
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