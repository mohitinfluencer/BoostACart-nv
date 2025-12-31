import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, CheckCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Best Recart Alternative — Better Pre-Checkout Recovery Option",
  description:
    "BoostACart vs Recart: See how capturing leads at Add-to-Cart recovers more lost sales than post-checkout recovery tools.",
}

export default function RecartAlternativePage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-sm">
            <span className="text-orange-400 font-medium text-sm">Alternative Solution</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Best Recart <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Alternative
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            BoostACart captures leads earlier than Recart. While Recart focuses on post-checkout recovery, BoostACart
            starts at Add-to-Cart when intent is highest.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">
              Problem With Traditional Cart Recovery
            </h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Most recovery tools like Recart focus only on customers who completed the checkout page. But many shoppers
              abandon before they ever reach checkout — at Add-to-Cart. By then, it's too late. These high-intent
              shoppers are lost forever. BoostACart captures them earlier in the funnel before they disappear.
            </p>
          </div>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-orange-500/10 to-amber-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">Why BoostACart Is Different</h2>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <span className="text-lg">
                  <strong className="text-white">Captures at Add-to-Cart</strong> — not after checkout abandonment
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <span className="text-lg">
                  <strong className="text-white">Follows up via WhatsApp, SMS, email</strong> — multiple touchpoints for
                  recovery
                </span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <span className="text-lg">
                  <strong className="text-white">Reaches intent-rich shoppers</strong> — before they lose interest
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
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 text-center">When Recart Is Still Good</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              Recart is excellent for stores that need dedicated SMS and post-checkout recovery. If your focus is only
              on customers who reach the checkout page, Recart does that well. But if you want to capture the 40%+ of
              shoppers who abandon before checkout, BoostACart is the better choice. Many stores use both tools
              together.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-orange-600/20 to-amber-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Capture More Leads?</h3>
            <p className="text-lg text-white/70 mb-8">
              Start recovering sales from shoppers who abandon before checkout
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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
              <ShoppingCart className="w-6 h-6 text-orange-400" />
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
