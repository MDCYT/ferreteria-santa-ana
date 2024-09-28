"use client";

import Image from "next/image";
import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useEffect, useState } from "react";

import { Product, Brand, Category } from "@/interfaces/Products";

import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";

import Aside from "@/app/dashboard/components/Aside";
import Header from "@/app/dashboard/components/Header";
import Link from "next/link";

export default function Dashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [allProductsQuantity, setAllProductsQuantity] = useState<number>(0);

  const [selectedBrand, setselectedBrand] = useState<number | null>(null);
  const [selectedCategory, setselectedCategory] = useState<number | null>(null);

  const [openBrand, setOpenBrand] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  const client = createClient();
  const router = useRouter();

  useEffect(() => {
    if (!client) {
      return;
    }
    client.auth.getUser().then((user) => {
      if (!user || !user.data.user?.email || !user.data.user?.confirmed_at) {
        router.push("/login");
      }
    });
  }, [client, router]);

  useEffect(() => {
    fetch("/api/products/all")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });

    fetch("/api/products/all/quantity")
      .then((res) => res.json())
      .then((data) => {
        setAllProductsQuantity(data.quantity);
      });

    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      });

    fetch("/api/categories")
      .then((res) => res.json())
      .then((data: Category[]) => {
        // Delete categories with parent id
        const filteredCategories = data.filter(
          (category) => !category.parent_id
        );
        setCategories(filteredCategories);
      });
  }, []);

  useEffect(() => {
    if (selectedBrand || selectedCategory) {
      const filtered = products.filter((product) => {
        if (selectedBrand) {
          return product.brand === selectedBrand;
        }
        if (selectedCategory) {
          return product.category === selectedCategory;
        }
        return true;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [selectedBrand, products]);

  const handleDeleteProduct = (id: number) => {
    fetch(`/api/products/delete/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setProducts(products.filter((product) => product.id !== id));
        }
      });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#09090b]/90">
      <Aside page="products" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header page="products" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="active">Activos</TabsTrigger>
                <TabsTrigger value="draft">Borradores</TabsTrigger>
                <TabsTrigger value="archived" className="hidden sm:flex">
                  Archivados
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 gap-1">
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        Filtros
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Popover open={openBrand} onOpenChange={setOpenBrand}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-[200px] justify-between"
                        >
                          {selectedBrand
                            ? brands.find((brand) => brand.id === selectedBrand)
                                ?.name
                            : "Marca"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Selecciona marca..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No hay marcas</CommandEmpty>
                            <CommandItem
                              value="0"
                              onSelect={() => setselectedBrand(null)}
                            >
                              Todas las marcas
                            </CommandItem>
                            {brands.map((brand) => (
                              <CommandItem
                                key={brand.id}
                                value={brand.name}
                                onSelect={() => {
                                  setselectedBrand(
                                    brand.id === selectedBrand ? 0 : brand.id
                                  );
                                  setOpenBrand(false);
                                }}
                                className="z-50"
                              >
                                {brand.name}
                                {selectedBrand === brand.id && (
                                  <CheckIcon className="ml-auto h-5 w-5" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <Popover open={openCategory} onOpenChange={setOpenCategory}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-[200px] justify-between"
                        >
                          {selectedCategory
                            ? categories.find(
                                (category) => category.id === selectedCategory
                              )?.name
                            : "Categoría"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Selecciona categoría..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No hay categorías</CommandEmpty>
                            <CommandItem
                              value="0"
                              onSelect={() => setselectedCategory(null)}
                            >
                              Todas las categorías
                            </CommandItem>
                            {categories.map((category) => (
                              <CommandItem
                                key={category.id}
                                value={category.name}
                                onSelect={() => {
                                  setselectedCategory(
                                    category.id === selectedCategory
                                      ? 0
                                      : category.id
                                  );
                                  setOpenCategory(false);
                                }}
                              >
                                {category.name}
                                {selectedCategory === category.id && (
                                  <CheckIcon className="ml-auto h-5 w-5" />
                                )}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/dashboard/products/new">
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Añadir Producto
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Productos</CardTitle>
                  <CardDescription>Maneja tus productos aquí</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                          <span className="sr-only">Imagen</span>
                        </TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Creado
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Acciones</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredProducts.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell className="hidden sm:table-cell">
                            <Image
                              alt="Product image"
                              className="aspect-square rounded-md object-cover"
                              height="64"
                              src={product.image}
                              width="64"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            {product.name}
                          </TableCell>
                          <TableCell>
                            {/* <Badge variant="outline">Activo</Badge> */}
                            {product.status === 0 ? (
                              <Badge variant="outline">Borrador</Badge>
                            ) : product.status === 1 ? (
                              <Badge variant="default">Activo</Badge>
                            ) : (
                              <Badge variant="destructive">Archivado</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {/* If is discounted price, put the price normal but tached, and the discounted price in red */}
                            {product.discounted_price ? (
                              <>
                                <span className="line-through text-muted-foreground">
                                  ${product.price}
                                </span>{" "}
                                <span className="text-primary">
                                  ${product.discounted_price}
                                </span>
                              </>
                            ) : (
                              `$${product.price}`
                            )}
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {product.created_at}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                >
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Abrir menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                <DropdownMenuItem>Editar</DropdownMenuItem>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive">
                                        Eliminar
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-black">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Eliminar producto
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          ¿Estás seguro que deseas eliminar este
                                          producto?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancelar
                                        </AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDeleteProduct(product.id) }}>
                                          Eliminar
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Mostrando 1-{products.length} de {allProductsQuantity}{" "}
                    productos
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
