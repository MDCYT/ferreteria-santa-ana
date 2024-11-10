
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest
) {
  const cookieStore = cookies()

  const client = createClient(cookieStore)

  const query = Object.fromEntries(req.nextUrl.searchParams)

  const { category = "" } = query

  if (typeof category !== "string") {
    return Response.json({ error: "Invalid query" }, { status: 400 })
  }

  console.log("category", category)

  // const { data, error } = await client.from("brands").select("*");

  const { data: brandsData, error: brandsErrorData } = await client.from("brands").select("*")

  if (brandsErrorData) return Response.json({ error: brandsErrorData.message }, { status: 500 })

  if (category === "") {
    return Response.json(brandsData ?? [], { status: 200 })
  }

  console.log("category", category)

  const { data: productsData, error: productsErrorData } = await client.from("products").select("*").eq("category", category)

  if (productsErrorData) return Response.json({ error: productsErrorData.message }, { status: 500 })

  const brands = brandsData ?? []
  const products = productsData ?? []

  const data = brands.map((brand) => {
    const brandProducts = products.filter((product) => product.brand === brand.id)

    // If the brand has no products, return the brand without products
    if (brandProducts.length >= 1) {
      return {
        ...brand
      }
    }
  }).filter((brand) => brand !== undefined)

  return Response.json(data, { status: 200 })
}

export async function POST(request: NextRequest

) {
  const cookieStore = cookies()
  const client = createClient(cookieStore)

  const body = await request.json()
  const { name } = body

  const { data, error } = await client.from("brands").insert([{ name }]);

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ data, success: true }, { status: 200 })
}