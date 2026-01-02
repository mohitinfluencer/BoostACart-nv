"use client"

import type React from "react"
import { useParams, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface Store {
  id: string
  name: string
  domain: string
  plan: string
  remainingLeads: number
  maxLeads: number
  widgetSettings: {
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
}

export default function EmbedWidgetContent() {
  const params = useParams()
  const searchParams = useSearchParams()

  const shop = params.shop as string
  const productId = searchParams.get("product_id") || ""
  const productTitle = searchParams.get("product_title") || "Product"

  const [store, setStore] = useState<Store | null>(null)
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const apiRes = await fetch(`/api/widget-store?store=${encodeURIComponent(shop)}`, {
          cache: "no-store",
        })

        if (!apiRes.ok) {
          throw new Error("Store not found")
        }

        const apiJson = await apiRes.json()

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
      } catch (err) {
        console.error("Failed to fetch store:", err)
        setError("Store not found")
      } finally {
        setLoading(false)
      }
    }

    fetchStore()
  }, [shop])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!store) return

    if (store.remainingLeads <= 0) {
      setError(`Lead limit reached. Please contact the store.`)
      return
    }

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

    setIsSubmitting(true)
    setError(null)

    try {
      const leadData: any = {
        store_id: store.id,
        name: formData.name.trim(),
        detected_product: productTitle,
        product_name: productTitle,
      }

      if (store.widgetSettings.showEmail && formData.email.trim()) {
        leadData.email = formData.email.trim()
      }

      if (store.widgetSettings.showPhone && formData.phone.trim()) {
        leadData.phone = formData.phone.trim()
      }

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      })

      if (!response.ok) {
        throw new Error("Failed to submit lead")
      }

      if (store.widgetSettings.showCouponPage) {
        setIsSubmitted(true)
      } else {
        handleClose()
      }
    } catch (err) {
      console.error("Failed to submit lead:", err)
      setError("Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    window.parent.postMessage({ type: "BOOSTACART_CLOSE" }, "*")
  }

  const handleCopyCode = () => {
    if (store?.widgetSettings.discountCode) {
      navigator.clipboard.writeText(store.widgetSettings.discountCode)
      alert("Discount code copied!")
    }
  }

  if (loading) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (error || !store) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <p className="text-xl mb-4">{error || "Store not found"}</p>
          <button onClick={handleClose} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    )
  }

  if (!store.widgetSettings.isActive) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center p-4">
        <div className="text-white text-center">
          <p className="text-xl mb-4">Widget is currently inactive</p>
          <button onClick={handleClose} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Close
          </button>
        </div>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center p-4"
        style={{
          backgroundColor: store.widgetSettings.backgroundColor,
          color: store.widgetSettings.textColor,
        }}
      >
        <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>

          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
            <p className="mb-6">Your discount code:</p>

            <div className="bg-white/20 rounded-lg p-4 mb-6">
              <code className="text-2xl font-mono font-bold">{store.widgetSettings.discountCode}</code>
            </div>

            <button
              onClick={handleCopyCode}
              className="w-full py-3 rounded-lg font-semibold transition-colors mb-4"
              style={{
                backgroundColor: store.widgetSettings.buttonColor,
                color: "#ffffff",
              }}
            >
              Copy Code
            </button>

            <button
              onClick={handleClose}
              className="w-full py-3 bg-white/10 rounded-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{
        backgroundColor: store.widgetSettings.backgroundColor,
        color: store.widgetSettings.textColor,
      }}
    >
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 sm:p-8 shadow-2xl relative">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-2">{store.widgetSettings.heading}</h2>
          <p className="text-sm opacity-90">{store.widgetSettings.description}</p>
          {productTitle && <p className="mt-2 text-sm font-medium opacity-80">Product: {productTitle}</p>}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Your Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>

          {store.widgetSettings.showEmail && (
            <div>
              <input
                type="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
          )}

          {store.widgetSettings.showPhone && (
            <div>
              <input
                type="tel"
                placeholder="Your Phone Number *"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>
          )}

          {error && <div className="text-red-300 text-sm bg-red-900/30 rounded-lg p-3">{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: store.widgetSettings.buttonColor,
              color: "#ffffff",
            }}
          >
            {isSubmitting ? "Submitting..." : store.widgetSettings.buttonText}
          </button>
        </form>

        <p className="text-xs text-center mt-4 opacity-60">Secured by BoostACart</p>
      </div>
    </div>
  )
}
