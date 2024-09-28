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

import { useEffect, useState } from "react";

import { Category } from "@/interfaces/Products";

import { useRouter } from "next/navigation";

import Aside from "@/app/dashboard/components/Aside";
import Header from "@/app/dashboard/components/Header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  name: z.string(),
  image: z.string(),
  parent_id: z.number().optional(),
});

export default function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setselectedCategory] = useState<number | null>(null);

  const router = useRouter();

  const client = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: ""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // 3. Send the data to the server
    fetch("/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push("/dashboard/categories");
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
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
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
              <CardTitle>Formulario de nueva categoria</CardTitle>
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
                        <FormDescription>Nombre de la categoria</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parent_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="parent_id">Categoría Padre</FormLabel>
                        <FormControl>
                          <DropdownMenu>
                            <DropdownMenuTrigger>
                              <Input
                                {...field}
                                id="parent_id"
                                readOnly
                                value={
                                  selectedCategory
                                    ? categories.find(
                                        (category) =>
                                          category.id === selectedCategory
                                      )?.name
                                    : "Selecciona una categoría padre"
                                }
                              />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuLabel>
                                Selecciona una categoría padre
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
                        <FormDescription>Categoría de padre</FormDescription>
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
