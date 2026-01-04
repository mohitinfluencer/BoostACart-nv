import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    const { storeId, newPlan } = body

    if (!storeId || !newPlan) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get current store data
    const { data: currentStore, error: fetchError } = await supabase
      .from("store_lead_stats")
      .select("*")
      .eq("store_id", storeId)
      .single()

    if (fetchError || !currentStore) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    // Determine max_leads based on plan
    let maxLeads = 50
    if (newPlan === "Starter") maxLeads = 600
    else if (newPlan === "Pro") maxLeads = 2000

    // Calculate new remaining_leads
    const remainingLeads = Math.max(maxLeads - (currentStore.leads_this_month || 0), 0)

    // Update store_lead_stats
    const { error: updateStatsError } = await supabase
      .from("store_lead_stats")
      .update({
        plan: newPlan,
        max_leads: maxLeads,
        remaining_leads: remainingLeads,
        updated_at: new Date().toISOString(),
      })
      .eq("store_id", storeId)

    if (updateStatsError) {
      console.error("Error updating store_lead_stats:", updateStatsError)
      return NextResponse.json({ error: "Failed to update plan" }, { status: 500 })
    }

    // Also update stores table for compatibility
    await supabase
      .from("stores")
      .update({
        plan: newPlan,
        max_leads: maxLeads,
        updated_at: new Date().toISOString(),
      })
      .eq("id", storeId)

    // Log to audit trail
    const { error: auditError } = await supabase.from("admin_audit_logs").insert({
      store_id: storeId,
      store_name: currentStore.store_name,
      action_type: "plan_change",
      old_value: currentStore.plan,
      new_value: newPlan,
      changed_by: "admin",
      ip_address: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown",
      user_agent: request.headers.get("user-agent") || "unknown",
    })

    if (auditError) {
      console.error("Error logging to audit trail:", auditError)
    }

    return NextResponse.json({
      success: true,
      message: "Plan updated successfully",
      data: {
        plan: newPlan,
        max_leads: maxLeads,
        remaining_leads: remainingLeads,
      },
    })
  } catch (err) {
    console.error("Unexpected error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
