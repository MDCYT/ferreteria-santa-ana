
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

    if (isNaN(Number(page)) || isNaN(Number(limit))) {
        return Response.json({ error: "Invalid query" }, { status: 400 })
    }

    if (Number(page) < 0 || Number(limit) < 1) {
        return Response.json({ error: "Invalid query" }, { status: 400 })
    }

    if (Number(limit) > 100) {
        return Response.json({ error: "Limit too high" }, { status: 400 })
    }

    // Check if the user is authenticated
    const { error: errorSession } = await client.auth.getSession()

    if (errorSession) return Response.json({ error: errorSession.message }, { status: 500 })

    // Only feature products
    const { data: products, error } = await client.from("products").select("*").range(Number(page) * Number(limit), (Number(page) + 1) * Number(limit))

    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json(products ?? [], { status: 200 })
}