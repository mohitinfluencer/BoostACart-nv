import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Cart Recovery Tool for Shopify – BoostACart",
  description:
    "BoostACart is a cart recovery tool for Shopify that captures leads at add-to-cart and helps store owners recover lost sales through WhatsApp, SMS, and email follow-ups.",
}

export default function CartRecoveryToolForShopifyPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-sm">
            <span className="text-blue-400 font-medium text-sm">Shopify Cart Recovery</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Cart Recovery Tool for
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Shopify Stores
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            BoostACart helps Shopify stores capture shopper contact details at the Add-to-Cart stage, giving merchants
            the power to follow up and recover lost carts before checkout abandonment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Start Cart Recovery
            </Link>
            <Link
              href="/"
              className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold text-lg shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-sm hover:border-white/30"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Why Shopify Needs Cart Recovery */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Why Shopify Needs Cart Recovery
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Shopify stores lose a large percentage of potential sales between Add-to-Cart and Checkout. By capturing
              contact information early, BoostACart gives store owners the opportunity to follow up through WhatsApp,
              SMS, or email — turning abandoned carts into recovered revenue.
            </p>
          </div>
        </div>
      </section>

      {/* How BoostACart Works for Shopify Stores */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How BoostACart Works for Shopify Stores</h2>
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
                  <span className="pt-2 text-lg">A shopper clicks Add-to-Cart</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    2
                  </span>
                  <span className="pt-2 text-lg">BoostACart displays a popup or widget</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    3
                  </span>
                  <span className="pt-2 text-lg">Shopper enters email or phone number</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    4
                  </span>
                  <span className="pt-2 text-lg">Store captures the lead instantly</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-500/25">
                    5
                  </span>
                  <span className="pt-2 text-lg">Merchant follows up to recover the sale</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Shopify Merchants */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Benefits for Shopify Merchants</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Everything you need to recover abandoned carts and increase sales
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
              <ul className="space-y-5 text-white/80">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Recover carts before checkout abandonment</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Increase sales without additional ad spend</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Capture high-intent shoppers earlier</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Follow up using multiple channels</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Easy setup and fast results</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why BoostACart Is Different */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Why BoostACart Is Different</h2>
            <p className="text-lg text-white/70 leading-relaxed text-center">
              Traditional cart recovery tools act after checkout abandonment. BoostACart captures leads at the
              Add-to-Cart moment, when purchase intent is highest and conversion chances are stronger.
            </p>
            <div className="mt-8 text-center">
              <Link
                href="/shopify-cart-recovery"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-semibold"
              >
                Learn more about Shopify cart recovery
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Notice & CTA */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Recovering Carts?</h3>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Join Shopify stores already using BoostACart to capture more leads and recover lost sales
            </p>
            <div className="bg-blue-500/10 backdrop-blur-sm p-4 rounded-xl border border-blue-400/20 mb-8">
              <p className="text-base text-blue-300 italic">
                BoostACart is currently in beta. Shopify users get priority support and feature access.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                Start Cart Recovery
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
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/shopify-cart-recovery" className="text-white/60 hover:text-white transition-colors">
                Cart Recovery
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
