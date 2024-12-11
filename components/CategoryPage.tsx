import { useState, useEffect, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Product, Category, Brand } from "@/interfaces/Products";
import { useCartStore } from "@/providers/CartStoreProvider";
import ProductGrid from "./ProductGrid";

export default function ProductPage({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPriceProducts, setMaxPriceProducts] = useState<number>(0);

  const { hasProduct, addProductQuantity, addProduct } = useCartStore(
    (state) => state
  );

  const addProductToCart = (product: Product) => {
    if (!hasProduct(product.id)) {
      addProduct({ product, quantity: 1 });
    } else {
      addProductQuantity(product.id, 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const [brandsData, categoriesData, productsData] = await Promise.all([
        fetch(`/api/brands?category=${selectedCategory}`).then((res) =>
          res.json()
        ),
        fetch("/api/categories").then((res) => res.json()),
        fetch(`/api/products/category/${selectedCategory}`)
          .then((res) => res.json())
          .then((data) => data.products),
      ]);
      setBrands(brandsData);
      setCategories(categoriesData);
      setProducts(productsData);
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    if (loading) return [];
    return products.filter((product) => {
      const isWithinPriceRange =
        product.price >= priceRange[0] &&
        (priceRange[1] === 0 || product.price <= priceRange[1]);
      const isFromSelectedCategory =
        !selectedCategory || product.category === Number(selectedCategory);
      const isFromSelectedBrands =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand.toString());
      return (
        isWithinPriceRange && isFromSelectedCategory && isFromSelectedBrands
      );
    });
  }, [loading, products, priceRange, selectedCategory, selectedBrands]);

  const getMaxPrice = useCallback(() => {
    const maxPrice = Math.max(
      ...filteredProducts.map((product) => product.price),
      0
    );
    return Math.round(maxPrice + maxPrice / 10);
  }, [filteredProducts]);

  useEffect(() => {
    if (!loading && filteredProducts.length > 0) {
      const maxPrice = getMaxPrice();
      if (maxPriceProducts === 0) setMaxPriceProducts(maxPrice);
      if (priceRange[1] !== maxPriceProducts && priceRange[1] === 0) {
        setPriceRange([0, maxPrice]);
      }
    }
  }, [
    getMaxPrice,
    loading,
    filteredProducts.length,
    priceRange,
    maxPriceProducts,
  ]);

  const getCategoryName = (id: number) =>
    categories.find((category) => category.id === id)?.name;
  const getBrandName = (id: number) =>
    brands.find((brand) => brand.id === id)?.name;

  if (loading)
    return (
      <div className="md:col-span-3 px-6 py-8 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Cargando...</h2>
      </div>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="space-y-2 bg-primary dark:text-white text-black w-full mx-auto px-4 py-2">
        <div className="sticky top-0 py-4">
          <PriceFilter
            maxPrice={maxPriceProducts}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
          />
          <BrandFilter
            brands={brands}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
        </div>
      </div>
      <div className="md:col-span-3 px-6 py-8 mx-auto">
        {selectedCategory ? (
          <h1 className="text-3xl font-bold mb-6">
            Productos de {getCategoryName(Number(selectedCategory))}
          </h1>
        ) : (
          <h1 className="text-3xl font-bold mb-6">Todos los productos</h1>
        )}
        <ProductGrid
          products={filteredProducts}
          setSelectedProduct={setSelectedProduct}
        />
      </div>
      <Dialog
        open={Boolean(selectedProduct)}
        onOpenChange={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <DialogContent className="max-w-md bg-black">
            <DialogHeader>
              <DialogTitle>{selectedProduct.name}</DialogTitle>
              <DialogDescription>
                <Image
                  loading="lazy"
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-64 object-cover mb-4"
                  width={200}
                  height={300}
                />
                <p className="text-2xl font-bold mb-2">
                  {selectedProduct.discounted_price &&
                  selectedProduct.discounted_price !== selectedProduct.price ? (
                    <>
                      <span className="line-through text-gray-400">
                        S/ {selectedProduct.price.toFixed(2)}
                      </span>{" "}
                      S/ {selectedProduct.discounted_price.toFixed(2)}
                    </>
                  ) : (
                    `S/ ${selectedProduct.price.toFixed(2)}`
                  )}
                </p>
                <p>Categoría: {getCategoryName(selectedProduct.category)}</p>
                <p>Marca: {getBrandName(selectedProduct.brand)}</p>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setSelectedProduct(null)}>Cerrar</Button>
              {/* <Button variant="outline">Agregar al carrito</Button> */}
              <Button onClick={() => addProductToCart(selectedProduct)}>
                Agregar al carrito
              </Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
}

function PriceFilter({
  maxPrice,
  priceRange,
  setPriceRange,
}: {
  maxPrice: number;
  priceRange: number[];
  setPriceRange: (range: number[]) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Filtrar por precio</h3>
      <Slider
        min={0}
        max={maxPrice}
        step={1}
        value={priceRange}
        onValueChange={setPriceRange}
      />
      <div className="flex justify-between mt-2">
        <span>S/ {priceRange[0]}</span>
        <span>S/ {priceRange[1]}</span>
      </div>
    </div>
  );
}

function BrandFilter({
  brands,
  selectedBrands,
  setSelectedBrands,
}: {
  brands: Brand[];
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Filtrar por marca</h3>
      {brands.map((brand) => (
        <div key={brand.id} className="flex items-center space-x-2">
          <Checkbox
            id={brand.id.toString()}
            checked={selectedBrands.includes(brand.id.toString())}
            onCheckedChange={(checked) => {
              setSelectedBrands(
                checked
                  ? [...selectedBrands, brand.id.toString()]
                  : selectedBrands.filter((b) => b !== brand.id.toString())
              );
            }}
          />
          <label htmlFor={brand.name}>{brand.name}</label>
        </div>
      ))}
    </div>
  );
}
