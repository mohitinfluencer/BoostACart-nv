import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Cart Recovery for High Ticket Stores – BoostACart",
  description:
    "BoostACart helps high-ticket eCommerce stores recover lost carts by capturing shopper contact details at add-to-cart and enabling WhatsApp, SMS, and email follow-ups.",
}

export default function CartRecoveryHighTicketStoresPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#1a1405] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full backdrop-blur-sm">
            <span className="text-amber-400 font-medium text-sm">Premium Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Cart Recovery for
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">
              High Ticket Stores
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            High-ticket stores lose valuable revenue when shoppers abandon carts before checkout. BoostACart captures
            email and phone details at Add-to-Cart so you can follow up and recover sales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Start Cart Recovery
            </Link>
            <Link
              href="/"
              className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold text-lg shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-sm hover:border-white/30"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Why High Ticket Stores Need Cart Recovery */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Why High Ticket Stores Need Cart Recovery
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              High ticket and high AOV stores rely on a smaller number of purchases. Losing even a few carts can hurt
              revenue significantly. BoostACart helps recover these opportunities by capturing contact details earlier
              in the buying journey.
            </p>
          </div>
        </div>
      </section>

      {/* How BoostACart Works for High AOV Stores */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How BoostACart Works for High AOV Stores</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Capture and convert high-value shoppers with a proven process
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
              <ol className="space-y-6 text-white/80">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/25">
                    1
                  </span>
                  <span className="pt-2 text-lg">Shopper clicks Add-to-Cart</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/25">
                    2
                  </span>
                  <span className="pt-2 text-lg">BoostACart displays a popup or widget</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/25">
                    3
                  </span>
                  <span className="pt-2 text-lg">Shopper enters contact details</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/25">
                    4
                  </span>
                  <span className="pt-2 text-lg">Store captures the lead instantly</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-amber-500/25">
                    5
                  </span>
                  <span className="pt-2 text-lg">Merchant follows up and recovers the sale</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for High Ticket Stores */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Benefits for High Ticket Stores</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">Maximize revenue recovery from premium customers</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
              <ul className="space-y-5 text-white/80">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Recover more revenue from fewer customers</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Capture high-intent shoppers earlier</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Increase conversion without extra ad spend</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Follow up using WhatsApp, SMS, or email</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Works with multiple store platforms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why BoostACart Works Better */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Why BoostACart Works Better</h2>
            <p className="text-lg text-white/70 leading-relaxed text-center">
              Traditional recovery tools act after checkout abandonment. BoostACart activates earlier — capturing leads
              at Add-to-Cart where intent is strongest.
            </p>
            <div className="mt-8 text-center">
              <Link
                href="/shopify-cart-recovery"
                className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors font-semibold"
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Recover High-Value Sales?</h3>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Join premium stores already using BoostACart to maximize revenue from every cart
            </p>
            <div className="bg-amber-500/10 backdrop-blur-sm p-4 rounded-xl border border-amber-400/20 mb-8">
              <p className="text-base text-amber-300 italic">
                BoostACart is currently in beta. High ticket stores get priority access and support.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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
              <div className="text-amber-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">BoostACart</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/shopify-cart-recovery" className="text-white/60 hover:text-white transition-colors">
                Shopify Recovery
              </Link>
              <Link href="/setup/shopify" className="text-white/60 hover:text-white transition-colors">
                Setup Guide
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
