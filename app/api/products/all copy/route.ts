
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

    // Check if the user is authenticated
    const { error: errorSession } = await client.auth.getSession()

    if (errorSession) return Response.json({ error: errorSession.message }, { status: 500 })

    // Only feature products
    const { data: products, error } = await client.from("products").select("*").range(page, page + limit)

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json(products ?? [], { status: 200 })
}