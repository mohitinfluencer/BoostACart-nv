"use client"

import { AlertCircle } from "lucide-react"

interface UsageMeterProps {
  totalLeads: number // Keep for backward compatibility, but prefer leadsThisMonth
  leadsThisMonth?: number // New prop for accurate monthly usage
  maxLeads: number
  plan: string
  showUpgradeButton?: boolean
  onUpgrade?: () => void
}

export default function UsageMeter({
  totalLeads,
  leadsThisMonth,
  maxLeads,
  plan,
  showUpgradeButton = false,
  onUpgrade,
}: UsageMeterProps) {
  // Pro plan has unlimited leads
  if (plan === "Pro") {
    return (
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
        <p className="text-purple-300 font-medium text-center">✨ Unlimited leads included in Pro plan</p>
      </div>
    )
  }

  const usedLeads = leadsThisMonth !== undefined ? leadsThisMonth : totalLeads
  const usage = Math.min((usedLeads / maxLeads) * 100, 100)
  const remaining = Math.max(maxLeads - usedLeads, 0)

  // Determine color based on usage
  let colorClass = "from-green-500 to-emerald-500"
  let textColorClass = "text-green-400"
  let shouldShake = false

  if (usage >= 90) {
    colorClass = "from-red-500 to-rose-500"
    textColorClass = "text-red-400"
    shouldShake = true
  } else if (usage >= 60) {
    colorClass = "from-orange-500 to-amber-500"
    textColorClass = "text-orange-400"
  }

  return (
    <div className="space-y-3">
      {/* Usage text */}
      <div className="flex justify-between items-center text-sm">
        <span className={`font-semibold ${textColorClass}`}>
          {usedLeads} / {maxLeads} leads used this month
        </span>
        <span className="text-gray-400">{remaining} remaining</span>
      </div>

      {/* Progress bar */}
      <div className="relative w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colorClass} transition-all duration-500 ${shouldShake ? "animate-pulse" : ""}`}
          style={{ width: `${usage}%` }}
        ></div>
      </div>

      {/* Warning message */}
      {usage >= 90 && (
        <div className="flex items-start space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-red-300 font-medium text-sm">You're running low on leads this month!</p>
            {showUpgradeButton && onUpgrade && (
              <button
                onClick={onUpgrade}
                className="mt-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
              >
                Upgrade Plan
              </button>
            )}
          </div>
        </div>
      )}

      {usage >= 60 && usage < 90 && (
        <div className="flex items-start space-x-2 p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
          <AlertCircle className="h-5 w-5 text-orange-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-orange-300 font-medium text-sm">Consider upgrading your plan soon.</p>
          </div>
        </div>
      )}
    </div>
  )
}
