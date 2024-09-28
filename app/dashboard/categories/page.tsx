"use client";

import { MoreHorizontal, PlusCircle } from "lucide-react";

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

import { Brand } from "@/interfaces/Products";

import { createClient } from "@/utils/supabase/client";

import { useRouter } from "next/navigation";

import Aside from "@/app/dashboard/components/Aside";
import Header from "@/app/dashboard/components/Header";
import Link from "next/link";

export default function Dashboard() {
  const [brands, setBrands] = useState<Brand[]>([]);

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
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        setBrands(data);
      });

  }, []);

  const handleDeleteBrand = (id: number) => {
    fetch(`/api/brands/delete/${id}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.error(data.error);
        } else {
          setBrands(brands.filter((brand) => brand.id !== id));
        }
      });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#09090b]/90">
      <Aside page="brands" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header page="brands" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-2">
                <Link href="/dashboard/brands/new">
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Añadir marca
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Marcas</CardTitle>
                  <CardDescription>Maneja tus marcas aquí</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead className="hidden md:table-cell">
                          Creado
                        </TableHead>
                        <TableHead>
                          <span className="sr-only">Acciones</span>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {brands.map((brand) => (
                        <TableRow key={brand.id}>
                          <TableCell className="font-medium">
                            {brand.name}
                          </TableCell>
                    
                          <TableCell className="hidden md:table-cell">
                            {brand.created_at}
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
                                <DropdownMenuItem>
                                  <Link href={`/dashboard/brands/edit/${brand.id}`}>
                                    Editar
                                  </Link>
                                </DropdownMenuItem>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive">
                                        Eliminar
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-black">
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>
                                          Eliminar marca
                                        </AlertDialogTitle>
                                        <AlertDialogDescription>
                                          ¿Estás seguro que deseas eliminar esta marca?
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>
                                          Cancelar
                                        </AlertDialogCancel>
                                        <AlertDialogAction onClick={() => { handleDeleteBrand(brand.id) }}>
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
                    Mostrando 1-{brands.length} de {brands.length}
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
