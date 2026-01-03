"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

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

export default function WidgetPage({
  params,
  searchParams,
}: {
  params: { store: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const shopifyDomain = params.store as string
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
        console.log("[v0] Looking for store with shopify_domain:", shopifyDomain)

        const { data: storeResults, error: storeError } = await supabase
          .from("stores")
          .select(`
            id,
            name,
            domain,
            shopify_domain,
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
          .eq("shopify_domain", shopifyDomain)
          .limit(1)

        console.log("[v0] Store lookup returned:", storeResults?.length || 0, "rows")

        if (storeError) {
          console.error("[v0] Store lookup error:", storeError)
        }

        if (!storeResults || storeResults.length === 0) {
          console.log("[v0] ❌ Store not found for shopify_domain:", shopifyDomain)
          setError("Store not found")
          setLoading(false)
          return
        }

        const storeData = storeResults[0]
        console.log("[v0] ✅ Found store:", storeData.name)

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
        console.error("[v0] Error loading store:", err)
        console.log("[v0] Failed to load store for shopify_domain:", shopifyDomain)
        setError("Store not found")
      } finally {
        setLoading(false)
      }
    }

    if (shopifyDomain) {
      loadStore()
    }

    const productName =
      (typeof searchParams?.product_name === "string" ? searchParams.product_name : null) ||
      (typeof searchParams?.product === "string" ? searchParams.product : null) ||
      (typeof searchParams?.title === "string" ? searchParams.title : null) ||
      (typeof searchParams?.p === "string" ? searchParams.p : null) ||
      "Product"
    setDetectedProduct(productName)
  }, [shopifyDomain, searchParams, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!store) return

    console.log("[v0] Form submission started")
    console.log("[v0] Widget settings:", store.widgetSettings)
    console.log("[v0] Form data:", formData)

    if ((store?.remainingLeads || 0) <= 0) {
      setError(`Lead limit reached for ${store?.plan || "current"} plan. Please upgrade to continue collecting leads.`)
      return
    }

    if (!formData.name.trim()) {
      setError("Name is required")
      return
    }

    if (store.widgetSettings.showEmail && !formData.email.trim()) {
      console.log("[v0] Email validation failed - showEmail:", store.widgetSettings.showEmail, "email:", formData.email)
      setError("Email is required")
      return
    }

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

      if (store.widgetSettings.showEmail && formData.email.trim()) {
        leadData.email = formData.email.trim()
      }

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
      }

      console.log("[v0] Lead submitted successfully")

      if (store.widgetSettings.showCouponPage) {
        setIsSubmitted(true)
      } else {
        const cartUrl = store.widgetSettings.redirectUrl || `https://${store.domain}/cart`
        const targetOrigin = getParentOrigin()
        console.log("[v0] Sending navigation message to origin:", targetOrigin)
        window.parent.postMessage(
          {
            type: "BOOSTACART_GO_TO_CART",
            cartUrl: cartUrl,
          },
          targetOrigin,
        )
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

      const cartUrl = store.widgetSettings.redirectUrl || `https://${store.domain}/cart`
      const targetOrigin = getParentOrigin()
      console.log("[v0] Sending navigation message to origin:", targetOrigin)
      window.parent.postMessage(
        {
          type: "BOOSTACART_GO_TO_CART",
          cartUrl: cartUrl,
        },
        targetOrigin,
      )
    }
  }

  const getParentOrigin = (): string => {
    try {
      // First, try to get the origin from document.referrer
      if (document.referrer) {
        const referrerUrl = new URL(document.referrer)
        return referrerUrl.origin
      }

      // Fallback: try to get the parent's location origin directly
      if (window.parent !== window && window.parent.location.origin) {
        return window.parent.location.origin
      }
    } catch (e) {
      // If cross-origin restrictions prevent access, log and use wildcard as last resort
      console.warn("[v0] Could not determine parent origin, using wildcard:", e)
    }

    // Last resort fallback
    return "*"
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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Store Not Found</h1>
          <p className="text-gray-600">
            Could not find a store with shopify_domain: <strong className="text-gray-900">{shopifyDomain}</strong>
          </p>
          <p className="text-gray-500 mt-2 text-sm">Please verify the store identifier and try again.</p>
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

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
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
