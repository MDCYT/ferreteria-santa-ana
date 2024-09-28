
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Get ID from the request
  const params = new URL(request.url).searchParams
  const id = params.get('id')
  const cookieStore = cookies()

  const client = createClient(cookieStore)
  const { data, error } = await client.from("categories").select("*").eq('id', id);

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json(data ?? [], { status: 200 })
}