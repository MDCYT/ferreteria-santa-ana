import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import Image from 'next/image'

const products: Product[] = [
  { id: 1, name: 'Martillo', price: 25.99, image: 'https://picsum.photos/200/300', category: 1, brand: 1 },
  { id: 2, name: 'Destornillador', price: 15.50, image: 'https://picsum.photos/200/300', category: 1, brand: 3 },
  { id: 3, name: 'Sierra', price: 45.00, image: 'https://picsum.photos/200/300', category: 2, brand: 2 },
  { id: 4, name: 'Taladro', price: 89.99, image: 'https://picsum.photos/200/300', category: 2, brand: 4 },
  { id: 5, name: 'Llave inglesa', price: 18.75, image: 'https://picsum.photos/200/300', category: 1, brand: 1 },
  { id: 6, name: 'Pintura Látex', price: 39.99, image: 'https://picsum.photos/200/300', category: 3, brand: 5 },
  { id: 7, name: 'Nivel', price: 22.50, image: 'https://picsum.photos/200/300', category: 1, brand: 3 },
  { id: 8, name: 'Alicates', price: 14.25, image: 'https://picsum.photos/200/300', category: 1, brand: 1 },
]

const brands: Brand[] = [{ id: 1, name: 'Stanley' }, { id: 2, name: 'Bosch' }, { id: 3, name: 'DeWalt' }, { id: 4, name: 'Makita' }, { id: 5, name: 'Vencedor' }]

const categories: Category[] = [
  { id: 1, name: 'Herramientas Manuales' },
  { id: 2, name: 'Herramientas Eléctricas' },
  { id: 3, name: 'Pinturas y Accesorios' },
]

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: number
  brand: number
}

interface Brand {
  id: number
  name: string
}

interface Category {
  id: number
  name: string
}

export default function ProductPage({ selectedCategory }: { selectedCategory: string }) {

  console.log(selectedCategory)

  console.log(categories)
  
  const getMaxPrice = () => Math.round(Math.max(...products.map(product => product.price)) + Math.max(...products.map(product => product.price))/10)

  const [priceRange, setPriceRange] = useState([0, getMaxPrice()])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])

  console.log(selectedBrands)

  const filteredProducts: Product[] = products.filter(product => {
    const isWithinPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1]
    const isFromSelectedCategory = !selectedCategory || product.category === Number(selectedCategory)
    const isFromSelectedBrands = selectedBrands.length === 0 || selectedBrands.includes(product.brand.toString())
    return isWithinPriceRange && isFromSelectedCategory && isFromSelectedBrands
  })

  const getCategoryName = (id: number) => categories.find(category => category.id === id)?.name

  const getBrandName = (id: number) => brands.find(brand => brand.id === id)?.name

  console.log({selectedCategory, name: getCategoryName(Number(selectedCategory))})


  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtrar por precio</h3>
          <Slider
            min={0}
            max={getMaxPrice()}
            step={1}
            value={(getMaxPrice() - priceRange[0] === 0) ? [0, priceRange[1]] : priceRange}
            onValueChange={(value) => setPriceRange(value)}
          />
          <div className="flex justify-between mt-2">
            <span>S/ {priceRange[0]}</span> 
            <span>S/ {priceRange[1]}</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtrar por marca</h3>
          {brands.map(brand => (
            <div key={brand.id} className="flex items-center space-x-2">
              <Checkbox
                id={brand.id.toString()}
                checked={selectedBrands.includes(brand.id.toString())}
                onCheckedChange={(checked) => {
                  // setSelectedBrands(
                  //   checked
                  //     ? [...selectedBrands, brand]
                  //     : selectedBrands.filter((b) => b !== brand)
                  // )

                  setSelectedBrands(
                    checked
                      ? [...selectedBrands, brand.id.toString()]
                      : selectedBrands.filter((b) => b !== brand.id.toString())
                  )
                }}
              />
              <label htmlFor={brand.name}>{brand.name}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-3">
        <h2 className="text-3xl font-bold mb-6">{selectedCategory ? getCategoryName(Number(selectedCategory)) : 'Todos los productos'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={product.image} width={200} height={300} alt={product.name} className="w-full h-48 object-cover mb-4" />
                <p className="text-2xl font-bold">S/ {product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                {/* <Button onClick={() => setSelectedProduct(product)}>Ver más</Button> */}
                <Button onClick={() => setSelectedProduct(product)}>Ver más</Button>
                <Button variant="outline">Agregar al carrito</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent className="max-w-md bg-black">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                <Image src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover mb-4" width={200} height={300} />
                <p className="text-2xl font-bold mb-2">S/ {selectedProduct.price.toFixed(2)}</p>
                <p>Categoría: {getCategoryName(selectedProduct.category)}</p>
                <p>Marca: {getBrandName(selectedProduct.brand)}</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setSelectedProduct(null)}>Cerrar</Button>
              <Button variant="outline">Agregar al carrito</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}