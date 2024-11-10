
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";

export async function GET(
) {
    const cookieStore = cookies()

    const client = createClient(cookieStore)

    // Selecciona solo los productos que tenga el parametro discounted_price, discount_price debe ser diferente de price, a 0 y a null, y el discount_price debe ser menor al price
    const { data: products, error: productsError } = await client.from('products').select('*').neq('discounted_price', 0)
    const filteredProducts = products?.filter(product => product.discounted_price < product.price)

    if (productsError) return Response.json({ error: productsError.message }, { status: 500 })

    return Response.json(filteredProducts, { status: 200 })
}