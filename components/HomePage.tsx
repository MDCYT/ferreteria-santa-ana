import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product, Category } from "@/interfaces/Products";
import { useCartStore } from '@/providers/CartStoreProvider'

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  const { hasProduct, addProduct, addProductQuantity } = useCartStore(state => state)

  useEffect(() => {
    const fetchData = async () => {
      const [categoriesData, bestSellersData] = await Promise.all([
        fetch("/api/categories").then((res) => res.json()),
        fetch("/api/products").then((res) => res.json()),
      ]);
      setCategories(categoriesData);
      setBestSellers(bestSellersData);
    };

    fetchData();
  }, []);

  const addProductToCart = (product: Product) => {
    if (!hasProduct(product.id)) {
      addProduct({ product, quantity: 1 })
    } else {
      addProductQuantity(product.id, 1)
    }
  }

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-3xl font-bold mb-6">Categorías</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(
            (category) =>
              category.parent_id === null && (
                <Link href={`/category/${category.id}`} key={category.id}>
                  <Card
                    key={category.id}
                    className="cursor-pointer hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <Image
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-32 object-cover mb-2"
                        width={600}
                        height={400}
                      />
                      <p className="text-center font-semibold">
                        {category.name}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              )
          )}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Productos más vendidos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {bestSellers.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <Image src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" width={200} height={300} />
                <p className="text-2xl font-bold">
                  S/ {product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => addProductToCart(product)}>Agregar al carrito</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
