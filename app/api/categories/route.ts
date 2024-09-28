
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from 'next/server';

export async function GET() {
  const cookieStore = cookies()

  const client = createClient(cookieStore)

  const { data, error } = await client.from("categories").select("*")

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { status: 200 })
}

export async function POST(
  request: NextRequest
) {
  const cookieStore = cookies()
  const client = createClient(cookieStore)

  const body = await request.json()
  const { name, image, parent_id } = body

  if (!name) return Response.json({ error: "Name is required" }, { status: 400 })

  const { data, error } = await client.from("categories").insert([{ name, image, parent_id }])

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ data, success: true }, { status: 200 })
}

