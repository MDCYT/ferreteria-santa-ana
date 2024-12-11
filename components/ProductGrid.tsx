import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Product } from "@/interfaces/Products";
import { Dispatch, SetStateAction } from "react";
import { useCartStore } from "@/providers/CartStoreProvider";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import { Input } from "./ui/input";

interface ProductGridProps {
  products: Product[];
  setSelectedProduct: Dispatch<SetStateAction<Product | null>>;
}

export default function ProductGrid({
  products,
  setSelectedProduct,
}: ProductGridProps) {
  const { hasProduct, addProduct, addProductQuantity } = useCartStore(
    (state) => state
  );
  const { toast } = useToast();
  const router = useRouter();

  // Make a state for every product quantity
  // const [quantities, setQuantities] = useState<{ [key: number]: number }>({});

  const addProductToCart = (product: Product, quantity: number = 1) => {
    toast({
      title: "Producto agregado al carrito",
      description: `${product.name} se ha agregado al carrito`,
      action: (
        <ToastAction altText="Try again" onClick={() => router.push("/cart")}>
          Ver carrito
        </ToastAction>
      ),
    });
    if (!hasProduct(product.id)) {
      addProduct({ product, quantity });
    } else {
      addProductQuantity(product.id, quantity);
    }
  };

  if (products.length === 0) {
    return <p className="text-2xl font-bold">No hay productos disponibles</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <Image
              loading="lazy"
              src={product.image}
              width={200}
              height={300}
              alt={product.name}
              className="w-full h-48 object-cover mb-4"
            />
            <p className="text-2xl font-bold">
              {product.discounted_price &&
              product.discounted_price !== product.price ? (
                <>
                  <span className="line-through text-gray-400">
                    S/ {product.price.toFixed(2)}
                  </span>{" "}
                  S/ {product.discounted_price.toFixed(2)}
                </>
              ) : (
                `S/ ${product.price.toFixed(2)}`
              )}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between items-center flex-wrap">
            <Button onClick={() => setSelectedProduct(product)}>Ver más</Button>
            {/* Quantity */}
            <Button onClick={() => addProductToCart(product, quantities[product.id])}>
              Agregar al carrito
            </Button>
            
            {/* <Input type="number" value={quantities[product.id] || 1} onChange={(e) => setQuantities({ ...quantities, [product.id]: parseInt(e.target.value) })} min={1} max={product.stock} className="bg-primary text-primary-foreground"/> */}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
