"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getStoreVariations } from "@/lib/utils/store-normalization"

interface WidgetSettings {
  heading: string
  description: string
  buttonText: string
  backgroundColor: string
  textColor: string
  buttonColor: string
  overlayOpacity: number
  isActive: boolean
  showEmail: boolean
  showPhone: boolean
  discountCode: string
  redirectUrl?: string
  showCouponPage: boolean
}

interface Store {
  id: string
  name: string
  domain: string
  plan: string
  remainingLeads: number
  maxLeads: number
  widgetSettings: WidgetSettings
}

export default function WidgetPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const storeParam = params.store as string
  const supabase = createClient()

  const [store, setStore] = useState<Store | null>(null)
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detectedProduct, setDetectedProduct] = useState<string>("")

  useEffect(() => {
    const loadStore = async () => {
      try {
        console.log("[v0] Looking for store with parameter:", storeParam)

        // 0) Try the server API first (works anywhere, bypasses RLS with safe response)
        try {
          const apiRes = await fetch(`/api/widget-store?store=${encodeURIComponent(storeParam)}`, { cache: "no-store" })
          if (apiRes.ok) {
            const apiJson = await apiRes.json()
            console.log("[v0] ✅ Found store via server API")

            // Map API shape to local Store interface
            setStore({
              id: apiJson.id,
              name: apiJson.name,
              domain: apiJson.domain,
              plan: apiJson.plan,
              remainingLeads: apiJson.remaining_leads,
              maxLeads: apiJson.max_leads,
              widgetSettings: {
                heading: apiJson.widget_settings.heading,
                description: apiJson.widget_settings.description,
                buttonText: apiJson.widget_settings.button_text,
                backgroundColor: apiJson.widget_settings.background_color,
                textColor: apiJson.widget_settings.text_color,
                buttonColor: apiJson.widget_settings.button_color,
                overlayOpacity: apiJson.widget_settings.overlay_opacity,
                isActive: apiJson.widget_settings.is_active,
                showEmail: apiJson.widget_settings.show_email,
                showPhone: apiJson.widget_settings.show_phone,
                discountCode: apiJson.widget_settings.discount_code,
                redirectUrl: apiJson.widget_settings.redirect_url || undefined,
                showCouponPage: apiJson.widget_settings.show_coupon_page,
              },
            })
            setLoading(false)
            return
          } else {
            console.log("[v0] Server API lookup did not find store, falling back to client Supabase lookups")
          }
        } catch (apiErr) {
          console.log("[v0] Server API lookup error, falling back to client Supabase:", apiErr)
        }

        const variations = getStoreVariations(storeParam)
        console.log("[v0] Store variations:", variations)

        let storeData = null
        let storeError = null

        console.log("[v0] Strategy 1: Trying store_slug lookup with:", variations.slug)
        const { data: slugData, error: slugError } = await supabase
          .from("stores")
          .select(`
            id,
            name,
            domain,
            store_slug,
            plan,
            remaining_leads,
            max_leads,
            widget_settings (
              heading,
              description,
              button_text,
              background_color,
              text_color,
              button_color,
              overlay_opacity,
              is_active,
              show_email,
              show_phone,
              discount_code,
              redirect_url,
              show_coupon_page
            )
          `)
          .eq("store_slug", variations.slug)
          .single()

        if (slugData && !slugError) {
          storeData = slugData
          console.log("[v0] ✅ Found store by slug:", variations.slug)
        } else {
          console.log("[v0] ❌ Slug lookup failed:", slugError?.message || "No data")

          console.log("[v0] Strategy 2: Trying normalized domain lookup with:", variations.normalized)
          const { data: normalizedData, error: normalizedError } = await supabase
            .from("stores")
            .select(`
              id,
              name,
              domain,
              store_slug,
              plan,
              remaining_leads,
              max_leads,
              widget_settings (
                heading,
                description,
                button_text,
                background_color,
                text_color,
                button_color,
                overlay_opacity,
                is_active,
                show_email,
                show_phone,
                discount_code,
                redirect_url,
                show_coupon_page
              )
            `)
            .eq("domain", variations.normalized)
            .single()

          if (normalizedData && !normalizedError) {
            storeData = normalizedData
            console.log("[v0] ✅ Found store by normalized domain:", variations.normalized)
          } else {
            console.log("[v0] ❌ Normalized domain lookup failed:", normalizedError?.message || "No data")

            const alternativeSlug = variations.normalized.replace(/\./g, "-")
            console.log("[v0] Strategy 3: Trying alternative slug:", alternativeSlug)
            const { data: altSlugData, error: altSlugError } = await supabase
              .from("stores")
              .select(`
                id,
                name,
                domain,
                store_slug,
                plan,
                remaining_leads,
                max_leads,
                widget_settings (
                  heading,
                  description,
                  button_text,
                  background_color,
                  text_color,
                  button_color,
                  overlay_opacity,
                  is_active,
                  show_email,
                  show_phone,
                  discount_code,
                  redirect_url,
                  show_coupon_page
                )
              `)
              .eq("store_slug", alternativeSlug)
              .single()

            if (altSlugData && !altSlugError) {
              storeData = altSlugData
              console.log("[v0] ✅ Found store by alternative slug:", alternativeSlug)
            } else {
              console.log("[v0] ❌ Alternative slug lookup failed:", altSlugError?.message || "No data")

              console.log("[v0] Strategy 4: Trying exact match with:", variations.original)
              const { data: exactData, error: exactError } = await supabase
                .from("stores")
                .select(`
                  id,
                  name,
                  domain,
                  store_slug,
                  plan,
                  remaining_leads,
                  max_leads,
                  widget_settings (
                    heading,
                    description,
                    button_text,
                    background_color,
                    text_color,
                    button_color,
                    overlay_opacity,
                    is_active,
                    show_email,
                    show_phone,
                    discount_code,
                    redirect_url,
                    show_coupon_page
                  )
                `)
                .eq("domain", variations.original)
                .single()

              if (exactData && !exactError) {
                storeData = exactData
                console.log("[v0] ✅ Found store by exact match:", variations.original)
              } else {
                console.log("[v0] ❌ Exact match failed:", exactError?.message || "No data")

                console.log("[v0] Strategy 5: Trying partial match patterns")
                const { data: partialData, error: partialError } = await supabase
                  .from("stores")
                  .select(`
                    id,
                    name,
                    domain,
                    store_slug,
                    plan,
                    remaining_leads,
                    max_leads,
                    widget_settings (
                      heading,
                      description,
                      button_text,
                      background_color,
                      text_color,
                      button_color,
                      overlay_opacity,
                      is_active,
                      show_email,
                      show_phone,
                      discount_code,
                      redirect_url,
                      show_coupon_page
                    )
                  `)
                  .or(
                    `domain.ilike.%${variations.normalized}%,store_slug.ilike.%${variations.slug}%,domain.ilike.%${alternativeSlug}%`,
                  )
                  .single()

                if (partialData && !partialError) {
                  storeData = partialData
                  console.log("[v0] ✅ Found store by partial match")
                } else {
                  console.log("[v0] ❌ All lookup strategies failed")
                  storeError = partialError || exactError || altSlugError || normalizedError || slugError

                  const { data: allStores } = await supabase.from("stores").select("name, domain, store_slug").limit(10)

                  console.log("[v0] Available stores in database:", allStores)
                }
              }
            }
          }
        }

        console.log("[v0] Final store query result:", { storeData, storeError })

        if (storeError && !storeData) throw storeError

        if (storeData && storeData.widget_settings) {
          const settings = storeData.widget_settings
          setStore({
            id: storeData.id,
            name: storeData.name,
            domain: storeData.domain,
            plan: storeData.plan || "Free",
            remainingLeads: storeData.remaining_leads || 0,
            maxLeads: storeData.max_leads || 100,
            widgetSettings: {
              heading: settings.heading || "Get Exclusive Discount!",
              description: settings.description || "Leave your details and get 20% off your next order",
              buttonText: settings.button_text || "Get My Discount",
              backgroundColor: settings.background_color || "#ffffff",
              textColor: settings.text_color || "#1f2937",
              buttonColor: settings.button_color || "#3b82f6",
              overlayOpacity: settings.overlay_opacity || 0.8,
              isActive: settings.is_active !== false,
              showEmail: settings.show_email !== false,
              showPhone: settings.show_phone === true,
              discountCode: settings.discount_code || "SAVE20",
              redirectUrl: settings.redirect_url,
              showCouponPage: settings.show_coupon_page !== false,
            },
          })
        }
      } catch (err) {
        console.error("Error loading store:", err)
        console.log("[v0] All store lookup strategies failed for parameter:", storeParam)
        setError("Store not found")
      } finally {
        setLoading(false)
      }
    }

    if (storeParam) {
      loadStore()
    }

    const productName =
      searchParams.get("product_name") ||
      searchParams.get("product") ||
      searchParams.get("title") ||
      searchParams.get("p") ||
      "Product"
    setDetectedProduct(productName)
  }, [storeParam, searchParams, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!store) return

    console.log("[v0] Form submission started")
    console.log("[v0] Widget settings:", store.widgetSettings)
    console.log("[v0] Form data:", formData)

    if (store.remainingLeads <= 0) {
      setError(`Lead limit reached for ${store.plan} plan. Please upgrade to continue collecting leads.`)
      return
    }

    if (!formData.name.trim()) {
      setError("Name is required")
      return
    }

    // Only validate email if it's shown in the widget
    if (store.widgetSettings.showEmail && !formData.email.trim()) {
      console.log("[v0] Email validation failed - showEmail:", store.widgetSettings.showEmail, "email:", formData.email)
      setError("Email is required")
      return
    }

    // Only validate phone if it's shown in the widget
    if (store.widgetSettings.showPhone && !formData.phone.trim()) {
      console.log("[v0] Phone validation failed - showPhone:", store.widgetSettings.showPhone, "phone:", formData.phone)
      setError("Phone number is required")
      return
    }

    console.log("[v0] All validations passed, submitting to database")

    setIsSubmitting(true)
    setError(null)

    try {
      const leadData: any = {
        store_id: store.id,
        name: formData.name.trim(),
        detected_product: detectedProduct || "Product",
        product_name: detectedProduct || "Product",
      }

      // Only include email if the field is enabled and has a value
      if (store.widgetSettings.showEmail && formData.email.trim()) {
        leadData.email = formData.email.trim()
      }

      // Only include phone if the field is enabled and has a value
      if (store.widgetSettings.showPhone && formData.phone.trim()) {
        leadData.phone = formData.phone.trim()
      }

      console.log("[v0] Submitting lead data:", leadData)

      const { error: leadError } = await supabase.from("leads").insert(leadData)

      if (leadError) {
        console.log("[v0] Database error:", leadError)
        throw leadError
      }

      const { error: updateError } = await supabase
        .from("stores")
        .update({
          total_leads: store.remainingLeads + (store.maxLeads - store.remainingLeads) + 1,
          leads_this_month: store.maxLeads - store.remainingLeads + 1,
          remaining_leads: store.remainingLeads - 1,
        })
        .eq("id", store.id)

      if (updateError) {
        console.log("[v0] Store update error:", updateError)
        // Don't throw error here as lead was already saved
      }

      console.log("[v0] Lead submitted successfully")

      if (store.widgetSettings.showCouponPage) {
        setIsSubmitted(true)
      } else {
        if (store.widgetSettings.redirectUrl) {
          window.location.href = store.widgetSettings.redirectUrl
        } else {
          window.location.href = `https://${store.domain}/cart`
        }
      }
    } catch (err) {
      console.error("Failed to submit lead:", err)
      setError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyCode = () => {
    if (store?.widgetSettings.discountCode) {
      navigator.clipboard.writeText(store.widgetSettings.discountCode)

      if (store.widgetSettings.redirectUrl) {
        window.location.href = store.widgetSettings.redirectUrl
      } else {
        window.location.href = `https://${store.domain}/cart`
      }
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    )
  }

  if (error && !store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-lg text-gray-600">{error}</div>
        </div>
      </div>
    )
  }

  if (!store?.widgetSettings.isActive) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-lg text-gray-600">Widget is currently inactive</div>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: `rgba(0, 0, 0, ${store.widgetSettings.overlayOpacity})` }}
      >
        <div
          className="max-w-md w-full mx-4 p-6 rounded-lg shadow-xl text-center"
          style={{
            backgroundColor: store.widgetSettings.backgroundColor,
            color: store.widgetSettings.textColor,
          }}
        >
          <div className="text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold mb-2">Thank You!</h3>
          <p className="text-sm opacity-90 mb-4">Your exclusive discount code:</p>
          <div className="bg-green-100 text-green-800 p-3 rounded-lg font-mono text-lg font-bold mb-4">
            {store.widgetSettings.discountCode}
          </div>
          <button
            onClick={handleCopyCode}
            className="w-full py-3 rounded-lg font-medium text-white transition-colors mb-2"
            style={{ backgroundColor: store.widgetSettings.buttonColor }}
          >
            Copy Code & Go to Cart
          </button>
          <p className="text-xs opacity-75">Click to copy the code and continue shopping</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: `rgba(0, 0, 0, ${store.widgetSettings.overlayOpacity})` }}
    >
      <div
        className="max-w-md w-full mx-4 p-6 rounded-lg shadow-xl"
        style={{
          backgroundColor: store.widgetSettings.backgroundColor,
          color: store.widgetSettings.textColor,
        }}
      >
        <h3 className="text-xl font-bold mb-2">{store.widgetSettings.heading}</h3>
        <p className="text-sm mb-6 opacity-90">{store.widgetSettings.description}</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {store.widgetSettings.showEmail && (
            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {store.widgetSettings.showPhone && (
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter your phone number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-medium text-white transition-colors disabled:opacity-50"
            style={{ backgroundColor: store.widgetSettings.buttonColor }}
          >
            {isSubmitting ? "Processing..." : store.widgetSettings.buttonText}
          </button>
          <p className="text-xs opacity-75 text-center">Get exclusive discount code after submission</p>
        </form>
      </div>
    </div>
  )
}
