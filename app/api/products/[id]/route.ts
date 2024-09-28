
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";
import { type NextRequest } from 'next/server'

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {

    const cookieStore = cookies()

    const client = createClient(cookieStore)

    // Check if the user is authenticated
    const { error: errorSession } = await client.auth.getSession()

    if (errorSession) {
        return Response.json({ error: errorSession.message }, { status: 401 })
    }

    const id = Number(params.id)

    const { data: product, error } = await client
        .from('products')
        .select('*')
        .eq('id', id)
        .single()

    if (error) {
        return Response.json({ error: error.message }, { status: 500 })
    }

    if (!product) {
        return Response.json({ error: 'Product not found' }, { status: 404 })
    }

    return Response.json({ product })
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {

    const cookieStore = cookies()

    const client = createClient(cookieStore)

    const id = Number(params.id)

    const { error: errorSession } = await client.auth.getSession()

    if (errorSession) {
        return Response.json({ error: errorSession.message }, { status: 401 })
    }

    const body = await req.json()

    const { name, description, price, stock, brand_id, category_id, image, featured, status, discounted_price } = body

    const { data: product, error: errorUpdate } = await client
        .from('products')
        .update({ name, description, price, stock, brand: brand_id, category: category_id, image, featured, status, discounted_price })
        .eq('id', id)
        .single()

    if (errorUpdate) {
        return Response.json({ error: errorUpdate.message }, { status: 500 })
    }

    return Response.json({ product, success: true })
}