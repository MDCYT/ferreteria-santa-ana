
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";
import { type NextRequest } from 'next/server'

export async function GET(
    req: NextRequest
) {
    const cookieStore = cookies()

    const client = createClient(cookieStore)

    // Get query from NextRequest
    const query = Object.fromEntries(req.nextUrl.searchParams)
    const { input = "" } = query

    if (typeof input !== "string") {
        return Response.json({ error: "Invalid query" }, { status: 400 })
    }

    // Seach all products with similar name, example: 
    /*
    Si el usuario busca "martillo", debería devolver todos los productos que tengan "martillo", "Martillo", "martillos", "Martillos", "martillo de acero", "martillo de plástico", etc.
    Si el usuario busca "acero", debería devolver los productos mas similares a "acero", ejemplo: "acero galvanizado", "acero inoxidable", "acero inoxidable 304" y luego los productos que contengan "acero" en su nombre, ejemplo: "martillo de acero", "tijera de acero", etc.
    */

    //   const { data: products, error } = await client.from("products").select("*").ilike("name", `%${input}%`)

    // Tambien busca si se menciona en la descripción, pero eso ponlos despues de que funcione la busqueda por nombre
    const { data: productsWithName, error: productsWithNameError } = await client.from("products").select("*").ilike("name", `%${input}%`)
    const { data: productsWithDescription, error: productsWithDescriptionError } = await client.from("products").select("*").ilike("description", `%${input}%`)

    if (productsWithNameError) return Response.json({ error: productsWithNameError.message }, { status: 500 })
    if (productsWithDescriptionError) return Response.json({ error: productsWithDescriptionError.message }, { status: 500 })

    // Merge both arrays and remove duplicates
    const products = [...productsWithName, ...productsWithDescription].filter((product, index, self) => {
        return index === self.findIndex((t) => (
            t.id === product.id
        ))
    })

    return Response.json(products, { status: 200 })
}