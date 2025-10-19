export interface Store {
  id: string
  name: string
  domain: string
  plan: "Free" | "Starter" | "Pro"
  totalLeads: number
  leadsThisMonth: number
  remainingLeads: number
  maxLeads: number
  createdAt: string
  widgetSettings: WidgetSettings
  user_id?: string
}

export interface WidgetSettings {
  heading: string
  description: string
  buttonText: string
  backgroundColor: string
  textColor: string
  buttonColor: string
  overlayOpacity: number
  isActive: boolean
}

export interface Lead {
  id: string
  storeId: string
  name: string
  phone: string
  product: string
  quantity: number
  variantId: string
  sourceUrl: string
  timestamp: string
}

export interface PlanLimits {
  Free: number
  Starter: number
  Pro: number
}
