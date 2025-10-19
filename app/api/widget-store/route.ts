import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { getStoreVariations } from "@/lib/utils/store-normalization"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const storeParam = searchParams.get("store")
    if (!storeParam) {
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

    const variations = getStoreVariations(storeParam)

    // Helper to shape response with safe fields only
    const toSafeResponse = (row: any) => {
      const s = row
      const ws = s.widget_settings || {}
      return {
        id: s.id,
        name: s.name,
        domain: s.domain,
        plan: s.plan || "Free",
        remaining_leads: s.remaining_leads ?? 0,
        max_leads: s.max_leads ?? 100,
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
      }
    }

    // Try multiple strategies, same order as client code
    const select = `
      id, name, domain, store_slug, plan, remaining_leads, max_leads,
      widget_settings (
        heading, description, button_text, background_color, text_color,
        button_color, overlay_opacity, is_active, show_email, show_phone,
        discount_code, redirect_url, show_coupon_page
      )
    `

    // 1) store_slug exact (normalized hyphenated)
    {
      const { data } = await admin.from("stores").select(select).eq("store_slug", variations.slug).maybeSingle()
      if (data) return NextResponse.json(toSafeResponse(data))
    }

    // 2) domain normalized
    {
      const { data } = await admin.from("stores").select(select).eq("domain", variations.normalized).maybeSingle()
      if (data) return NextResponse.json(toSafeResponse(data))
    }

    // 3) alternative slug from normalized domain (dots -> hyphens)
    {
      const alternativeSlug = variations.normalized.replace(/\./g, "-")
      const { data } = await admin.from("stores").select(select).eq("store_slug", alternativeSlug).maybeSingle()
      if (data) return NextResponse.json(toSafeResponse(data))
    }

    // 4) exact original domain
    {
      const { data } = await admin.from("stores").select(select).eq("domain", variations.original).maybeSingle()
      if (data) return NextResponse.json(toSafeResponse(data))
    }

    // 5) partial ilike matches as last resort
    {
      const alternativeSlug = variations.normalized.replace(/\./g, "-")
      const { data } = await admin
        .from("stores")
        .select(select)
        .or(
          `domain.ilike.%${variations.normalized}%,store_slug.ilike.%${variations.slug}%,domain.ilike.%${alternativeSlug}%`,
        )
        .maybeSingle()
      if (data) return NextResponse.json(toSafeResponse(data))
    }

    return NextResponse.json({ error: "Store not found" }, { status: 404 })
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Unexpected error" }, { status: 500 })
  }
}
