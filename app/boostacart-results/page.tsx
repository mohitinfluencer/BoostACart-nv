import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, Check, Calendar } from "lucide-react"

export const metadata: Metadata = {
  title: "BoostaCart Results — What Happens After You Install",
  description: "Summary of results merchants see after adding BoostACart to their store.",
}

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            BoostACart
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400 bg-clip-text text-transparent">
              Results
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            What happens after you install BoostACart in your store
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your Timeline to Results</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">Here's what you can expect week by week</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Week 1 */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-8 h-8 text-orange-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Week 1</h3>
                    <p className="text-white/70 text-lg">Install + lead capture enabled</p>
                    <p className="text-white/60 mt-2">
                      BoostACart is live on your store. The widget starts showing to visitors at add-to-cart.
                    </p>
                  </div>
                </div>
              </div>

              {/* Week 2 */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-8 h-8 text-orange-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Week 2</h3>
                    <p className="text-white/70 text-lg">First follow-ups go out</p>
                    <p className="text-white/60 mt-2">
                      You've captured your first leads. WhatsApp, SMS, and email follow-ups start reaching customers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Week 3 */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-8 h-8 text-orange-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Week 3</h3>
                    <p className="text-white/70 text-lg">First recovered orders appear</p>
                    <p className="text-white/60 mt-2">
                      Customers are responding. You start seeing recovered orders and revenue from leads you almost
                      lost.
                    </p>
                  </div>
                </div>
              </div>

              {/* Week 4+ */}
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-orange-400/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <Calendar className="w-8 h-8 text-orange-400 mt-1" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Week 4+</h3>
                    <p className="text-white/70 text-lg">Compounding results as lists grow</p>
                    <p className="text-white/60 mt-2">
                      Your lead list continues to grow. More follow-ups, more recovered orders, and consistent revenue
                      from cart recovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typical Improvements */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Typical Improvements</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">What you can expect to see in your store</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
              <ul className="space-y-5 text-white/80">
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">More customer conversations</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Fewer abandoned carts</span>
                </li>
                <li className="flex items-start gap-4">
                  <Check className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                  <span className="text-lg">Consistent recovered revenue</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-orange-600/20 to-amber-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Start Your Results Journey</h3>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Join merchants already recovering sales with BoostACart
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white rounded-xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="text-orange-400">
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
                Setup
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
