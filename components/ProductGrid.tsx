import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const products = [
  { id: 1, name: 'Martillo', price: 25.99, image: 'https://picsum.photos/600/400' },
  { id: 2, name: 'Destornillador', price: 15.50, image: 'https://picsum.photos/600/400' },
  { id: 3, name: 'Sierra', price: 45.00, image: 'https://picsum.photos/600/400' },
  { id: 4, name: 'Taladro', price: 89.99, image: 'https://picsum.photos/600/400' },
  { id: 5, name: 'Llave inglesa', price: 18.75, image: 'https://picsum.photos/600/400' },
  { id: 6, name: 'Cinta métrica', price: 9.99, image: 'https://picsum.photos/600/400' },
  { id: 7, name: 'Nivel', price: 22.50, image: 'https://picsum.photos/600/400' },
  { id: 8, name: 'Alicates', price: 14.25, image: 'https://picsum.photos/600/400' },
]

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" width={600} height={400} />
            <p className="text-2xl font-bold">S/ {product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Agregar al carrito</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}