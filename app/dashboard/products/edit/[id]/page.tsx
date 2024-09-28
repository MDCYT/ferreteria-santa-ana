"use client";

import { CheckIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { useEffect, useState } from "react";

import { Brand, Category, Product } from "@/interfaces/Products";

import { useRouter } from "next/navigation";

import Aside from "@/app/dashboard/components/Aside";
import Header from "@/app/dashboard/components/Header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useParams } from "next/navigation";

import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.string(),
  stock: z.string(),
  brand_id: z.number(),
  category_id: z.number(),
  image: z.string(),
  featured: z.boolean(),
  status: z.number(),
  discounted_price: z.string().optional(),
});

export default function Dashboard() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [product, setProduct] = useState<Product | null>(null);

  const [selectedBrand, setselectedBrand] = useState<number | null>(null);
  const [selectedCategory, setselectedCategory] = useState<number | null>(null);

  // Get param id
  const id = Number(useParams().id);
    

  const router = useRouter();

  const client = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      brand_id: 0,
      category_id: 0,
      image: "",
      featured: false,
      status: 1
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    values.brand_id = selectedBrand || 0;
    values.category_id = selectedCategory || 0;
    // 3. Send the data to the server
    fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push("/dashboard/products");
        }
      });
  }

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

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#09090b]/90">
      <Aside page="products" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header page="products" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Formulario de nuevo producto</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Nombre</FormLabel>
                        <FormControl>
                          <Input {...field} id="name" />
                        </FormControl>
                        <FormDescription>Nombre del producto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="description">Descripción</FormLabel>
                        <FormControl>
                          <Input {...field} id="description" />
                        </FormControl>
                        <FormDescription>
                          Descripción del producto
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="price">Precio</FormLabel>
                        <FormControl>
                          <Input {...field} id="price" type="number" />
                        </FormControl>
                        <FormDescription>Precio del producto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="stock">Stock</FormLabel>
                        <FormControl>
                          <Input {...field} id="stock" type="number" />
                        </FormControl>
                        <FormDescription>Stock del producto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="brand_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="brand_id">Marca</FormLabel>
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Input
                                {...field}
                                id="brand_id"
                                readOnly
                                value={
                                  selectedBrand
                                    ? brands.find(
                                        (brand) => brand.id === selectedBrand
                                      )?.name
                                    : "Selecciona una marca"
                                }
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>
                                Selecciona una marca
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setselectedBrand(null);
                                }}
                              >
                                <CheckIcon />
                                <span>Sin marca</span>
                              </DropdownMenuItem>
                              {brands.map((brand) => (
                                <DropdownMenuItem
                                  key={brand.id}
                                  onClick={() => {
                                    setselectedBrand(brand.id);
                                  }}
                                >
                                  <CheckIcon />
                                  <span>{brand.name}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormDescription>Marca del producto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="category_id">Categoría</FormLabel>
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Input
                                {...field}
                                id="category_id"
                                readOnly
                                value={
                                  selectedCategory
                                    ? categories.find(
                                        (category) =>
                                          category.id === selectedCategory
                                      )?.name
                                    : "Selecciona una categoría"
                                }
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>
                                Selecciona una categoría
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  setselectedCategory(null);
                                }}
                              >
                                <CheckIcon />
                                <span>Sin categoría</span>
                              </DropdownMenuItem>
                              {categories.map((category) => (
                                <DropdownMenuItem
                                  key={category.id}
                                  onClick={() => {
                                    setselectedCategory(category.id);
                                  }}
                                >
                                  <CheckIcon />
                                  <span>{category.name}</span>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormDescription>Categoría del producto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="image">Imagen</FormLabel>
                        <FormControl>
                          <Input {...field} id="image" />
                        </FormControl>
                        <FormDescription>URL de la imagen</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="featured">Destacado</FormLabel>
                        <FormControl>
                          <Checkbox {...field} id="featured" value={field.value ? "true" : "false"} className="bg-black border-black text-white px-2 py-1" />
                        </FormControl>
                        <FormDescription>Producto destacado</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="status">Estado</FormLabel>
                        <FormControl>
                          {/* 3 options, 0 = draft, 1 = active, 2 = archived */}
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Input
                                {...field}
                                id="status"
                                readOnly
                                value={
                                  field.value === 0
                                    ? "Borrador"
                                    : field.value === 1
                                    ? "Activo"
                                    : "Archivado"
                                }
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>
                                Selecciona un estado
                              </DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                onClick={() => {
                                  form.setValue("status", 0);
                                }}
                              >
                                <CheckIcon />
                                <span>Borrador</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  form.setValue("status", 1);
                                }}
                              >
                                <CheckIcon />
                                <span>Activo</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  form.setValue("status", 2);
                                }}
                              >
                                <CheckIcon />
                                <span>Archivado</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </FormControl>
                        <FormDescription>Estado del producto</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="discounted_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="discounted_price">
                          Precio rebajado
                        </FormLabel>
                        <FormControl>
                          <Input {...field} id="discounted_price" type="number" />
                        </FormControl>
                        <FormDescription>
                          Precio rebajado del producto
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Guardar</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
