import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "BoostaCart Reviews — Real Results from Store Owners",
  description: "See feedback and experiences from merchants using BoostACart to recover abandoned carts.",
}

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            BoostACart
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Reviews
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            Real stories, tests, and feedback from users as they try BoostACart to recover more sales.
          </p>
        </div>
      </section>

      {/* Highlighted Wins */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Store Owner Wins</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              Here's what store owners are experiencing with BoostACart
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
              <ul className="space-y-5 text-white/80">
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Recovered orders using WhatsApp reminders</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Email follow-up that brought shoppers back</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Captured leads before checkout</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Increased revenue without ads</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Join Them?</h3>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Start capturing leads at add-to-cart and recover more sales
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transform hover:-translate-y-0.5"
            >
              Try BoostACart Free
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="text-green-400">
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
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center text-white/40 text-sm mt-8">© 2025 BoostACart. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}
