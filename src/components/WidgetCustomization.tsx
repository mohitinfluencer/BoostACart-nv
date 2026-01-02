"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import type { Store, WidgetSettings } from "../types"
import { Palette, Eye, Save, Settings, ExternalLink, Mail, Phone, Gift, Copy, Link, CheckCircle } from "lucide-react"

interface WidgetCustomizationProps {
  store: Store
  onUpdateWidget: (settings: Partial<WidgetSettings>) => void
}

const WidgetCustomization: React.FC<WidgetCustomizationProps> = ({ store, onUpdateWidget }) => {
  const supabase = createClient()
  const [settings, setSettings] = useState<WidgetSettings>(store.widgetSettings)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [copied, setCopied] = useState(false)

  const [showEmail, setShowEmail] = useState(Boolean(store.widgetSettings.showEmail))
  const [showPhone, setShowPhone] = useState(Boolean(store.widgetSettings.showPhone))
  const [showCouponPage, setShowCouponPage] = useState(Boolean(store.widgetSettings.showCouponPage))
  const [isActive, setIsActive] = useState(Boolean(store.widgetSettings.isActive))

  useEffect(() => {
    setShowEmail(Boolean(store.widgetSettings.showEmail))
    setShowPhone(Boolean(store.widgetSettings.showPhone))
    setShowCouponPage(Boolean(store.widgetSettings.showCouponPage))
    setIsActive(Boolean(store.widgetSettings.isActive))
  }, [store.widgetSettings])

  const updateSetting = (key: keyof WidgetSettings, value: any) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    setHasUnsavedChanges(true)
    // Auto-update preview
    onUpdateWidget({ [key]: value })
  }

  const handleToggleChange = async (key: keyof WidgetSettings, value: boolean) => {
    // Update local state immediately for visual feedback
    if (key === "showEmail") setShowEmail(value)
    if (key === "showPhone") setShowPhone(value)
    if (key === "showCouponPage") setShowCouponPage(value)
    if (key === "isActive") setIsActive(value)

    // Update settings state
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)

    // Save to Supabase immediately
    try {
      const { error } = await supabase.from("widget_settings").upsert(
        {
          store_id: store.id,
          heading: newSettings.heading,
          description: newSettings.description,
          button_text: newSettings.buttonText,
          background_color: newSettings.backgroundColor,
          text_color: newSettings.textColor,
          button_color: newSettings.buttonColor,
          overlay_opacity: newSettings.overlayOpacity,
          is_active: key === "isActive" ? value : newSettings.isActive,
          show_email: key === "showEmail" ? value : newSettings.showEmail,
          show_phone: key === "showPhone" ? value : newSettings.showPhone,
          discount_code: newSettings.discountCode,
          redirect_url: newSettings.redirectUrl,
          show_coupon_page: key === "showCouponPage" ? value : newSettings.showCouponPage,
        },
        {
          onConflict: "store_id",
        },
      )

      if (error) {
        console.error("Error saving toggle setting:", error)
      } else {
        // Also trigger parent callback
        onUpdateWidget(newSettings)
      }
    } catch (err) {
      console.error("Error saving toggle setting:", err)
    }
  }

  const saveSettings = () => {
    onUpdateWidget(settings)
    setHasUnsavedChanges(false)
  }

  const widgetUrl = `${window.location.origin}/widget/${store.domain}`

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 min-h-screen">
      {/* Customization Controls */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white flex items-center">
            <Settings className="h-5 w-5 mr-2 text-blue-400" />
            Widget Customization
          </h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => window.open(widgetUrl, "_blank")}
              className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center space-x-2 text-sm shadow-lg hover:shadow-xl"
            >
              <ExternalLink className="h-4 w-4" />
              <span>Test Widget</span>
            </button>
            <button
              onClick={saveSettings}
              disabled={!hasUnsavedChanges}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl ${
                hasUnsavedChanges
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Save className="h-4 w-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </div>

        {/* Live Widget URL */}
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <h4 className="font-medium text-white mb-4 flex items-center">
            <Link className="h-4 w-4 mr-2 text-blue-400" />
            Live Widget URL
          </h4>
          <div className="space-y-3">
            <p className="text-sm text-gray-300">
              Use this URL to embed your widget on any website or share it directly with customers:
            </p>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/20">
              <code className="flex-1 text-sm font-mono text-gray-200 break-all">{widgetUrl}</code>
              <button
                onClick={() => copyToClipboard(widgetUrl)}
                className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm shadow-lg"
              >
                {copied ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button
                onClick={() => window.open(widgetUrl, "_blank")}
                className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Open Widget</span>
              </button>
              <span className="text-gray-500">•</span>
              <span className={`flex items-center space-x-1 ${settings.isActive ? "text-green-400" : "text-red-400"}`}>
                <div className={`w-2 h-2 rounded-full ${settings.isActive ? "bg-green-400" : "bg-red-400"}`}></div>
                <span>{settings.isActive ? "Active" : "Inactive"}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <h4 className="font-medium text-white mb-4">Text Content</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Heading</label>
              <input
                type="text"
                value={settings.heading}
                onChange={(e) => updateSetting("heading", e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                placeholder="Enter widget heading"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
              <textarea
                value={settings.description}
                onChange={(e) => updateSetting("description", e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                placeholder="Enter widget description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Button Text</label>
              <input
                type="text"
                value={settings.buttonText}
                onChange={(e) => updateSetting("buttonText", e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                placeholder="Enter button text"
              />
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl">
          <div className="flex items-center mb-4">
            <Mail className="h-5 w-5 mr-2 text-green-400" />
            <h2 className="text-lg font-semibold text-white">Form Fields</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <label htmlFor="showEmail" className="text-sm font-medium text-gray-300">
                  Show Email Field
                </label>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={showEmail}
                onClick={() => handleToggleChange("showEmail", !showEmail)}
                className={`relative inline-flex h-[22px] w-[42px] flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  showEmail ? "bg-blue-600 focus:ring-blue-500" : "bg-gray-600/80 focus:ring-gray-500"
                }`}
              >
                <span
                  className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-sm transition-all duration-200 ${
                    showEmail ? "translate-x-[23px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <label htmlFor="showPhone" className="text-sm font-medium text-gray-300">
                  Show Phone Field
                </label>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={showPhone}
                onClick={() => handleToggleChange("showPhone", !showPhone)}
                className={`relative inline-flex h-[22px] w-[42px] flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  showPhone ? "bg-blue-600 focus:ring-blue-500" : "bg-gray-600/80 focus:ring-gray-500"
                }`}
              >
                <span
                  className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-sm transition-all duration-200 ${
                    showPhone ? "translate-x-[23px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Discount Settings */}
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl">
          <div className="flex items-center mb-4">
            <Gift className="h-5 w-5 mr-2 text-orange-400" />
            <h2 className="text-lg font-semibold text-white">Discount Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="discountCode" className="block text-sm font-medium text-gray-300 mb-2">
                Discount Code
              </label>
              <input
                type="text"
                id="discountCode"
                value={settings.discountCode}
                onChange={(e) => updateSetting("discountCode", e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="SAVE20"
              />
            </div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="showCouponPage" className="text-sm font-medium text-gray-300">
                Show Coupon Page
              </label>
              <button
                type="button"
                role="switch"
                aria-checked={showCouponPage}
                onClick={() => handleToggleChange("showCouponPage", !showCouponPage)}
                className={`relative inline-flex h-[22px] w-[42px] flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  showCouponPage ? "bg-blue-600 focus:ring-blue-500" : "bg-gray-600/80 focus:ring-gray-500"
                }`}
              >
                <span
                  className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-sm transition-all duration-200 ${
                    showCouponPage ? "translate-x-[23px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </div>
            <p className="text-xs text-gray-400">Display discount code page after form submission</p>
            <div className="text-xs text-gray-400 bg-white/5 p-3 rounded-lg">
              <strong>How it works:</strong>
              <ul className="mt-1 space-y-1">
                <li>
                  • <strong>Enabled:</strong> User fills form → sees coupon page → copies code → redirects to cart
                </li>
                <li>
                  • <strong>Disabled:</strong> User fills form → redirects directly to cart/redirect URL
                </li>
              </ul>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Redirect URL (optional)</label>
              <input
                type="url"
                value={settings.redirectUrl || ""}
                onChange={(e) => updateSetting("redirectUrl", e.target.value)}
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-sm"
                placeholder={`https://${store.domain}/cart`}
              />
              <p className="text-xs text-gray-400 mt-1">Leave empty to redirect to {store.domain}/cart</p>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <h4 className="font-medium text-white mb-4 flex items-center">
            <Palette className="h-4 w-4 mr-2 text-purple-400" />
            Colors
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Background Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSetting("backgroundColor", e.target.value)}
                  className="w-12 h-10 border border-white/20 rounded-lg cursor-pointer bg-white/10"
                />
                <input
                  type="text"
                  value={settings.backgroundColor}
                  onChange={(e) => updateSetting("backgroundColor", e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-mono text-sm text-white placeholder-gray-400 backdrop-blur-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Text Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.textColor}
                  onChange={(e) => updateSetting("textColor", e.target.value)}
                  className="w-12 h-10 border border-white/20 rounded-lg cursor-pointer bg-white/10"
                />
                <input
                  type="text"
                  value={settings.textColor}
                  onChange={(e) => updateSetting("textColor", e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-mono text-sm text-white placeholder-gray-400 backdrop-blur-sm"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">Button Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={settings.buttonColor}
                  onChange={(e) => updateSetting("buttonColor", e.target.value)}
                  className="w-12 h-10 border border-white/20 rounded-lg cursor-pointer bg-white/10"
                />
                <input
                  type="text"
                  value={settings.buttonColor}
                  onChange={(e) => updateSetting("buttonColor", e.target.value)}
                  className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent font-mono text-sm text-white placeholder-gray-400 backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl">
          <div className="flex items-center mb-4">
            <Settings className="h-5 w-5 mr-2 text-purple-400" />
            <h2 className="text-lg font-semibold text-white">Advanced Settings</h2>
          </div>
          <div className="space-y-4">
            <p className="text-sm text-gray-400 mb-4">Overlay Opacity: {Math.round(settings.overlayOpacity * 100)}%</p>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={settings.overlayOpacity}
              onChange={(e) => updateSetting("overlayOpacity", Number.parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div>
                <label htmlFor="isActive" className="text-sm font-medium text-gray-300">
                  Widget is active
                </label>
                <p className="text-xs text-gray-400 mt-1">Enable or disable the widget on your store</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={isActive}
                onClick={() => handleToggleChange("isActive", !isActive)}
                className={`relative inline-flex h-[22px] w-[42px] flex-shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                  isActive ? "bg-[#3DDC97] focus:ring-green-500" : "bg-gray-600/80 focus:ring-gray-500"
                }`}
              >
                <span
                  className={`inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-sm transition-all duration-200 ${
                    isActive ? "translate-x-[23px]" : "translate-x-[3px]"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview - Fixed Height Container */}
      <div className="lg:sticky lg:top-6 lg:h-fit">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Eye className="h-5 w-5 mr-2 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Live Preview</h3>
          </div>
          <span className="text-sm text-gray-400">Scale: 80%</span>
        </div>

        <div
          className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border-2 border-dashed border-white/20 relative overflow-hidden shadow-xl"
          style={{ minHeight: "500px", maxHeight: "70vh" }}
        >
          {/* Mock website background */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg shadow-sm h-32 mb-4 p-4 opacity-50">
            <div className="h-3 bg-white/20 rounded w-1/3 mb-3"></div>
            <div className="space-y-2">
              <div className="h-2 bg-white/20 rounded"></div>
              <div className="h-2 bg-white/20 rounded w-4/5"></div>
              <div className="h-2 bg-white/20 rounded w-3/5"></div>
            </div>
          </div>

          {settings.isActive ? (
            <div className="relative flex items-center justify-center" style={{ minHeight: "300px" }}>
              <div
                className="absolute inset-0 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `rgba(0, 0, 0, ${settings.overlayOpacity * 0.3})` }}
              >
                <div
                  className="max-w-xs w-full mx-4 p-4 rounded-lg shadow-xl transform scale-80"
                  style={{
                    backgroundColor: settings.backgroundColor,
                    color: settings.textColor,
                  }}
                >
                  <h3 className="text-lg font-bold mb-2">{settings.heading}</h3>
                  <p className="text-sm mb-4 opacity-90">{settings.description}</p>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-medium mb-1">Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900 text-xs"
                        disabled
                      />
                    </div>
                    {settings.showEmail && (
                      <div>
                        <label className="block text-xs font-medium mb-1">Email *</label>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900 text-xs"
                          disabled
                        />
                      </div>
                    )}
                    {settings.showPhone && (
                      <div>
                        <label className="block text-xs font-medium mb-1">Phone Number *</label>
                        <input
                          type="tel"
                          placeholder="Enter your phone number"
                          className="w-full px-2 py-1 border border-gray-300 rounded text-gray-900 text-xs"
                          disabled
                        />
                      </div>
                    )}
                    <button
                      className="w-full py-2 rounded font-medium text-white text-sm"
                      style={{ backgroundColor: settings.buttonColor }}
                      disabled
                    >
                      {settings.buttonText}
                    </button>
                    {settings.showCouponPage && (
                      <p className="text-xs opacity-75 text-center">Get discount code: {settings.discountCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <Eye className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Widget is currently inactive</p>
                <p className="text-xs text-gray-500">Enable widget to see preview</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <button
            onClick={() => window.open(widgetUrl, "_blank")}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl"
          >
            Open Full Widget Test
          </button>
        </div>
      </div>
    </div>
  )
}

export default WidgetCustomization
