
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";

export async function GET() {

    const cookieStore = cookies()

    const client = createClient(cookieStore)

    // Responde con la cantidad total de productos
    const { data: products, error } = await client.from("products").select("id")

    if (error) return Response.json({ error: error.message }, { status: 500 })

    return Response.json({ quantity: products.length }, { status: 200 })
}