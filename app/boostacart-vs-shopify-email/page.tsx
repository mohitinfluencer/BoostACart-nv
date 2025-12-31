import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart } from "lucide-react"

export const metadata: Metadata = {
  title: "BoostaCart vs Shopify Email — Which Recovers More Carts?",
  description:
    "Honest comparison of BoostACart and Shopify Email. Learn which tool captures leads earlier and recovers more lost carts.",
}

export default function BoostACartVsShopifyEmailPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            BoostaCart vs Shopify Email
          </h1>
          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            A practical breakdown of how both tools work and who they're best for.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <p className="text-lg text-white/70 leading-relaxed">
              Both BoostACart and Shopify Email help recover lost sales, but they operate at different points in the
              customer journey. This guide explains how they differ and which is best for your store.
            </p>
          </div>
        </div>
      </section>

      {/* Key Difference Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Key Difference</h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              <strong className="text-white">BoostACart</strong> captures email and phone at Add-to-Cart stage and
              follows up across multiple channels (WhatsApp, SMS, email).
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              <strong className="text-white">Shopify Email</strong> is built into Shopify and primarily sends emails
              after checkout abandonment through native Shopify flows.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mt-6">
              BoostACart captures leads earlier and offers more communication channels, while Shopify Email is native
              and requires no third-party integration.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Comparison Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Feature Comparison</h2>

          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Lead Capture Timing</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> At Add-to-Cart (earliest opportunity)
              </p>
              <p className="text-white/70">
                <strong className="text-white">Shopify Email:</strong> After checkout abandonment
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">WhatsApp Follow-ups</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Yes, included
              </p>
              <p className="text-white/70">
                <strong className="text-white">Shopify Email:</strong> No, email only
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">SMS Reminders</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Yes, included
              </p>
              <p className="text-white/70">
                <strong className="text-white">Shopify Email:</strong> No, email only
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Setup Complexity</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Simple widget installation
              </p>
              <p className="text-white/70">
                <strong className="text-white">Shopify Email:</strong> Native to Shopify, minimal setup
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Cost</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Tiered pricing based on usage
              </p>
              <p className="text-white/70">
                <strong className="text-white">Shopify Email:</strong> Included free in Shopify plan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Use Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Who Should Use Which?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-green-400 mb-6">Choose BoostACart If:</h3>
              <ul className="space-y-3 text-white/70">
                <li>• You want to capture Add-to-Cart abandoners</li>
                <li>• You need WhatsApp and SMS in addition to email</li>
                <li>• You want to maximize recovery rate with multiple channels</li>
                <li>• You're willing to add a third-party tool for better results</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-emerald-400 mb-6">Choose Shopify Email If:</h3>
              <ul className="space-y-3 text-white/70">
                <li>• You want native Shopify integration with no setup</li>
                <li>• Email-only recovery is sufficient for your needs</li>
                <li>• You prefer keeping everything in Shopify</li>
                <li>• You want free email recovery without additional cost</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
            <p className="text-lg text-white/70">
              <strong className="text-white">Best Practice:</strong> Use Shopify Email for post-checkout flows (it's
              free and native), then add BoostACart on top to capture the 40%+ of abandoners who never reach checkout.
              This combination recovers significantly more revenue.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Recover More Carts?</h3>
            <p className="text-lg text-white/70 mb-8">
              Add BoostACart to your Shopify store and start capturing early abandoners your email alone is missing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ShoppingCart className="w-6 h-6 text-green-400" />
              <span className="text-xl font-bold">BoostACart</span>
            </Link>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 text-sm">
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
