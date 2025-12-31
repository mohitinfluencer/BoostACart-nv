import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart } from "lucide-react"

export const metadata: Metadata = {
  title: "BoostaCart vs CartLoop — Which Recovers More Carts?",
  description:
    "Honest comparison of BoostACart and CartLoop. Learn which tool captures leads earlier and recovers more lost carts.",
}

export default function BoostACartVsCartLoopPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            BoostaCart vs CartLoop
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
              Both BoostACart and CartLoop are recovery tools, but they operate at different stages and price points.
              This comparison helps you choose the right fit.
            </p>
          </div>
        </div>
      </section>

      {/* Key Difference Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Key Difference</h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              <strong className="text-white">BoostACart</strong> captures email and phone at Add-to-Cart and supports
              WhatsApp, SMS, and email.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              <strong className="text-white">CartLoop</strong> focuses deeply on SMS and email recovery after checkout
              with advanced Shopify integrations.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mt-6">
              BoostACart is earlier and more affordable; CartLoop is more comprehensive but at higher cost.
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
                <strong className="text-white">BoostACart:</strong> At Add-to-Cart (earliest)
              </p>
              <p className="text-white/70">
                <strong className="text-white">CartLoop:</strong> At and after checkout
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">WhatsApp Support</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Yes, included
              </p>
              <p className="text-white/70">
                <strong className="text-white">CartLoop:</strong> Yes, optional add-on
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">SMS & Email</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Both included
              </p>
              <p className="text-white/70">
                <strong className="text-white">CartLoop:</strong> Both included, very advanced
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Shopify Integration</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Works with Shopify and others
              </p>
              <p className="text-white/70">
                <strong className="text-white">CartLoop:</strong> Deep native Shopify integration
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Price</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Significantly more affordable
              </p>
              <p className="text-white/70">
                <strong className="text-white">CartLoop:</strong> Premium pricing, $500+ per month
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Use Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Who Should Use Which?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-purple-400 mb-6">Choose BoostACart If:</h3>
              <ul className="space-y-3 text-white/70">
                <li>• You're budget-conscious but want effective recovery</li>
                <li>• You want to capture Add-to-Cart abandoners</li>
                <li>• You need WhatsApp as a primary channel</li>
                <li>• You want simple setup and fast results</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-pink-400 mb-6">Choose CartLoop If:</h3>
              <ul className="space-y-3 text-white/70">
                <li>• You have high monthly revenue (500k+) to justify cost</li>
                <li>• You need advanced SMS and email automation</li>
                <li>• You want deep Shopify-only integration</li>
                <li>• You need enterprise-level support</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
            <p className="text-lg text-white/70">
              <strong className="text-white">Value Comparison:</strong> For stores under 1M revenue, BoostACart delivers
              80% of CartLoop's results at 20% of the cost. For large high-volume stores, CartLoop's advanced features
              justify the investment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Recover More Carts?</h3>
            <p className="text-lg text-white/70 mb-8">
              Try BoostACart free and see how much revenue you can recover without breaking the bank.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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
              <ShoppingCart className="w-6 h-6 text-purple-400" />
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
