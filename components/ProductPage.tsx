import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

const products = [
  { id: 1, name: 'Martillo', price: 25.99, image: '/placeholder.svg', category: 'Herramientas Manuales', brand: 'Stanley' },
  { id: 2, name: 'Destornillador', price: 15.50, image: '/placeholder.svg', category: 'Herramientas Manuales', brand: 'Bosch' },
  { id: 3, name: 'Sierra', price: 45.00, image: '/placeholder.svg', category: 'Herramientas Manuales', brand: 'DeWalt' },
  { id: 4, name: 'Taladro', price: 89.99, image: '/placeholder.svg', category: 'Herramientas Eléctricas', brand: 'Makita' },
  { id: 5, name: 'Llave inglesa', price: 18.75, image: '/placeholder.svg', category: 'Herramientas Manuales', brand: 'Stanley' },
  { id: 6, name: 'Pintura Látex', price: 39.99, image: '/placeholder.svg', category: 'Pinturas y Accesorios', brand: 'Vencedor' },
  { id: 7, name: 'Nivel', price: 22.50, image: '/placeholder.svg', category: 'Herramientas Manuales', brand: 'Bosch' },
  { id: 8, name: 'Alicates', price: 14.25, image: '/placeholder.svg', category: 'Herramientas Manuales', brand: 'Stanley' },
]

const brands = ['Stanley', 'Bosch', 'DeWalt', 'Makita', 'Vencedor']

export default function ProductPage({ selectedCategory }: { selectedCategory: string }) {
  const [priceRange, setPriceRange] = useState([0, 100])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; name: string; price: number; image: string; category: string; brand: string; } | null>(null)

  const filteredProducts = products.filter(product => 
    (selectedCategory ? product.category === selectedCategory : true) &&
    (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
    (selectedBrands.length === 0 || selectedBrands.includes(product.brand))
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtrar por precio</h3>
          <Slider
            min={0}
            max={100}
            step={1}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between mt-2">
            <span>S/ {priceRange[0]}</span> 
            <span>S/ {priceRange[1]}</span>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Filtrar por marca</h3>
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  setSelectedBrands(
                    checked
                      ? [...selectedBrands, brand]
                      : selectedBrands.filter((b) => b !== brand)
                  )
                }}
              />
              <label htmlFor={brand}>{brand}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="md:col-span-3">
        <h2 className="text-3xl font-bold mb-6">{selectedCategory || 'Todos los productos'}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                <p className="text-2xl font-bold">S/ {product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button onClick={() => setSelectedProduct(product)}>Ver más</Button>
                <Button variant="outline">Agregar al carrito</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-64 object-cover mb-4" />
                <p className="text-2xl font-bold mb-2">S/ {selectedProduct.price.toFixed(2)}</p>
                <p>Categoría: {selectedProduct.category}</p>
                <p>Marca: {selectedProduct.brand}</p>
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