import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Cart Recovery Tool Alternative – BoostACart",
  description:
    "BoostACart captures email and phone numbers at Add-to-Cart and follows up through WhatsApp, SMS, and email to recover lost sales.",
}

export default function CartRecoveryToolAlternativePage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-lime-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-lime-500/10 border border-lime-500/20 rounded-full backdrop-blur-sm">
            <span className="text-lime-400 font-medium text-sm">Best Alternative</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Cart Recovery Tool
            <br />
            <span className="bg-gradient-to-r from-lime-400 via-green-500 to-emerald-500 bg-clip-text text-transparent">
              Alternative
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            Most cart recovery happens only after checkout. BoostACart captures leads the moment shoppers click
            Add-to-Cart, then follows up automatically using WhatsApp, SMS or email.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl hover:from-lime-700 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-lime-500/25 hover:shadow-lime-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Try BoostaCart Free
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

      {/* Why This Works */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Why This Works</h2>
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <ul className="space-y-5 text-white/80">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
                <span className="text-lg">Capture leads before checkout</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
                <span className="text-lg">Remind shoppers automatically</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
                <span className="text-lg">Recover lost revenue without discounts</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-lime-400 flex-shrink-0 mt-1" />
                <span className="text-lg">Simple setup, no coding</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who This Helps */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Who This Helps</h2>
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
            <p className="text-lg text-white/80 text-center leading-relaxed">
              Dropshipping stores, Shopify owners, ecommerce beginners, and DTC brands.
            </p>
          </div>
        </div>
      </section>

      {/* Example Use Case */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Example Use Case</h2>
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
            <p className="text-lg text-white/80 text-center leading-relaxed">
              Visitor clicks Add-to-Cart → lead captured → automated follow-up → recovered order.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-lime-500/10 to-green-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <p className="text-white/80 text-center mb-6">
              Explore more ways to recover lost sales and capture customer data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors font-semibold"
              >
                Back to homepage
                <span className="text-xl">→</span>
              </Link>
              <span className="hidden sm:block text-white/30">•</span>
              <Link
                href="/cart-recovery-tool-for-shopify"
                className="inline-flex items-center gap-2 text-lime-400 hover:text-lime-300 transition-colors font-semibold"
              >
                Learn more about cart recovery
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-lime-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-lime-600/20 to-green-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Try the Better Alternative?</h3>
            <p className="text-lg text-white/70 mb-6 leading-relaxed">
              BoostACart provides better cart recovery with early-stage lead capture and multi-channel followup.
            </p>
            <div className="bg-lime-500/10 backdrop-blur-sm p-4 rounded-xl border border-lime-400/20 mb-8">
              <p className="text-base text-lime-300 italic">
                BoostACart is currently in beta. Get priority access and support.
              </p>
            </div>
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-lime-600 to-green-600 text-white rounded-xl hover:from-lime-700 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-lime-500/25 hover:shadow-lime-500/40 transform hover:-translate-y-0.5 inline-flex items-center justify-center"
            >
              Try BoostaCart Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="text-lime-400">
                <ShoppingCart className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold">BoostACart</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/cart-recovery-tool-for-shopify" className="text-white/60 hover:text-white transition-colors">
                Cart Recovery
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
