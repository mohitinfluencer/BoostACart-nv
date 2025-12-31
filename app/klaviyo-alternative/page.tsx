import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Best Klaviyo Alternative — Better Pre-Checkout Recovery Option",
  description:
    "BoostACart vs Klaviyo: Learn how capturing leads at Add-to-Cart recovers more lost sales than post-checkout email tools.",
}

export default function KlaviyoAlternativePage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-pink-500/10 border border-pink-500/20 rounded-full backdrop-blur-sm">
            <span className="text-pink-400 font-medium text-sm">Alternative Solution</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Best Klaviyo <br />
            <span className="bg-gradient-to-r from-pink-400 via-rose-500 to-red-500 bg-clip-text text-transparent">
              Alternative
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            BoostACart captures leads earlier than Klaviyo. While Klaviyo focuses on email after checkout, BoostACart
            also captures WhatsApp and SMS at Add-to-Cart.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Try BoostACart Free
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

      {/* Problem Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Problem With Traditional Cart Recovery
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Klaviyo is powerful for email marketing but only captures data after checkout abandonment. Shoppers who
              abandon at Add-to-Cart stage are never entered into Klaviyo flows. BoostACart works earlier — capturing
              phone and email before customers even reach checkout, then following up across WhatsApp, SMS, and email.
            </p>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-rose-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Why BoostACart Is Different</h2>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                <span className="text-lg">
                  <strong className="text-white">Captures at Add-to-Cart</strong> — before checkout stage
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                <span className="text-lg">
                  <strong className="text-white">Multiple channels</strong> — WhatsApp + SMS + email
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-pink-400 flex-shrink-0 mt-1" />
                <span className="text-lg">
                  <strong className="text-white">Faster setup</strong> — no technical expertise required
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* When Still Good Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">When Klaviyo Is Still Good</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Klaviyo excels for email personalization and has powerful segmentation tools. If you need advanced email
              flows and customer profiling, Klaviyo is excellent. But Klaviyo alone misses pre-checkout abandoners. Many
              successful stores use BoostACart for pre-checkout capture and then sync recovered customers to Klaviyo for
              nurturing.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-pink-600/20 to-rose-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Capture Pre-Checkout Leads?</h3>
            <p className="text-lg text-white/70 mb-8">
              Start recovering sales from high-intent shoppers before they abandon
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-xl hover:from-pink-700 hover:to-rose-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                Try BoostACart Free
              </Link>
              <Link
                href="/cart-recovery-tool-for-shopify"
                className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold text-lg shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-sm hover:border-white/30"
              >
                Learn More
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
              <ShoppingCart className="w-6 h-6 text-pink-400" />
              <span className="text-xl font-bold">BoostACart</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/cart-recovery-tool-for-shopify" className="text-white/60 hover:text-white transition-colors">
                Cart Recovery Tools
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
