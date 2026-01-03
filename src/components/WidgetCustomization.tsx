"use client"
import { useState, useEffect } from "react"
import { Mail, Phone, Gift, Settings } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { createClient } from "@/lib/supabase/client"
import type { Store, WidgetSettings } from "../types"

interface WidgetCustomizationProps {
  store: Store
  onUpdateWidget: (settings: Partial<WidgetSettings>) => void
}

export default function WidgetCustomization({ store, onUpdateWidget }: WidgetCustomizationProps) {
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

  const handleSwitchChange = async (key: keyof WidgetSettings, checked: boolean) => {
    console.log("[v0] Switch toggled:", key, checked)

    // Update local state immediately for instant UI feedback
    if (key === "showEmail") setShowEmail(checked)
    if (key === "showPhone") setShowPhone(checked)
    if (key === "showCouponPage") setShowCouponPage(checked)
    if (key === "isActive") setIsActive(checked)

    // Update settings state
    const newSettings = { ...settings, [key]: checked }
    setSettings(newSettings)

    // Save to Supabase via parent callback
    try {
      await onUpdateWidget({ [key]: checked })
      console.log("[v0] Successfully saved to Supabase:", key, checked)
    } catch (error) {
      console.error("[v0] Error saving switch state:", error)
      // Revert local state on error
      if (key === "showEmail") setShowEmail(!checked)
      if (key === "showPhone") setShowPhone(!checked)
      if (key === "showCouponPage") setShowCouponPage(!checked)
      if (key === "isActive") setIsActive(!checked)
    }
  }

  const saveSettings = () => {
    onUpdateWidget(settings)
    setHasUnsavedChanges(false)
  }

  const widgetUrl = `${window.location.origin}/widget/${store.shopify_domain || store.domain}`

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
              Test Widget
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
              Save Changes
            </button>
          </div>
        </div>

        {/* Live Widget URL */}
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <h4 className="font-medium text-white mb-4 flex items-center">Live Widget URL</h4>
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
                {copied ? <>Copied!</> : <>Copy</>}
              </button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <button
                onClick={() => window.open(widgetUrl, "_blank")}
                className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Open Widget
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
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center mb-6">
            <Mail className="h-5 w-5 mr-2 text-green-400" />
            <h3 className="text-xl font-bold text-white">Form Fields</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <label htmlFor="showEmail" className="text-sm font-medium text-gray-300">
                  Show Email Field
                </label>
              </div>
              <Switch
                id="showEmail"
                checked={showEmail}
                onCheckedChange={(checked) => handleSwitchChange("showEmail", checked)}
                variant="success"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <label htmlFor="showPhone" className="text-sm font-medium text-gray-300">
                  Show Phone Field
                </label>
              </div>
              <Switch
                id="showPhone"
                checked={showPhone}
                onCheckedChange={(checked) => handleSwitchChange("showPhone", checked)}
                variant="success"
              />
            </div>
          </div>
        </div>

        {/* Discount Settings */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center mb-6">
            <Gift className="h-5 w-5 mr-2 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Discount Settings</h3>
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
            <div>
              <label htmlFor="redirectUrl" className="block text-sm font-medium text-gray-300 mb-2">
                Redirect URL (optional)
              </label>
              <input
                type="text"
                id="redirectUrl"
                value={settings.redirectUrl || ""}
                onChange={(e) => {
                  const url = e.target.value.trim()
                  // Only validate if user has entered something
                  if (url && !url.startsWith("https://")) {
                    // Show validation error by adding red border
                    e.target.classList.add("border-red-500")
                    e.target.classList.remove("border-white/20")
                  } else {
                    // Remove error state
                    e.target.classList.remove("border-red-500")
                    e.target.classList.add("border-white/20")
                  }
                  updateSetting("redirectUrl", url)
                }}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                placeholder="https://yourstore.com/cart"
              />
              {settings.redirectUrl && !settings.redirectUrl.startsWith("https://") && (
                <p className="text-xs text-red-400 mt-1">Please enter a valid full URL starting with https://</p>
              )}
              <div className="mt-2 text-xs text-gray-400 space-y-1">
                <p>Redirect URL must be a full URL including https://</p>
                <p className="mt-1">
                  <strong>Examples:</strong>
                </p>
                <ul className="ml-4 space-y-0.5">
                  <li>https://yourstore.com/cart</li>
                  <li>https://yourstore.myshopify.com/cart</li>
                </ul>
                <p className="mt-1">Leave empty to automatically redirect to your store's default cart page.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Colors */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
          <h4 className="font-medium text-white mb-4 flex items-center">Colors</h4>
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
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center mb-6">
            <Settings className="h-5 w-5 mr-2 text-purple-400" />
            <h3 className="text-xl font-bold text-white">Advanced Settings</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="overlayOpacity" className="block text-sm font-medium text-gray-300 mb-2">
                Overlay Opacity: {Math.round(settings.overlayOpacity * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.overlayOpacity}
                onChange={(e) => updateSetting("overlayOpacity", Number.parseFloat(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="isActive" className="text-sm font-medium text-gray-300">
                Widget is active
              </label>
              <Switch
                id="isActive"
                checked={isActive}
                onCheckedChange={(checked) => handleSwitchChange("isActive", checked)}
                variant="success"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Live Preview - Fixed Height Container */}
      <div className="lg:sticky lg:top-6 lg:h-fit">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">Widget Preview</div>
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
                    {showEmail && (
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
                    {showPhone && (
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
                    {showCouponPage && (
                      <p className="text-xs opacity-75 text-center">Get discount code: {settings.discountCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                Widget is currently inactive
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
