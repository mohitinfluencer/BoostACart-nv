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
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [detectedProduct, setDetectedProduct] = useState<string>("")
  const [isButtonDisabled, setIsButtonDisabled] = useState(false)
  const [checkingLimit, setCheckingLimit] = useState(false)
  const [limitReached, setLimitReached] = useState(false)

  useEffect(() => {
    const loadStore = async () => {
      try {
        console.log("[v0] Looking for store with shopify_domain:", shopifyDomain)

        const { data: statsData, error: statsError } = await supabase
          .from("store_lead_stats")
          .select("*")
          .eq("shopify_domain", shopifyDomain)
          .maybeSingle()

        if (!statsError && statsData) {
          console.log("[v0] ✅ Found store from store_lead_stats:", statsData.store_name)
          console.log(
            "[v0] Plan limits - Used:",
            statsData.leads_this_month,
            "Max:",
            statsData.max_leads,
            "Remaining:",
            statsData.remaining_leads,
          )

          const isAtLimit = (statsData.leads_this_month || 0) >= (statsData.max_leads || 50)
          setLimitReached(isAtLimit)

          const { data: settingsData } = await supabase
            .from("widget_settings")
            .select("*")
            .eq("store_id", statsData.store_id)
            .maybeSingle()

          if (settingsData) {
            setStore({
              id: statsData.store_id,
              name: statsData.store_name,
              domain: statsData.domain,
              shopify_domain: statsData.shopify_domain || statsData.domain,
              plan: statsData.plan || "Free",
              remainingLeads: statsData.remaining_leads || 0,
              maxLeads: statsData.max_leads || 50,
              widgetSettings: {
                heading: settingsData.heading || "Get Exclusive Discount!",
                description: settingsData.description || "Leave your details and get 20% off your next order",
                buttonText: settingsData.button_text || "Get My Discount",
                backgroundColor: settingsData.background_color || "#ffffff",
                textColor: settingsData.text_color || "#1f2937",
                buttonColor: settingsData.button_color || "#3b82f6",
                overlayOpacity: settingsData.overlay_opacity || 0.8,
                isActive: settingsData.is_active !== false,
                showEmail: settingsData.show_email !== false,
                showPhone: settingsData.show_phone === true,
                discountCode: settingsData.discount_code || "SAVE20",
                redirectUrl: settingsData.redirect_url,
                showCouponPage: settingsData.show_coupon_page !== false,
              },
            })
          }
        } else {
          const { data: storeResults, error: storeError } = await supabase
            .from("stores")
            .select(`
              id,
              name,
              domain,
              shopify_domain,
              store_slug,
              plan,
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

          const { count: monthLeadsCount } = await supabase
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("store_id", storeData.id)
            .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

          const leads_this_month = monthLeadsCount || 0
          const max_leads = storeData.max_leads || 50
          const remainingLeads = Math.max(max_leads - leads_this_month, 0)

          console.log("[v0] Lead limits - Used:", leads_this_month, "Max:", max_leads, "Remaining:", remainingLeads)

          if (storeData && storeData.widget_settings) {
            const settings = storeData.widget_settings
            setStore({
              id: storeData.id,
              name: storeData.name,
              domain: storeData.domain,
              shopify_domain: storeData.shopify_domain || storeData.domain,
              plan: storeData.plan || "Free",
              remainingLeads,
              maxLeads: max_leads,
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

    setCheckingLimit(true)
    setError(null)

    try {
      const { data: currentStats, error: statsError } = await supabase
        .from("store_lead_stats")
        .select("leads_this_month, max_leads, remaining_leads")
        .eq("shopify_domain", shopifyDomain)
        .maybeSingle()

      if (statsError) {
        console.error("[v0] Error checking lead limits:", statsError)
        setError("Failed to verify lead allowance. Please try again.")
        setCheckingLimit(false)
        return
      }

      if (!currentStats) {
        console.error("[v0] No stats found for store")
        setError("Store configuration not found")
        setCheckingLimit(false)
        return
      }

      console.log("[v0] Current lead usage:", currentStats.leads_this_month, "/", currentStats.max_leads)

      if ((currentStats.leads_this_month || 0) >= (currentStats.max_leads || 50)) {
        console.log("[v0] ❌ Lead limit reached - blocking submission")
        setLimitReached(true)
        setCheckingLimit(false)
        return
      }

      setCheckingLimit(false)

      if (!formData.name.trim()) {
        setError("Name is required")
        return
      }

      if (store.widgetSettings.showEmail && !formData.email.trim()) {
        setError("Email is required")
        return
      }

      if (store.widgetSettings.showPhone && !formData.phone.trim()) {
        setError("Phone number is required")
        return
      }

      console.log("[v0] All validations passed, submitting to API")

      setIsSubmitting(true)

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          store_id: store.id,
          shopify_domain: shopifyDomain,
          name: formData.name.trim(),
          email: store.widgetSettings.showEmail ? formData.email.trim() : null,
          phone: store.widgetSettings.showPhone ? formData.phone.trim() : null,
          detected_product: detectedProduct || "Product",
          product_name: detectedProduct || "Product",
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.reason === "PLAN_LIMIT_REACHED") {
          console.log("[v0] ❌ Backend rejected - plan limit reached")
          setLimitReached(true)
          setIsSubmitting(false)
          return
        }
        throw new Error(result.error || "Failed to save lead")
      }

      console.log("[v0] ✅ Lead submitted successfully")

      if (store.widgetSettings.showCouponPage) {
        setIsSubmitted(true)
      } else {
        window.parent.postMessage({ type: "BOOSTACART_GO_TO_CART" }, "*")
      }
    } catch (err) {
      console.error("[v0] Failed to submit lead:", err)
      setError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
      setCheckingLimit(false)
    }
  }

  const handleCopyAndOpenCart = async () => {
    if (!store?.widgetSettings.discountCode || isButtonDisabled) return

    try {
      await navigator.clipboard.writeText(store.widgetSettings.discountCode)
      setIsCopied(true)
      setIsButtonDisabled(true)
      console.log("[v0] Code copied successfully")

      const redirectUrl = store.widgetSettings.redirectUrl
        ? store.widgetSettings.redirectUrl
        : `https://${store.shopify_domain}/cart`

      console.log("[v0] Opening redirect URL in new tab:", redirectUrl)

      window.open(redirectUrl, "_blank", "noopener,noreferrer")

      setTimeout(() => {
        setIsButtonDisabled(false)
      }, 1500)
    } catch (err) {
      console.error("[v0] Failed to copy code:", err)
      setIsButtonDisabled(false)
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

  if (limitReached) {
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
          aria-labelledby="limit-title"
          aria-describedby="limit-description"
        >
          <div className="mx-auto w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h2 id="limit-title" className="text-2xl font-bold mb-2">
            Lead Limit Reached
          </h2>

          <p id="limit-description" className="text-sm opacity-90 mb-6">
            You've reached your plan limit. Upgrade your plan to continue capturing leads.
          </p>

          <a
            href={`https://${window.location.hostname}/dashboard/account`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-opacity-50 mb-3"
            style={{
              backgroundColor: store.widgetSettings.buttonColor,
              boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            Upgrade Plan
          </a>

          <p className="text-xs opacity-75 mt-4">Contact your account administrator</p>
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

          <h2 id="success-title" className="text-2xl font-bold mb-2">
            {isCopied ? "Code Copied!" : "Coupon Ready!"}
          </h2>

          <p id="success-description" className="text-sm opacity-90 mb-6">
            {isCopied
              ? "Coupon copied. A new tab has been opened for your cart."
              : "Your discount code is ready to use"}
          </p>

          <div
            className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300 p-4 rounded-xl mb-6"
            aria-live="polite"
          >
            <div className="text-green-800 font-mono text-2xl font-bold tracking-wider">
              {store.widgetSettings.discountCode}
            </div>
          </div>

          <button
            onClick={handleCopyAndOpenCart}
            disabled={isButtonDisabled}
            className="w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-opacity-50 mb-3"
            style={{
              backgroundColor: isCopied ? "#10b981" : store.widgetSettings.buttonColor,
              boxShadow: "0 4px 14px 0 rgba(0, 0, 0, 0.2)",
            }}
            aria-label={isCopied ? "Code copied" : "Copy code and go to cart"}
          >
            {isCopied ? "Code Copied!" : "Copy Code & Go to Cart"}
          </button>

          <p className="text-xs opacity-75 leading-relaxed mt-4">
            {isCopied ? "Paste the code at checkout to apply your discount" : "Click to copy code and open cart"}
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
        {checkingLimit && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <div className="text-sm text-blue-700 font-medium">Checking lead allowance...</div>
          </div>
        )}

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
            disabled={isSubmitting || checkingLimit}
            className="w-full py-3 rounded-lg font-medium text-white transition-colors disabled:opacity-50"
            style={{ backgroundColor: store.widgetSettings.buttonColor }}
          >
            {checkingLimit ? "Checking..." : isSubmitting ? "Processing..." : store.widgetSettings.buttonText}
          </button>
          <p className="text-xs opacity-75 text-center">Get exclusive discount code after submission</p>
        </form>
      </div>
    </div>
  )
}
