"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Bookmark, Download, Trash2, ArrowLeft } from "lucide-react"

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  product_name?: string
  detected_product?: string
  created_at: string
  is_saved?: boolean
}

export default function SavedLeadsPage() {
  const router = useRouter()
  const supabase = createClient()
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadSavedLeads = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (!user) {
          router.push("/auth/login")
          return
        }

        const { data: storeData } = await supabase.from("stores").select("id").eq("user_id", user.id).limit(1).single()

        if (!storeData) return

        const { data: leadsData, error } = await supabase
          .from("leads")
          .select("*")
          .eq("store_id", storeData.id)
          .eq("is_saved", true)
          .order("created_at", { ascending: false })

        if (!error && leadsData) {
          setLeads(leadsData)
        }
      } catch (err) {
        console.error("Error loading saved leads:", err)
      } finally {
        setLoading(false)
      }
    }

    loadSavedLeads()
  }, [router, supabase])

  const toggleSelectAll = () => {
    if (selectedLeads.size === leads.length) {
      setSelectedLeads(new Set())
    } else {
      setSelectedLeads(new Set(leads.map((l) => l.id)))
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedLeads)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedLeads(newSelected)
  }

  const handleDownload = () => {
    const leadsToDownload = selectedLeads.size > 0 ? leads.filter((l) => selectedLeads.has(l.id)) : leads

    if (leadsToDownload.length === 0) {
      alert("No leads to download")
      return
    }

    const headers = ["Name", "Email", "Phone", "Product", "Timestamp"]
    const csvRows = leadsToDownload.map((lead) => [
      lead.name || "",
      lead.email || "",
      lead.phone || "",
      lead.product_name || lead.detected_product || "Unknown",
      new Date(lead.created_at).toLocaleString(),
    ])

    const csvContent = [headers, ...csvRows]
      .map((row) => row.map((field) => `"${field.toString().replace(/"/g, '""')}"`).join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `saved_leads_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDelete = async () => {
    if (selectedLeads.size === 0) return

    if (!confirm(`Are you sure you want to delete ${selectedLeads.size} saved lead(s)?`)) return

    try {
      const { error } = await supabase.from("leads").delete().in("id", Array.from(selectedLeads))

      if (!error) {
        setLeads(leads.filter((lead) => !selectedLeads.has(lead.id)))
        setSelectedLeads(new Set())
        alert("Leads deleted successfully!")
      }
    } catch (err) {
      console.error("Error deleting leads:", err)
      alert("Failed to delete leads")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push("/dashboard")}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-300" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center">
                <Bookmark className="h-6 w-6 mr-2 text-green-400" />
                Saved Leads
              </h1>
              <p className="text-sm text-gray-400 mt-1">{leads.length} saved leads</p>
            </div>
          </div>

          {selectedLeads.size > 0 && (
            <div className="flex items-center space-x-3">
              <span className="text-sm text-gray-300">{selectedLeads.size} selected</span>
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
              >
                <Trash2 className="h-4 w-4" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/20">
              <thead className="bg-white/5">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedLeads.size === leads.length && leads.length > 0}
                      onChange={toggleSelectAll}
                      className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded bg-white/10"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
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
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400 mx-auto"></div>
                    </td>
                  </tr>
                ) : leads.length > 0 ? (
                  leads.map((lead) => (
                    <tr
                      key={lead.id}
                      className={`hover:bg-white/5 transition-colors duration-200 ${
                        selectedLeads.has(lead.id) ? "bg-blue-500/10" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedLeads.has(lead.id)}
                          onChange={() => toggleSelect(lead.id)}
                          className="h-4 w-4 text-blue-400 focus:ring-blue-400 border-gray-600 rounded bg-white/10"
                        />
                      </td>
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
                        <div className="text-gray-300">{lead.product_name || lead.detected_product || "Unknown"}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-gray-400 text-sm">{new Date(lead.created_at).toLocaleString()}</div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-12">
                      <Bookmark className="mx-auto h-12 w-12 text-gray-500" />
                      <h3 className="mt-2 text-sm font-medium text-white">No saved leads</h3>
                      <p className="mt-1 text-sm text-gray-400">
                        Save leads from the Total Leads page to see them here
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
