import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const shopifyDomain = searchParams.get("store")

    if (!shopifyDomain) {
      return NextResponse.json({ error: "Missing store parameter" }, { status: 400 })
    }

    const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
    const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!SUPABASE_URL || !SERVICE_ROLE) {
      return NextResponse.json({ error: "Server is not configured" }, { status: 500 })
    }

    const admin = createClient(SUPABASE_URL, SERVICE_ROLE, {
      auth: { persistSession: false },
    })

    console.log("[API] Looking up store with shopify_domain:", shopifyDomain)

    const { data: storeResults, error: storeError } = await admin
      .from("stores")
      .select(`
        id, name, domain, shopify_domain, store_slug, plan, remaining_leads, max_leads,
        widget_settings (
          heading, description, button_text, background_color, text_color,
          button_color, overlay_opacity, is_active, show_email, show_phone,
          discount_code, redirect_url, show_coupon_page
        )
      `)
      .eq("shopify_domain", shopifyDomain)
      .limit(1)

    console.log("[API] Store lookup returned:", storeResults?.length || 0, "rows")

    if (storeError) {
      console.error("[API] Store lookup error:", storeError)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    if (!storeResults || storeResults.length === 0) {
      console.log("[API] Store not found for shopify_domain:", shopifyDomain)
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    const store = storeResults[0]
    const ws = store.widget_settings || {}

    // Return safe response
    return NextResponse.json({
      id: store.id,
      name: store.name,
      domain: store.domain,
      shopify_domain: store.shopify_domain,
      plan: store.plan || "Free",
      remaining_leads: store.remaining_leads ?? 0,
      max_leads: store.max_leads ?? 100,
      widget_settings: {
        heading: ws.heading ?? "Get Exclusive Discount!",
        description: ws.description ?? "Leave your details and get 20% off your next order",
        button_text: ws.button_text ?? "Get My Discount",
        background_color: ws.background_color ?? "#ffffff",
        text_color: ws.text_color ?? "#1f2937",
        button_color: ws.button_color ?? "#3b82f6",
        overlay_opacity: ws.overlay_opacity ?? 0.8,
        is_active: ws.is_active !== false,
        show_email: ws.show_email !== false,
        show_phone: ws.show_phone === true,
        discount_code: ws.discount_code ?? "SAVE20",
        redirect_url: ws.redirect_url ?? null,
        show_coupon_page: ws.show_coupon_page !== false,
      },
    })
  } catch (err: any) {
    console.error("[API] Unexpected error:", err)
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 })
  }
}
