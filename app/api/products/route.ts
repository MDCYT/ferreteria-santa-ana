
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
  const { page = 0, limit = 10 } = query

  if (typeof page !== "number" || typeof limit !== "number") {
    return Response.json({ error: "Invalid query" }, { status: 400 })
  }

  if (page < 0 || limit < 1) {
    return Response.json({ error: "Invalid query" }, { status: 400 })
  }

  if (limit > 100) {
    return Response.json({ error: "Limit too high" }, { status: 400 })
  }

  // Only feature products
  // const { data: products, error } = await client.from("products").select("*").eq("featured", true).eq("status", 1)
  const { data: products, error } = await client.from("products").select("*").eq("featured", true).eq("status", 1).range(page, page + limit)

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(products ?? [], { status: 200 })
}

export async function POST(
  req: NextRequest
) {
  const cookieStore = cookies()

  const client = createClient(cookieStore)
  
  const body = await req.json()
  console.log(body)
  /*
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
  discounted_price: z.string(),
});*/
  const { name, description, price, stock, brand_id, category_id, image, featured, status, discounted_price } = body

  // Check if the user is authenticated
  const { error: errorSession } = await client.auth.getSession()

  if (errorSession) return Response.json({ error: errorSession.message }, { status: 500 })

  // Check if exist, name, description, price, stock, brand_id, category_id, image, featured, status

  if (!name || !description || !price || !stock  || !image) {
    return Response.json({ error: "Invalid body" }, { status: 400 })
  }

  // Insert product

  const { data, error } = await client.from("products").insert([{ name, description, price, stock, brand: brand_id, category: category_id, image, featured, status, discounted_price }])

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json( { data, success: true  }, { status: 200 })
}