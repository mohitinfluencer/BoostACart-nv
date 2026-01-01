"use client"

import type React from "react"
import { useState } from "react"
import { X, Mail, Lock, User, Building } from "lucide-react"
import { supabase } from "../../lib/supabase"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  mode: "signin" | "signup"
  onSuccess: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, mode, onSuccess }) => {
  const [authMode, setAuthMode] = useState(mode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    storeName: "",
    domain: "",
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (authMode === "signup") {
        // Sign up user
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              name: formData.name,
            },
          },
        })

        if (authError) throw authError

        if (authData.user) {
          // Create store for the user
          const { error: storeError } = await supabase.from("stores").insert({
            name: formData.storeName,
            domain: formData.domain,
            plan: "Free",
            user_id: authData.user.id,
            total_leads: 0,
            leads_this_month: 0,
            remaining_leads: 50, // Updated from 100 to 50 leads per month
            max_leads: 50,
          })

          if (storeError) throw storeError

          // Create default widget settings
          const { data: storeData } = await supabase
            .from("stores")
            .select("id")
            .eq("user_id", authData.user.id)
            .single()

          if (storeData) {
            await supabase.from("widget_settings").insert({
              store_id: storeData.id,
              heading: "Don't Miss Out!",
              description: "Enter your details to get an exclusive 20% discount on this item.",
              button_text: "Get My Discount",
              background_color: "#ffffff",
              text_color: "#1f2937",
              button_color: "#3b82f6",
              overlay_opacity: 0.5,
              is_active: true,
            })
          }
        }

        alert("Account created successfully! Please check your email to verify your account.")
      } else {
        // Sign in user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) throw signInError
      }

      onSuccess()
      onClose()
    } catch (err: any) {
      setError(err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {authMode === "signup" ? "Create Free Account" : "Sign In"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {authMode === "signup" && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="h-4 w-4 inline mr-1" />
                  Store Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.storeName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, storeName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="My Awesome Store"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Domain</label>
                <input
                  type="text"
                  required
                  value={formData.domain}
                  onChange={(e) => setFormData((prev) => ({ ...prev, domain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="mystore.com"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Mail className="h-4 w-4 inline mr-1" />
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Lock className="h-4 w-4 inline mr-1" />
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : authMode === "signup" ? "Create Free Account" : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setAuthMode(authMode === "signup" ? "signin" : "signup")}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            {authMode === "signup" ? "Already have an account? Sign in" : "Don't have an account? Create free account"}
          </button>
        </div>

        {authMode === "signup" && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 text-sm">
              🎉 <strong>Free Plan Includes:</strong>
              <br />• 50 leads per month
              <br />• Full widget customization
              <br />• Basic analytics
              <br />• No credit card required
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default AuthModal
