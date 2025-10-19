"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import LeadsAnalytics from "../../src/components/LeadsAnalytics"
import WidgetCustomization from "../../src/components/WidgetCustomization"
import { LogOut, User } from "lucide-react"

interface Store {
  id: string
  name: string
  domain: string
  user_id: string
}

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

export default function Dashboard() {
  const router = useRouter()
  const supabase = createClient()
  const [activeTab, setActiveTab] = useState<"analytics" | "customization">("analytics")
  const [store, setStore] = useState<Store | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [widgetSettings, setWidgetSettings] = useState<WidgetSettings>({
    heading: "Get Exclusive Discount!",
    description: "Leave your details and get 20% off your next order",
    buttonText: "Get My Discount",
    backgroundColor: "#ffffff",
    textColor: "#1f2937",
    buttonColor: "#3b82f6",
    overlayOpacity: 0.8,
    isActive: true,
    showEmail: false,
    showPhone: true,
    discountCode: "SAVE20",
    showCouponPage: true,
  })

  useEffect(() => {
    const loadUserAndStore = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()
        if (userError || !user) {
          router.push("/auth/login")
          return
        }

        setUser(user)

        const { data: storeData, error: storeError } = await supabase
          .from("stores")
          .select("*")
          .eq("user_id", user.id)
          .limit(1)

        if (storeError) {
          console.error("Error loading store:", storeError)
          return
        }

        if (!storeData || storeData.length === 0) {
          console.log("No store found for user")
          setLoading(false)
          return
        }

        const store = storeData[0]
        setStore(store)

        const { data: settingsData, error: settingsError } = await supabase
          .from("widget_settings")
          .select("*")
          .eq("store_id", store.id)
          .maybeSingle()

        if (settingsError) {
          console.error("Error loading widget settings:", settingsError)
        }

        if (settingsData) {
          setWidgetSettings({
            heading: settingsData.heading || "Get Exclusive Discount!",
            description: settingsData.description || "Leave your details and get 20% off your next order",
            buttonText: settingsData.button_text || "Get My Discount",
            backgroundColor: settingsData.background_color || "#ffffff",
            textColor: settingsData.text_color || "#1f2937",
            buttonColor: settingsData.button_color || "#3b82f6",
            overlayOpacity: settingsData.overlay_opacity || 0.8,
            isActive: settingsData.is_active !== false,
            showEmail: settingsData.show_email || false,
            showPhone: settingsData.show_phone !== false,
            discountCode: settingsData.discount_code || "SAVE20",
            redirectUrl: settingsData.redirect_url,
            showCouponPage: settingsData.show_coupon_page !== false,
          })
        }
      } catch (err) {
        console.error("Error loading dashboard:", err)
      } finally {
        setLoading(false)
      }
    }

    loadUserAndStore()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  const onUpdateWidget = async (settings: Partial<WidgetSettings>) => {
    if (!store) return

    const newSettings = { ...widgetSettings, ...settings }
    setWidgetSettings(newSettings)

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
          is_active: newSettings.isActive,
          show_email: newSettings.showEmail,
          show_phone: newSettings.showPhone,
          discount_code: newSettings.discountCode,
          redirect_url: newSettings.redirectUrl,
          show_coupon_page: newSettings.showCouponPage,
        },
        {
          onConflict: "store_id",
        },
      )

      if (error) {
        console.error("Error updating widget settings:", error)
      }
    } catch (err) {
      console.error("Error saving widget settings:", err)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <div className="text-lg text-gray-300">Loading Dashboard...</div>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-4">No Store Found</h1>
          <p className="text-gray-300 mb-4">Please contact support to set up your store.</p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  const storeWithSettings = {
    ...store,
    widgetSettings,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-xl animate-bounce"></div>
      </div>

      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md border-b border-white/20 shadow-lg relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 py-4 sm:py-0 sm:h-16">
            <div className="flex items-center space-x-4 w-full sm:w-auto">
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-white truncate">{store.name}</h1>
                <p className="text-xs sm:text-sm text-gray-300 truncate">{store.domain}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="flex items-center space-x-2 text-gray-300 text-xs sm:text-sm">
                <User className="h-4 w-4 flex-shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-sm w-full sm:w-auto justify-center sm:justify-start"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white/5 backdrop-blur-sm border-b border-white/10 relative z-10 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 sm:space-x-8 min-w-max sm:min-w-0">
            <button
              onClick={() => setActiveTab("analytics")}
              className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === "analytics"
                  ? "border-blue-400 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
              }`}
            >
              Analytics
            </button>
            <button
              onClick={() => setActiveTab("customization")}
              className={`py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-all duration-300 whitespace-nowrap ${
                activeTab === "customization"
                  ? "border-blue-400 text-blue-400"
                  : "border-transparent text-gray-400 hover:text-gray-200 hover:border-gray-500"
              }`}
            >
              Customization
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-8 relative z-10">
        {activeTab === "analytics" && <LeadsAnalytics store={storeWithSettings} leads={[]} />}
        {activeTab === "customization" && (
          <WidgetCustomization store={storeWithSettings} onUpdateWidget={onUpdateWidget} />
        )}
      </div>
    </div>
  )
}
