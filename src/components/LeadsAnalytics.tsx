"use client"

import type React from "react"
import type { Store, Lead } from "../types"
import { TrendingUp, Users, Package, Calendar, Clock, Download } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

interface LeadsAnalyticsProps {
  store: Store
  leads: Lead[]
}

const LeadsAnalytics: React.FC<LeadsAnalyticsProps> = ({ store, leads: initialLeads }) => {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "error">("idle")
  const [leads, setLeads] = useState<any[]>(initialLeads || [])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchLeads = async () => {
      if (!store?.id) return

      try {
        const { data: leadsData, error } = await supabase
          .from("leads")
          .select("*")
          .eq("store_id", store.id)
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Error fetching leads:", error)
        } else {
          setLeads(leadsData || [])
        }
      } catch (err) {
        console.error("Error loading leads:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchLeads()
  }, [store?.id, supabase])

  if (!store) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <div className="text-lg text-gray-300">Loading store data...</div>
        </div>
      </div>
    )
  }

  const widgetUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/widget/${store.name.toLowerCase().replace(/\s+/g, "-")}`
      : ""

  const copyWidgetUrl = async () => {
    if (widgetUrl) {
      try {
        await navigator.clipboard.writeText(widgetUrl)
        setCopyStatus("copied")
        setTimeout(() => setCopyStatus("idle"), 2000)
      } catch (err) {
        setCopyStatus("error")
        setTimeout(() => setCopyStatus("idle"), 2000)
      }
    }
  }

  const now = new Date()
  const today = now.toISOString().split("T")[0]
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`

  const totalLeads = leads.length
  const todayLeads = leads.filter((lead) => lead.created_at?.startsWith(today)).length
  const thisMonthLeads = leads.filter((lead) => lead.created_at?.startsWith(thisMonth)).length

  // Generate chart data for the last 7 days
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    const dateStr = date.toISOString().split("T")[0]
    const dayLeads = leads.filter((lead) => lead.created_at?.startsWith(dateStr)).length

    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      leads: dayLeads,
    }
  })

  const resolveProductName = (lead: any): string => {
    return lead.product_name || lead.detected_product || "Unknown Product"
  }

  // Product analysis
  const productLeads = leads.reduce(
    (acc, lead) => {
      const product = resolveProductName(lead)
      acc[product] = (acc[product] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const topProducts = Object.entries(productLeads)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([product, count]) => ({ product, count }))

  const downloadCSV = () => {
    if (leads.length === 0) {
      alert("No leads to download")
      return
    }

    // Create CSV headers
    const headers = ["Name", "Email", "Phone", "Product", "Timestamp"]

    // Create CSV rows
    const csvRows = leads.map((lead) => [
      lead.name || "",
      lead.email || "",
      lead.phone || "",
      resolveProductName(lead),
      new Date(lead.created_at).toLocaleString(),
    ])

    // Combine headers and rows
    const csvContent = [headers, ...csvRows]
      .map((row) => row.map((field) => `"${field.toString().replace(/"/g, '""')}"`).join(","))
      .join("\n")

    // Create and download the file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${store.name}_leads_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Leads */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Total Leads</p>
              <p className="text-3xl font-bold text-white">{totalLeads}</p>
              <p className="text-sm text-gray-400">All time</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-full">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
          </div>
        </div>

        {/* This Month Leads */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">This Month</p>
              <p className="text-3xl font-bold text-white">{thisMonthLeads}</p>
              <p className="text-sm text-gray-400">This month</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-full">
              <Calendar className="h-6 w-6 text-green-400" />
            </div>
          </div>
        </div>

        {/* Today Leads */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-300">Today</p>
              <p className="text-3xl font-bold text-white">{todayLeads}</p>
              <p className="text-sm text-gray-400">Today</p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-full">
              <Clock className="h-6 w-6 text-purple-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Widget Link Section */}

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Leads Over Time */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-green-400" />
            Leads Over Time (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Line type="monotone" dataKey="leads" stroke="#60A5FA" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Top Products */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-xl">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2 text-purple-400" />
            Top Lead Generating Products
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="product" angle={-45} textAnchor="end" height={80} stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(0,0,0,0.8)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="count" fill="#A78BFA" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Leads Table */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl">
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-400" />
              Recent Leads
            </h3>
            <button
              onClick={downloadCSV}
              disabled={leads.length === 0}
              className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4" />
              <span>Download CSV</span>
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/20">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Phone
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Timestamp
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-400 mx-auto"></div>
                  </td>
                </tr>
              ) : leads.length > 0 ? (
                leads.slice(0, 10).map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-white">{lead.name || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{lead.email || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300">{lead.phone || "N/A"}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-300" title={resolveProductName(lead)}>
                        {resolveProductName(lead)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-gray-400 text-sm">{new Date(lead.created_at).toLocaleString()}</div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-12">
                    <Users className="mx-auto h-12 w-12 text-gray-500" />
                    <h3 className="mt-2 text-sm font-medium text-white">No leads yet</h3>
                    <p className="mt-1 text-sm text-gray-400">Start capturing leads with your widget!</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LeadsAnalytics
