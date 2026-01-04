import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

// POST /api/widget-installed
// Called when the widget loads successfully for the first time
export async function POST(request: NextRequest) {
  try {
    const { shopify_domain } = await request.json()

    if (!shopify_domain) {
      return NextResponse.json({ error: "Missing shopify_domain" }, { status: 400 })
    }

    const supabase = createClient()

    // Find the store by shopify_domain
    const { data: storeData, error: storeError } = await supabase
      .from("stores")
      .select("id, installed")
      .eq("shopify_domain", shopify_domain)
      .limit(1)

    if (storeError || !storeData || storeData.length === 0) {
      return NextResponse.json({ error: "Store not found" }, { status: 404 })
    }

    const store = storeData[0]

    // Only update if not already installed
    if (!store.installed) {
      const { error: updateError } = await supabase
        .from("stores")
        .update({
          installed: true,
          installed_at: new Date().toISOString(),
        })
        .eq("id", store.id)

      if (updateError) {
        console.error("Error updating installation status:", updateError)
        return NextResponse.json({ error: "Failed to update installation status" }, { status: 500 })
      }

      return NextResponse.json({
        success: true,
        message: "Installation status updated",
        first_install: true,
      })
    }

    return NextResponse.json({
      success: true,
      message: "Already installed",
      first_install: false,
    })
  } catch (error) {
    console.error("Error in widget-installed endpoint:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
