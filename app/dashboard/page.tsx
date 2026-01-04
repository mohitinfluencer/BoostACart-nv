"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import LeadsAnalytics from "../../src/components/LeadsAnalytics"
import WidgetCustomization from "../../src/components/WidgetCustomization"
import { User, FileText, HelpCircle, MessageCircle } from "lucide-react"

interface Store {
  id: string
  name: string
  domain: string
  shopify_domain?: string
  user_id: string
  plan: string
  max_leads?: number
  remaining_leads?: number
  total_leads?: number
  leads_this_month?: number
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
          .select("id, name, domain, shopify_domain, user_id, plan, max_leads")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle()

        if (storeError || !storeData) {
          console.log("No store found for user")
          setLoading(false)
          return
        }

        const { data: statsData, error: statsError } = await supabase
          .from("store_lead_stats")
          .select("*")
          .eq("store_id", storeData.id)
          .limit(1)
          .maybeSingle()

        if (statsError) {
          console.error("Error loading store stats:", statsError)
          // Fallback to manual calculation
          const { count: totalLeadsCount } = await supabase
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("store_id", storeData.id)

          const { count: monthLeadsCount } = await supabase
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("store_id", storeData.id)
            .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

          const total_leads = totalLeadsCount || 0
          const leads_this_month = monthLeadsCount || 0

          let max_leads = storeData.max_leads
          let needsUpdate = false
          const updates: any = {}

          if (storeData.plan === "Free" && max_leads !== 50) {
            updates.max_leads = 50
            max_leads = 50
            needsUpdate = true
          } else if (storeData.plan === "Starter" && max_leads !== 600) {
            updates.max_leads = 600
            max_leads = 600
            needsUpdate = true
          } else if (storeData.plan === "Pro" && max_leads !== 999999) {
            updates.max_leads = 999999
            max_leads = 999999
            needsUpdate = true
          }

          if (needsUpdate) {
            await supabase.from("stores").update(updates).eq("id", storeData.id)
          }

          const remaining_leads = Math.max(max_leads - leads_this_month, 0)

          const store = {
            ...storeData,
            max_leads,
            total_leads,
            leads_this_month,
            remaining_leads,
          }

          setStore(store)
        } else if (statsData) {
          let max_leads = statsData.max_leads
          let needsUpdate = false
          const updates: any = {}

          if (statsData.plan === "Free" && max_leads !== 50) {
            updates.max_leads = 50
            max_leads = 50
            needsUpdate = true
          } else if (statsData.plan === "Starter" && max_leads !== 600) {
            updates.max_leads = 600
            max_leads = 600
            needsUpdate = true
          } else if (statsData.plan === "Pro" && max_leads !== 999999) {
            updates.max_leads = 999999
            max_leads = 999999
            needsUpdate = true
          }

          if (needsUpdate) {
            await supabase.from("stores").update(updates).eq("id", storeData.id)
          }

          const store = {
            id: statsData.store_id,
            name: statsData.store_name,
            domain: statsData.domain,
            shopify_domain: statsData.shopify_domain || statsData.domain,
            user_id: user.id,
            plan: statsData.plan,
            max_leads,
            total_leads: statsData.total_leads,
            leads_this_month: statsData.leads_this_month,
            remaining_leads: Math.max(max_leads - statsData.leads_this_month, 0),
          }

          setStore(store)
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
            <Link
              href="/dashboard/account"
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 border-2 border-white/30 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              title="Go to Account"
            >
              <User className="h-5 w-5 text-white" />
            </Link>
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
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px:8 py-4 sm:py-8 relative z-10">
        {activeTab === "analytics" && <LeadsAnalytics store={storeWithSettings} leads={[]} />}
        {activeTab === "customization" && (
          <WidgetCustomization store={storeWithSettings} onUpdateWidget={onUpdateWidget} />
        )}
      </div>

      <div className="bg-white/5 backdrop-blur-sm border-t border-white/10 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => router.push("/setup")}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm"
            >
              <FileText className="h-4 w-4" />
              <span>Setup Guide</span>
            </button>
            <button
              onClick={() => router.push("/setup/shopify")}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm"
            >
              <HelpCircle className="h-4 w-4" />
              <span>Shopify Setup Guide</span>
            </button>
            <button
              onClick={() => router.push("/contact")}
              className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-lg transition-all duration-300 text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span>Contact Us</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
