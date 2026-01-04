import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// GET /api/widget-check-limit?store_id=...
// Called by widget before form submission to check if store can accept more leads
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const store_id = searchParams.get("store_id")

    if (!store_id) {
      return NextResponse.json({ error: "Missing store_id" }, { status: 400 })
    }

    const supabase = createClient()

    // Get store details
    const { data: storeData, error: storeError } = await supabase
      .from("stores")
      .select("id, name, plan, max_leads")
      .eq("id", store_id)
      .limit(1)

    if (storeError || !storeData || storeData.length === 0) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    const store = storeData[0]

    // Count leads this month
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

    if (!canAcceptLeads) {
      return NextResponse.json({
        canAcceptLeads: false,
        message: "Plan limit reached — upgrade to continue collecting leads.",
        leads_this_month,
        max_leads,
        plan: store.plan,
      })
    }

    return NextResponse.json({
      canAcceptLeads: true,
      remaining_leads,
      leads_this_month,
      max_leads,
      plan: store.plan,
    })
  } catch (error) {
    console.error("Error in widget-check-limit endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
