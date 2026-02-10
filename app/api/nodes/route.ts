// app/api/nodes/route.ts
import { createClient } from "@utils/supabase/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const pageName = request.nextUrl.searchParams.get("page")

  const { data, error } = await supabase
    .from("node_positions")
    .select("nodes")
    .eq("user_id", user?.id)
    .eq("page_name", pageName)
    .single()

  if (error) {
    // console.log("GET error:", error)
    return NextResponse.json({ message: "GET error" })
  } else {
    // console.log("GET success!")
    return NextResponse.json({ nodes: data?.nodes || null })
  }
}

export async function POST(request: NextRequest) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  // console.log("user:", user)

  const { nodes, pageName } = await request.json()
  // console.log("nodes, pageName:", nodes, pageName)

  const { error } = await supabase
    .from("node_positions")
    .update({ nodes: nodes })
    .eq("user_id", user?.id)
    .eq("page_name", pageName)

  if (error) {
    // console.log("POST error:", error)
    return NextResponse.json({ message: "POST error" })
  } else {
    // console.log("POST success!")
    return NextResponse.json({ message: "POST success" })
  }
}
