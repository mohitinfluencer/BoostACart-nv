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
  shopify_domain: string
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
  const [isCopied, setIsCopied] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
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
            shopify_domain: storeData.shopify_domain || storeData.domain,
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
        console.log("[v0] Sending navigation request to parent")
        window.parent.postMessage(
          {
            type: "BOOSTACART_GO_TO_CART",
          },
          "*",
        )
      }
    } catch (err) {
      console.error("Failed to submit lead:", err)
      setError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCopyCode = async () => {
    if (!store?.widgetSettings.discountCode || isCopied) return

    try {
      await navigator.clipboard.writeText(store.widgetSettings.discountCode)
      setIsCopied(true)
      console.log("[v0] Code copied successfully")
    } catch (err) {
      console.error("[v0] Failed to copy code:", err)
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
    const cartUrl = store?.shopify_domain ? `https://${store.shopify_domain}/cart` : "/cart"

    return (
      <div
        className="min-h-screen flex items-center justify-center p-4"
        style={{ backgroundColor: `rgba(0, 0, 0, ${store.widgetSettings.overlayOpacity})` }}
      >
        <div
          className="max-w-md w-full p-8 rounded-2xl shadow-2xl text-center"
          style={{
            backgroundColor: store.widgetSettings.backgroundColor,
            color: store.widgetSettings.textColor,
          }}
          role="dialog"
          aria-labelledby="success-title"
          aria-describedby="success-description"
        >
          {/* Success Icon */}
          {isCopied ? (
            <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          ) : (
            <div className="text-5xl mb-4 animate-bounce" aria-hidden="true">
              🎉
            </div>
          )}

          {/* Updated title and subtitle */}
          <h2 id="success-title" className="text-2xl font-bold mb-2">
            {isCopied ? "Code copied successfully" : "Coupon Ready!"}
          </h2>

          <p id="success-description" className="text-sm opacity-90 mb-6">
            {isCopied ? "Your discount code is ready to use" : "Your discount code has been generated"}
          </p>

          {/* Discount Code Display */}
          <div
            className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 p-4 rounded-xl mb-6"
            aria-live="polite"
          >
            <div className="text-green-800 font-mono text-2xl font-bold tracking-wider">
              {store.widgetSettings.discountCode}
            </div>
          </div>

          <button
            onClick={handleCopyCode}
            disabled={isCopied}
            className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-90 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-opacity-50 mb-3"
            style={{
              backgroundColor: isCopied ? "#10b981" : store.widgetSettings.buttonColor,
              boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.2)",
            }}
            aria-label={isCopied ? "Coupon code copied to clipboard" : "Copy coupon code to clipboard"}
          >
            {isCopied ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Copied!
              </span>
            ) : (
              "Copy Code"
            )}
          </button>

          {isCopied && (
            <a
              href={cartUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50"
              style={{
                backgroundColor: store.widgetSettings.buttonColor,
                boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.2)",
              }}
              aria-label="Go to cart to apply discount code"
            >
              Go to Cart
            </a>
          )}

          <p className="text-xs opacity-75 leading-relaxed mt-4">
            {isCopied ? "Paste your discount code at checkout" : "Click to copy your discount code"}
          </p>
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
