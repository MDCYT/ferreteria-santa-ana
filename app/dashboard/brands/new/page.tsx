"use client";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


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

import { useEffect } from "react";

import { useRouter } from "next/navigation";

import Aside from "@/app/dashboard/components/Aside";
import Header from "@/app/dashboard/components/Header";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  name: z.string()
});

export default function Dashboard() {

  const router = useRouter();

  const client = createClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ""
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    
    fetch("/api/brands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push("/dashboard/brands");
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

  return (
    <div className="flex min-h-screen w-full flex-col bg-[#09090b]/90">
      <Aside page="products" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header page="products" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Formulario de nueva marca</CardTitle>
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
                        <FormDescription>Nombre de la marca</FormDescription>
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
