"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "@/providers/CartStoreProvider";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ShoppingCart() {
  const { products, removeProduct, updateProductQuantity } = useCartStore(
    (state) => state
  );

  const updateQuantity = (id: number, newQuantity: number) => {
    updateProductQuantity(id, newQuantity);
  };

  const removeItem = (id: number) => {
    removeProduct(id);
  };

  const totalPrice = products.reduce(
    // (acc, product) => acc + product.product.price * product.quantity,
    // 0
    // Use discounted_price if available
    (acc, product) =>
      acc +
      (product.product.discounted_price || product.product.price) *
        product.quantity, // Use discounted_price if available
    0
    
  );

  const GenLinkWhatsapp = () => {
    const message = products
      .map(
        (item) =>
          `${item.product.name} - Cantidad: ${item.quantity} - Precio: S/ ${(
            item.product.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");
    const totalMessage = `\nTotal: S/ ${totalPrice.toFixed(2)}`;
    const fullMessage = encodeURIComponent(
      `Mi pedido:\n${message}\n${totalMessage}`
    );
    return `https://wa.me/+51994012191?text=${fullMessage}`;
  };

  return (
    <div>
      <Header />
      <div className="max-w-4xl p-4 bg-secondary-foreground rounded-lg my-16 mx-auto container text-secondary ">
        <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
        {products.length === 0 ? (
          <p>Tu carrito está vacío.</p>
        ) : (
          <>
            <div className="space-y-4">
              {products.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Precio: S/ {item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e: { target: { value: string } }) =>
                        // If is NaN, set to 1
                        // updateQuantity(
                        //   item.product.id,
                        //   parseInt(e.target.value)
                        // )
                        updateQuantity(
                          item.product.id,
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <p className="text-xl font-bold">
                Total: S/ {totalPrice.toFixed(2)}
              </p>

              <Link href={GenLinkWhatsapp()}>
                <Button className="mt-4 w-full bg-green-700 text-white font-semibold">
                  Enviar pedido por WhatsApp
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
