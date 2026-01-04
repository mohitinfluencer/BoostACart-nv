import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET /api/check-lead-limit?shopify_domain=...
// Check if store has remaining leads before opening widget
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const shopify_domain = searchParams.get("shopify_domain")

    if (!shopify_domain) {
      return NextResponse.json({ error: "Missing shopify_domain" }, { status: 400 })
    }

    const supabase = createClient()

    // Find the store by shopify_domain
    const { data: storeData, error: storeError } = await supabase
      .from("stores")
      .select("id, name, plan, max_leads")
      .eq("shopify_domain", shopify_domain)
      .limit(1)

    if (storeError || !storeData || storeData.length === 0) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    const store = storeData[0]

    const { count: monthLeadsCount } = await supabase
      .from("leads")
      .select("*", { count: "exact", head: true })
      .eq("store_id", store.id)
      .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

    const leads_this_month = monthLeadsCount || 0
    const max_leads = store.max_leads || 50

    const remaining_leads = Math.max(max_leads - leads_this_month, 0)

    // Pro plan has unlimited leads
    const canAcceptLeads = store.plan === "Pro" || remaining_leads > 0

    return NextResponse.json({
      canAcceptLeads,
      remaining_leads,
      leads_this_month,
      max_leads,
      plan: store.plan,
      store_name: store.name,
    })
  } catch (error) {
    console.error("Error in check-lead-limit endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
