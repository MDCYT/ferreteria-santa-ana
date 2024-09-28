
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";

export async function GET() {
  const cookieStore = cookies()

  const client = createClient(cookieStore)
  
  const { data, error } = await client.from("categories").select("*")

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { status: 200 })
}