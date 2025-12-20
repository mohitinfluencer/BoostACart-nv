import Link from "next/link"
import type { Metadata } from "next"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { ShoppingCart, Zap, TrendingUp, Users, MessageCircle, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Cart Recovery for Shopify Stores – BoostACart",
  description:
    "Recover abandoned Shopify carts using BoostACart's add-to-cart lead capture tool. Convert high-intent shoppers using WhatsApp, SMS, and email follow-ups.",
}

export default function ShopifyCartRecoveryPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <HeroGeometric badge="Shopify Cart Recovery" title1="Cart Recovery for" title2="Shopify Stores" />

      {/* Hero Subtext Section */}
      <section className="py-16 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative">
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Capture email and phone details at add-to-cart to recover lost sales. BoostACart helps Shopify stores
            convert high-intent shoppers before they abandon checkout.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Start Capturing Cart Leads
            </Link>
            <Link
              href="/setup/shopify"
              className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold text-lg shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-sm hover:border-white/30"
            >
              View Setup Guide
            </Link>
          </div>
        </div>
      </section>

      {/* Why Shopify Stores Need Cart Recovery */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Why Shopify Stores Need Cart Recovery
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Many Shopify stores lose shoppers between Add-to-Cart and Checkout. BoostACart solves this by capturing
              contact details before the customer leaves your store. This gives you the ability to follow up through
              WhatsApp, SMS, or email to recover lost sales.
            </p>
          </div>
        </div>
      </section>

      {/* How BoostACart Works for Shopify */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How BoostACart Works for Shopify</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Simple 5-step process to capture leads and recover lost sales from your Shopify store
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
              <ol className="space-y-6 text-white/80">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    1
                  </span>
                  <span className="pt-2 text-lg">Shopper clicks Add-to-Cart</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    2
                  </span>
                  <span className="pt-2 text-lg">BoostACart displays a small popup or widget</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    3
                  </span>
                  <span className="pt-2 text-lg">Customer enters email or phone number</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    4
                  </span>
                  <span className="pt-2 text-lg">Lead is saved instantly</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    5
                  </span>
                  <span className="pt-2 text-lg">Store owner follows up and recovers the sale</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Shopify Stores */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Benefits for Shopify Stores</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Everything you need to recover abandoned carts and increase sales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Recover lost carts before checkout
              </h3>
              <p className="text-base text-white/60 leading-relaxed">
                Capture shoppers at the add-to-cart moment, before they have a chance to abandon their purchase.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-300">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Increase sales without increasing ad spend
              </h3>
              <p className="text-base text-white/60 leading-relaxed">
                Get more value from your existing traffic by converting more visitors into paying customers.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Capture high-intent shoppers earlier
              </h3>
              <p className="text-base text-white/60 leading-relaxed">
                Target customers when their purchase intent is highest - right at the add-to-cart moment.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Follow up via WhatsApp, SMS, or email
              </h3>
              <p className="text-base text-white/60 leading-relaxed">
                Reach customers on their preferred channels with personalized recovery messages.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-teal-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 transition-all duration-300">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Easy setup and simple interface
              </h3>
              <p className="text-base text-white/60 leading-relaxed">
                Install BoostACart on your Shopify store in minutes with our step-by-step setup guide.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-6 text-white shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Real-time lead capture and tracking
              </h3>
              <p className="text-base text-white/60 leading-relaxed">
                See every lead as it comes in and track your recovery rate from your dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why BoostACart is Better */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-indigo-500/10 to-rose-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Why BoostACart is Better</h2>
            <p className="text-lg text-white/70 leading-relaxed text-center">
              Traditional cart recovery tools try to save customers after they abandon checkout. BoostACart works
              earlier in the process — at Add-to-Cart — capturing leads when intent is highest and conversion chances
              are strongest.
            </p>
          </div>
        </div>
      </section>

      {/* Beta Notice & CTA */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Recover More Shopify Carts?</h3>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Join Shopify stores already capturing more leads and recovering lost sales with BoostACart
            </p>
            <div className="bg-blue-500/10 backdrop-blur-sm p-4 rounded-xl border border-blue-400/20 mb-8">
              <p className="text-base text-blue-300 italic">
                BoostACart is currently in beta. Early Shopify users get priority support and feature access.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                Start Capturing Cart Leads
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold text-lg shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-sm hover:border-white/30"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="text-blue-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">BoostACart</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6">
              <Link href="/setup" className="text-white/60 hover:text-white transition-colors">
                Setup Guide
              </Link>
              <Link href="/setup/shopify" className="text-white/60 hover:text-white transition-colors">
                Shopify Setup
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                Contact Us
              </Link>
              <Link href="/auth/sign-up" className="text-white/60 hover:text-white transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
          <div className="text-center text-white/40 text-sm mt-8">© 2025 BoostACart. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}
