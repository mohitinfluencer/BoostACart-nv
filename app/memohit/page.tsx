"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Lock, LogOut, RefreshCw, Shield, Search, AlertTriangle } from "lucide-react"

const ADMIN_USERNAME = process.env.ADMIN_USERNAME
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const MAX_LOGIN_ATTEMPTS = 5

interface StoreStats {
  store_id: string
  store_name: string
  domain: string
  shopify_domain: string
  plan: string
  total_leads: number
  leads_this_month: number
  leads_today: number
  max_leads: number
  remaining_leads: number
}

export default function AdminPanel() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loginError, setLoginError] = useState("")
  const [remainingAttempts, setRemainingAttempts] = useState(MAX_LOGIN_ATTEMPTS)
  const [lockoutTime, setLockoutTime] = useState<number | null>(null)
  const [stores, setStores] = useState<StoreStats[]>([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [updatingStore, setUpdatingStore] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState("")

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (lockoutTime && lockoutTime > 0) {
      const timer = setInterval(() => {
        const remaining = Math.ceil((lockoutTime - Date.now()) / 1000)
        if (remaining <= 0) {
          setLockoutTime(null)
          setRemainingAttempts(MAX_LOGIN_ATTEMPTS)
          setLoginError("")
          clearInterval(timer)
        }
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [lockoutTime])

  const checkAuth = async () => {
    setIsCheckingAuth(true)
    try {
      const response = await fetch("/api/admin/verify")
      if (response.ok) {
        const data = await response.json()
        if (data.authenticated) {
          setIsAuthenticated(true)
          loadStores()
        }
      }
    } catch (error) {
      console.error("[Admin Panel] Auth check failed:", error)
    } finally {
      setIsCheckingAuth(false)
    }
  }

  const loadStores = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/stores")
      const data = await response.json()
      if (response.ok) {
        setStores(data.stores || [])
      } else {
        console.error("Failed to load stores:", data.error)
      }
    } catch (err) {
      console.error("Error loading stores:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError("")

    if (lockoutTime && lockoutTime > Date.now()) {
      const remainingTime = Math.ceil((lockoutTime - Date.now()) / 1000)
      setLoginError(`Too many failed attempts. Try again in ${remainingTime} seconds.`)
      return
    }

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setIsAuthenticated(true)
        setRemainingAttempts(MAX_LOGIN_ATTEMPTS)
        setLockoutTime(null)
        loadStores()
      } else {
        if (response.status === 429) {
          if (data.remainingTime) {
            setLockoutTime(Date.now() + data.remainingTime * 1000)
            setLoginError(`Too many failed attempts. Account locked for 15 minutes.`)
          } else {
            setLoginError(data.error || "Too many failed attempts")
          }
        } else {
          setRemainingAttempts(data.remainingAttempts || 0)
          setLoginError(data.error || "Invalid credentials")
        }
        setPassword("")
      }
    } catch (error) {
      console.error("[Admin Panel] Login error:", error)
      setLoginError("Login failed. Please try again.")
      setPassword("")
    }
  }

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" })
      setIsAuthenticated(false)
      setUsername("")
      setPassword("")
    } catch (error) {
      console.error("[Admin Panel] Logout error:", error)
    }
  }

  const handlePlanChange = async (storeId: string, newPlan: string) => {
    setUpdatingStore(storeId)
    setSuccessMessage("")

    try {
      const response = await fetch("/api/admin/update-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeId, newPlan }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccessMessage(`Plan updated successfully for store`)
        await loadStores()
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        alert(`Failed to update plan: ${data.error}`)
      }
    } catch (err) {
      console.error("Error updating plan:", err)
      alert("Failed to update plan. Please try again.")
    } finally {
      setUpdatingStore(null)
    }
  }

  const filteredStores = stores.filter(
    (store) =>
      store.store_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.shopify_domain.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isCheckingAuth) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
          <p className="text-gray-400">Verifying authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Panel</h1>
          <p className="text-gray-400 text-center mb-8 text-sm">BoostACart Management</p>

          {loginError && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
              {loginError}
              {remainingAttempts > 0 && remainingAttempts < MAX_LOGIN_ATTEMPTS && (
                <div className="mt-1 text-xs">{remainingAttempts} attempts remaining</div>
              )}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter username"
                required
                disabled={lockoutTime !== null && lockoutTime > Date.now()}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
                required
                disabled={lockoutTime !== null && lockoutTime > Date.now()}
              />
            </div>

            <button
              type="submit"
              disabled={lockoutTime !== null && lockoutTime > Date.now()}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In</span>
            </button>
          </form>

          <p className="text-gray-500 text-xs text-center mt-6">Protected access only</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 mb-4 flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="text-amber-200 text-sm">Internal admin — temporary auth. Do not share access.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-6 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Admin Panel</h1>
              <p className="text-gray-400 text-sm">Manage all BoostACart stores and plans</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={loadStores}
                disabled={loading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-all duration-300 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-all duration-300"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-200 animate-fade-in">
            {successMessage}
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stores by name or domain..."
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Total Stores</div>
            <div className="text-3xl font-bold text-white">{stores.length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Free Plan</div>
            <div className="text-3xl font-bold text-blue-400">{stores.filter((s) => s.plan === "Free").length}</div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4">
            <div className="text-gray-400 text-sm mb-1">Paid Plans</div>
            <div className="text-3xl font-bold text-green-400">{stores.filter((s) => s.plan !== "Free").length}</div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/20">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Store Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Domain
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Total Leads
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    This Month
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Remaining
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Change Plan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-400"></div>
                        <span>Loading stores...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredStores.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-400">
                      No stores found
                    </td>
                  </tr>
                ) : (
                  filteredStores.map((store) => (
                    <tr key={store.store_id} className="hover:bg-white/5 transition-colors">
                      <td className="px-4 py-3 text-white font-medium">{store.store_name}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm">
                        <div>{store.shopify_domain}</div>
                        <div className="text-xs text-gray-500">{store.domain}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            store.plan === "Free"
                              ? "bg-gray-500/20 text-gray-300"
                              : store.plan === "Starter"
                                ? "bg-blue-500/20 text-blue-300"
                                : "bg-purple-500/20 text-purple-300"
                          }`}
                        >
                          {store.plan}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-white">{store.total_leads}</td>
                      <td className="px-4 py-3 text-white">
                        {store.leads_this_month} / {store.max_leads}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`font-semibold ${
                            store.remaining_leads === 0
                              ? "text-red-400"
                              : store.remaining_leads < 10
                                ? "text-orange-400"
                                : "text-green-400"
                          }`}
                        >
                          {store.remaining_leads}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <select
                          value={store.plan}
                          onChange={(e) => handlePlanChange(store.store_id, e.target.value)}
                          disabled={updatingStore === store.store_id}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <option value="Free" className="bg-slate-800">
                            Free (50)
                          </option>
                          <option value="Starter" className="bg-slate-800">
                            Starter (600)
                          </option>
                          <option value="Pro" className="bg-slate-800">
                            Pro (2000)
                          </option>
                        </select>
                        {updatingStore === store.store_id && (
                          <div className="inline-block ml-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
