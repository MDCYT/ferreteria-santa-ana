
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";
import { NextRequest } from 'next/server';

export async function GET() {
  const cookieStore = cookies()

  const client = createClient(cookieStore)
  const { data, error } = await client.from("brands").select("*");

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { status: 200 })
}

export async function POST(
  request: NextRequest
) {
  const cookieStore = cookies()
  const client = createClient(cookieStore)

  const body = await request.json()
  const { name } = body

  const { data, error } = await client.from("brands").insert([{ name }]);

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({data, success: true}, { status: 200 })
}