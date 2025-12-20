import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Cart Recovery for Dropshipping Stores – BoostACart",
  description:
    "BoostACart helps dropshipping stores recover lost carts by capturing shopper contact details at add-to-cart and following up through WhatsApp, SMS, and email.",
}

export default function CartRecoveryForDropshippingPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
            <span className="text-purple-400 font-medium text-sm">Dropshipping Solutions</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Cart Recovery for
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Dropshipping Stores
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            Dropshippers lose a high volume of carts before checkout. BoostACart captures email and phone details at
            add-to-cart so you can follow up and recover sales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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

      {/* Why Dropshipping Stores Lose Carts */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Why Dropshipping Stores Lose Carts
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Dropshipping stores rely heavily on paid traffic from TikTok, Facebook, and Instagram. When shoppers click
              Add-to-Cart but leave before checkout, those ad dollars are wasted. BoostACart helps recover these
              shoppers before they disappear.
            </p>
          </div>
        </div>
      </section>

      {/* How BoostACart Works for Dropshippers */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">How BoostACart Works for Dropshippers</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Simple process to capture high-intent leads from paid traffic
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
              <ol className="space-y-6 text-white/80">
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/25">
                    1
                  </span>
                  <span className="pt-2 text-lg">Shopper clicks Add-to-Cart</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/25">
                    2
                  </span>
                  <span className="pt-2 text-lg">BoostACart displays a popup or widget</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/25">
                    3
                  </span>
                  <span className="pt-2 text-lg">Shopper enters email or phone number</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/25">
                    4
                  </span>
                  <span className="pt-2 text-lg">Lead is saved instantly</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-purple-500/25">
                    5
                  </span>
                  <span className="pt-2 text-lg">Merchant follows up to recover the sale</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits for Dropshipping Stores */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Benefits for Dropshipping Stores</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Maximize ROI on paid traffic and recover more sales
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
              <ul className="space-y-5 text-white/80">
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Recover sales without spending more on ads</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Capture high-intent shoppers early</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Follow up via WhatsApp, SMS, or email</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Works with Shopify, WooCommerce, and other platforms</span>
                </li>
                <li className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Simple setup and fast results</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why BoostACart Is Better */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Why BoostACart Is Better</h2>
            <p className="text-lg text-white/70 leading-relaxed text-center">
              Most recovery apps trigger after checkout abandonment. BoostACart works earlier in the funnel — at
              Add-to-Cart — capturing leads when intent is highest.
            </p>
            <div className="mt-8 text-center">
              <Link
                href="/shopify-cart-recovery"
                className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-semibold"
              >
                Learn about Shopify cart recovery
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Beta Notice & CTA */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Recover Your Lost Sales?</h3>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              Join dropshipping stores already using BoostACart to maximize ROI on paid traffic
            </p>
            <div className="bg-purple-500/10 backdrop-blur-sm p-4 rounded-xl border border-purple-400/20 mb-8">
              <p className="text-base text-purple-300 italic">
                BoostACart is currently in beta. Dropshipping users get priority access and support.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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
              <div className="text-purple-400">
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
