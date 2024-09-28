
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";
import { type NextRequest } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {

    const cookieStore = cookies()

    const client = createClient(cookieStore)

    // Responde con la cantidad total de productos
    const { data: products, error } = await client.from("products").select("*").eq("category", Number(params.id))

    if (error) return Response.json({ error: error.message }, { status: 500 })

    return Response.json({ products })
}