"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { getWhatsAppLink } from "@/lib/whatsapp"
import { LogOut, User, AlertCircle, TrendingUp } from "lucide-react"

interface Store {
  id: string
  name: string
  domain: string
  user_id: string
  plan: string
  total_leads: number
  leads_this_month: number
  remaining_leads: number
  max_leads: number
  store_slug: string
}

export default function AccountPage() {
  const router = useRouter()
  const supabase = createClient()
  const [store, setStore] = useState<Store | null>(null)
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

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

        const { data: statsData, error: statsError } = await supabase
          .from("store_lead_stats")
          .select("*")
          .eq("user_id", user.id)
          .limit(1)
          .maybeSingle()

        if (statsError || !statsData) {
          console.error("Error loading store stats:", statsError)
          // Fallback to stores table
          const { data: storeData, error: storeError } = await supabase
            .from("stores")
            .select("id, name, domain, user_id, plan, max_leads, store_slug")
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

          const storeRecord = storeData[0]

          const { count: totalLeadsCount } = await supabase
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("store_id", storeRecord.id)

          const { count: monthLeadsCount } = await supabase
            .from("leads")
            .select("*", { count: "exact", head: true })
            .eq("store_id", storeRecord.id)
            .gte("created_at", new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString())

          const total_leads = totalLeadsCount || 0
          const leads_this_month = monthLeadsCount || 0

          const max_leads = storeRecord.max_leads || 50
          const remaining_leads = Math.max(max_leads - leads_this_month, 0)

          const store = {
            ...storeRecord,
            total_leads,
            leads_this_month,
            remaining_leads,
            max_leads,
          }

          setStore(store)
        } else {
          // Use data from store_lead_stats VIEW
          const store = {
            id: statsData.store_id,
            name: statsData.store_name,
            domain: statsData.domain,
            user_id: user.id,
            plan: statsData.plan,
            total_leads: statsData.total_leads,
            leads_this_month: statsData.leads_this_month,
            remaining_leads: statsData.remaining_leads,
            max_leads: statsData.max_leads,
            store_slug: statsData.store_name.toLowerCase().replace(/\s+/g, "-"),
          }

          setStore(store)
        }
      } catch (err) {
        console.error("Error loading account:", err)
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <div className="text-lg text-gray-300">Loading Account...</div>
        </div>
      </div>
    )
  }

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-4">No Store Connected Yet</h1>
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

  const progressPercentage = store.plan !== "Pro" ? Math.min((store.leads_this_month / store.max_leads) * 100, 100) : 0

  const getPlanBadgeStyle = (plan: string) => {
    switch (plan) {
      case "Free":
        return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
      case "Starter":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30"
      case "Pro":
        return "bg-purple-500/20 text-purple-300 border border-purple-500/30"
      default:
        return "bg-gray-500/20 text-gray-300 border border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-2xl animate-pulse"></div>
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
                onClick={() => router.push("/dashboard")}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-sm"
              >
                <TrendingUp className="h-4 w-4 flex-shrink-0" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300 text-sm"
              >
                <LogOut className="h-4 w-4 flex-shrink-0" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Account Settings</h2>
          <p className="text-gray-400">Manage your BoostACart account and plan details</p>
        </div>

        <div className="space-y-6">
          {/* SECTION 1 — Account Overview */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-6">Account Overview</h3>

            <div className="space-y-4">
              {/* Store Name */}
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Store Name</span>
                <span className="text-white font-medium">{store.store_slug || store.name}</span>
              </div>

              {/* Current Plan */}
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Current Plan</span>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getPlanBadgeStyle(store.plan)}`}>
                  {store.plan}
                </span>
              </div>

              {/* Total Leads Collected */}
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Total Leads Collected</span>
                <span className="text-white font-medium">{store.total_leads.toLocaleString()}</span>
              </div>

              {/* Leads Used This Month */}
              <div className="flex justify-between items-center py-3 border-b border-white/10">
                <span className="text-gray-400">Leads Used This Month</span>
                <span className="text-white font-medium">{store.leads_this_month.toLocaleString()}</span>
              </div>

              {/* Remaining Leads */}
              <div className="flex justify-between items-center py-3">
                <span className="text-gray-400">Remaining Leads</span>
                <span className="text-white font-medium">
                  {store.plan === "Pro" ? "Unlimited" : store.remaining_leads.toLocaleString()}
                </span>
              </div>
            </div>

            {store.plan === "Pro" ? (
              <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-purple-300 font-medium text-center">✨ Unlimited leads included</p>
              </div>
            ) : (
              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Monthly Lead Usage</span>
                  <span>
                    {store.leads_this_month} / {store.max_leads}
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            {store.plan !== "Pro" && store.remaining_leads < 10 && (
              <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-amber-300 font-medium">You are running low on leads.</p>
                  <p className="text-amber-200/70 text-sm mt-1">
                    Consider upgrading your plan to continue capturing leads.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* SECTION 2 — Plan & Billing */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-white mb-4">Plan & Billing</h3>

            <p className="text-gray-300 mb-6 leading-relaxed">
              BoostACart currently handles upgrades manually. If you upgrade, our team activates your plan after
              payment.
            </p>

            <a
              href={getWhatsAppLink("918303208502", "upgrade")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Upgrade Plan
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
