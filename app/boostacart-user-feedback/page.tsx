import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart, Quote } from "lucide-react"

export const metadata: Metadata = {
  title: "What Store Owners Say About BoostACart",
  description:
    "Real feedback from store owners using BoostACart to recover abandoned carts and capture leads at add-to-cart.",
}

export default function UserFeedbackPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f12_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f12_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Store Owner
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Feedback
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 leading-relaxed max-w-3xl mx-auto">
            Hear what store owners are saying about their experience using BoostACart to capture leads and recover
            sales.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Try BoostACart Free
            </Link>
          </div>
        </div>
      </section>

      {/* Feedback Cards */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">What Store Owners Are Saying</h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">Real feedback from merchants using BoostACart</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <Quote className="w-8 h-8 text-blue-400 flex-shrink-0" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Easy to Install</h3>
              <p className="text-white/70 leading-relaxed">
                I was expecting a complex setup, but BoostACart was ready to go in minutes. The widget integrated
                seamlessly with my Shopify store without any code changes.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <Quote className="w-8 h-8 text-blue-400 flex-shrink-0" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Recovered My First Sale</h3>
              <p className="text-white/70 leading-relaxed">
                Within the first week, I captured my first customer contact. By week two, I had recovered an order I
                would have definitely lost. This paid for itself immediately.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <Quote className="w-8 h-8 text-blue-400 flex-shrink-0" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Loved WhatsApp Automation</h3>
              <p className="text-white/70 leading-relaxed">
                The WhatsApp integration is a game-changer. Customers respond faster to messages than emails, and I can
                automate most of the follow-up without lifting a finger.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-blue-400/30 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <Quote className="w-8 h-8 text-blue-400 flex-shrink-0" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Great for Dropshipping Stores</h3>
              <p className="text-white/70 leading-relaxed">
                Running a dropshipping store means I need to maximize every conversion. BoostACart helps me capture
                high-intent customers before they disappear, saving my ad spend.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Join Store Owners Already Seeing Results</h3>
            <p className="text-lg text-white/70 mb-8 leading-relaxed">
              Start capturing leads at add-to-cart and recover more sales today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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
