"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useEffect } from "react";


import { useRouter } from "next/navigation";

import Aside from "@/app/dashboard/components/Aside";
import Header from "@/app/dashboard/components/Header";

import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {

  const router = useRouter();

  const client = createClient();

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
      <Aside page="dashboard" />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header page="dashboard" />
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {/* Dale la bienvenida al usuario e indicale que seleccione alguna categoria de la barra de la izquierda, solo eso, aqui no pongas formulario ni nada */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>¡Bienvenido!</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Para comenzar, selecciona una categoría de la barra de la izquierda.
              </p>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
