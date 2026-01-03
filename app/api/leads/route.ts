import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { store_id, name, email, phone, detected_product, product_name } = body

    if (!store_id || !name) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Insert lead
    const { error: leadError } = await supabase.from("leads").insert({
      store_id,
      name,
      email: email || null,
      phone: phone || null,
      detected_product: detected_product || "Product",
      product_name: product_name || detected_product || "Product",
    })

    if (leadError) {
      console.error("[API] Lead insert error:", leadError)
      return NextResponse.json({ error: "Failed to save lead" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[API] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
