export interface Store {
  id: string
  name: string
  domain: string
  shopify_domain?: string
  plan: "Free" | "Starter" | "Pro"
  totalLeads: number
  leadsThisMonth: number
  remainingLeads: number
  maxLeads: number
  createdAt: string
  widgetSettings: WidgetSettings
  profile_id?: string
}

export interface WidgetSettings {
  id?: string
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

export interface Lead {
  id: string
  storeId: string
  name: string
  phone?: string
  email?: string
  product: string
  quantity?: number
  variantId?: string
  sourceUrl?: string
  timestamp: string
  detected_product?: string
}

export interface PlanLimits {
  Free: number
  Starter: number
  Pro: number
}
