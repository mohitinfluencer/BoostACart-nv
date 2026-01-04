import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { store_id, shopify_domain, name, email, phone, detected_product, product_name } = body

    if (!store_id || !name || !shopify_domain) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const { data: statsData, error: statsError } = await supabase
      .from("store_lead_stats")
      .select("leads_this_month, max_leads, remaining_leads, plan")
      .eq("shopify_domain", shopify_domain)
      .maybeSingle()

    if (statsError) {
      console.error("[API] Error fetching store stats:", statsError)
      return NextResponse.json({ error: "Failed to verify plan limits" }, { status: 500 })
    }

    if (!statsData) {
      console.error("[API] No stats found for shopify_domain:", shopify_domain)
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    const currentUsage = statsData.leads_this_month || 0
    const maxAllowed = statsData.max_leads || 50

    console.log("[API] Plan validation - Plan:", statsData.plan, "Usage:", currentUsage, "/", maxAllowed)

    if (currentUsage >= maxAllowed) {
      console.log("[API] ❌ Rejecting lead - plan limit reached")
      return NextResponse.json(
        {
          success: false,
          reason: "PLAN_LIMIT_REACHED",
          error: "Plan limit reached. Upgrade to continue capturing leads.",
          currentUsage,
          maxAllowed,
        },
        { status: 403 },
      )
    }

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

    console.log("[API] ✅ Lead saved successfully")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[API] Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
