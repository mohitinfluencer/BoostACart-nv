import { supabase } from "../lib/supabase"
import type { Store, Lead, WidgetSettings } from "../types"
import type { Database } from "../types/database"

type StoreRow = Database["public"]["Tables"]["stores"]["Row"]
type WidgetSettingsRow = Database["public"]["Tables"]["widget_settings"]["Row"]
type LeadRow = Database["public"]["Tables"]["leads"]["Row"]

// Transform database rows to app types
const transformStore = (storeRow: StoreRow, widgetSettings: WidgetSettingsRow): Store => ({
  id: storeRow.id,
  name: storeRow.name,
  domain: storeRow.domain,
  plan: storeRow.plan,
  totalLeads: storeRow.total_leads,
  leadsThisMonth: storeRow.leads_this_month,
  remainingLeads: storeRow.remaining_leads,
  maxLeads: storeRow.max_leads,
  createdAt: storeRow.created_at,
  widgetSettings: {
    heading: widgetSettings.heading,
    description: widgetSettings.description,
    buttonText: widgetSettings.button_text,
    backgroundColor: widgetSettings.background_color,
    textColor: widgetSettings.text_color,
    buttonColor: widgetSettings.button_color,
    overlayOpacity: widgetSettings.overlay_opacity,
    isActive: widgetSettings.is_active,
  },
})

const transformLead = (leadRow: LeadRow): Lead => ({
  id: leadRow.id,
  storeId: leadRow.store_id,
  name: leadRow.name,
  phone: leadRow.phone,
  product: leadRow.product,
  quantity: leadRow.quantity,
  variantId: leadRow.variant_id,
  sourceUrl: leadRow.source_url,
  timestamp: leadRow.created_at,
})

export class SupabaseService {
  // Fetch all stores with their widget settings
  static async getStores(userId?: string): Promise<Store[]> {
    let storesQuery = supabase.from("stores").select("*").order("created_at", { ascending: false })

    if (userId) {
      storesQuery = storesQuery.eq("user_id", userId)
    }

    const { data: stores, error: storesError } = await storesQuery

    if (storesError) throw storesError

    const { data: widgetSettings, error: widgetError } = await supabase.from("widget_settings").select("*")

    if (widgetError) throw widgetError

    return stores.map((store) => {
      const settings = widgetSettings.find((ws) => ws.store_id === store.id)
      if (!settings) throw new Error(`Widget settings not found for store ${store.id}`)
      return transformStore(store, settings)
    })
  }

  // Fetch leads for all stores or specific store
  static async getLeads(storeId?: string): Promise<Lead[]> {
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false })

    if (storeId) {
      query = query.eq("store_id", storeId)
    }

    const { data, error } = await query
    if (error) throw error

    return data.map(transformLead)
  }

  // Create a new store with default widget settings
  static async createStore(storeData: {
    name: string
    domain: string
    plan?: "Free" | "Starter" | "Pro"
  }): Promise<Store> {
    const { data: store, error: storeError } = await supabase
      .from("stores")
      .insert({
        name: storeData.name,
        domain: storeData.domain,
        plan: storeData.plan || "Free",
        total_leads: 0,
        leads_this_month: 0,
        remaining_leads: storeData.plan === "Pro" ? 999999 : storeData.plan === "Starter" ? 600 : 50,
        max_leads: storeData.plan === "Pro" ? 999999 : storeData.plan === "Starter" ? 600 : 50,
      })
      .select()
      .single()

    if (storeError) throw storeError

    const { data: widgetSettings, error: widgetError } = await supabase
      .from("widget_settings")
      .insert({
        store_id: store.id,
        heading: "Don't Miss Out!",
        description: "Enter your details to get an exclusive 20% discount on this item.",
        button_text: "Get My Discount",
        background_color: "#ffffff",
        text_color: "#1f2937",
        button_color: "#3b82f6",
        overlay_opacity: 0.5,
        is_active: true,
      })
      .select()
      .single()

    if (widgetError) throw widgetError

    return transformStore(store, widgetSettings)
  }

  // Update widget settings
  static async updateWidgetSettings(storeId: string, settings: Partial<WidgetSettings>): Promise<void> {
    const updateData: any = {}

    if (settings.heading !== undefined) updateData.heading = settings.heading
    if (settings.description !== undefined) updateData.description = settings.description
    if (settings.buttonText !== undefined) updateData.button_text = settings.buttonText
    if (settings.backgroundColor !== undefined) updateData.background_color = settings.backgroundColor
    if (settings.textColor !== undefined) updateData.text_color = settings.textColor
    if (settings.buttonColor !== undefined) updateData.button_color = settings.buttonColor
    if (settings.overlayOpacity !== undefined) updateData.overlay_opacity = settings.overlayOpacity
    if (settings.isActive !== undefined) updateData.is_active = settings.isActive

    updateData.updated_at = new Date().toISOString()

    const { error } = await supabase.from("widget_settings").update(updateData).eq("store_id", storeId)

    if (error) throw error
  }

  // Add a new lead
  static async addLead(leadData: Omit<Lead, "id" | "timestamp">): Promise<Lead> {
    console.log("Adding lead with product data:", {
      product: leadData.product,
      variantId: leadData.variantId,
      quantity: leadData.quantity,
      sourceUrl: leadData.sourceUrl,
    })

    const { data: lead, error: leadError } = await supabase
      .from("leads")
      .insert({
        store_id: leadData.storeId,
        name: leadData.name,
        phone: leadData.phone,
        product: leadData.product,
        quantity: leadData.quantity,
        variant_id: leadData.variantId,
        source_url: leadData.sourceUrl,
      })
      .select()
      .single()

    if (leadError) throw leadError

    // Update store lead counts
    const { error: updateError } = await supabase.rpc("increment_store_leads", {
      store_id: leadData.storeId,
    })

    if (updateError) throw updateError

    return transformLead(lead)
  }

  // Get store by name (for routing)
  static async getStoreByName(storeName: string): Promise<Store | null> {
    const stores = await this.getStores()
    return stores.find((store) => store.name.toLowerCase().replace(/\s+/g, "-") === storeName) || null
  }
}
