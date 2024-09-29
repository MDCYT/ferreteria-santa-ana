import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import { Product } from '@/interfaces/Products'
import { useState, useEffect } from 'react'
import { useCartStore } from '@/providers/CartStoreProvider'

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])

  const { hasProduct, addProduct, addProductQuantity } = useCartStore(state => state)

  useEffect(() => {
    fetch("/api/products").then(
      (res) => res.json()
    ).then((data: Product[]) => {
      setProducts(data)
    })
  }, [])

  const addProductToCart = (product: Product) => {	
    if (!hasProduct(product.id)) {
      addProduct({ product, quantity: 1 })
    } else {
      addProductQuantity(product.id, 1)
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" width={600} height={400} />
            <p className="text-2xl font-bold">{product.discounted_price ?
              <>
                <span className="line-through text-gray-500">S/ {product.price}</span>
                S/ {product.discounted_price}
              </> : `S/ ${product.price}`}
            </p>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={() => addProductToCart(product)}>Agregar al carrito</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}