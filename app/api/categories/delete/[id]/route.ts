
import { cookies } from 'next/headers'
import { createClient } from "@/utils/supabase/server";
import { type NextRequest } from 'next/server'

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }

) {
  const cookieStore = cookies()

  const client = createClient(cookieStore)

  const id = Number(params.id)

  // Check if the user is authenticated
  const { error: errorSession } = await client.auth.getSession()

  if (errorSession) return Response.json({ error: errorSession.message }, { status: 500 })

  // Delete product
  const { error: errorDelete } = await client.from("categories").delete().eq("id", id)

  if (errorDelete) return Response.json({ error: errorDelete.message }, { status: 500 })
  return Response.json({ message: "Category deleted" }, { status: 200 })
}