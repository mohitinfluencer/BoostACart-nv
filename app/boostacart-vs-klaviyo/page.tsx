import Link from "next/link"
import type { Metadata } from "next"
import { ShoppingCart } from "lucide-react"

export const metadata: Metadata = {
  title: "BoostaCart vs Klaviyo — Which Recovers More Carts?",
  description:
    "Honest comparison of BoostACart and Klaviyo. Learn which tool captures leads earlier and recovers more lost carts.",
}

export default function BoostACartVsKlaviyoPage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            BoostaCart vs Klaviyo
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
              Both BoostACart and Klaviyo help recover lost sales, but they work at different stages of the customer
              journey. This comparison explains how they differ and which might be best for your store.
            </p>
          </div>
        </div>
      </section>

      {/* Key Difference Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">The Key Difference</h2>
            <p className="text-lg text-white/70 leading-relaxed mb-6">
              <strong className="text-white">BoostACart</strong> captures email and phone at Add-to-Cart stage, before
              checkout is even started.
            </p>
            <p className="text-lg text-white/70 leading-relaxed">
              <strong className="text-white">Klaviyo</strong> captures customer data primarily after checkout
              abandonment or through other email collection methods.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mt-6">
              This timing difference creates more recovery opportunities. BoostACart reaches customers while intent is
              highest.
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
                <strong className="text-white">BoostACart:</strong> At Add-to-Cart (earliest stage)
              </p>
              <p className="text-white/70">
                <strong className="text-white">Klaviyo:</strong> After checkout abandonment or through forms
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">WhatsApp Follow-ups</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Yes, included
              </p>
              <p className="text-white/70">
                <strong className="text-white">Klaviyo:</strong> No, email and SMS only
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">SMS Reminders</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Yes, included
              </p>
              <p className="text-white/70">
                <strong className="text-white">Klaviyo:</strong> Yes, but SMS is an add-on cost
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Ease of Setup</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> One-click installation, minimal configuration
              </p>
              <p className="text-white/70">
                <strong className="text-white">Klaviyo:</strong> More complex, requires email list management and flows
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">Price/Value</h3>
              <p className="text-white/70">
                <strong className="text-white">BoostACart:</strong> Simpler pricing, focused on add-to-cart recovery
              </p>
              <p className="text-white/70">
                <strong className="text-white">Klaviyo:</strong> More expensive at scale, but offers advanced email
                segmentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Should Use Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Who Should Use Which?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-blue-400 mb-6">Choose BoostACart If:</h3>
              <ul className="space-y-3 text-white/70">
                <li>• You want to capture early abandonners (at Add-to-Cart)</li>
                <li>• You need WhatsApp integration for customer communication</li>
                <li>• You want simple, fast setup with minimal configuration</li>
                <li>• You focus on high-volume pre-checkout recovery</li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-cyan-400 mb-6">Choose Klaviyo If:</h3>
              <ul className="space-y-3 text-white/70">
                <li>• You need advanced email segmentation and personalization</li>
                <li>• You want deep customer profiling and behavior tracking</li>
                <li>• You're willing to invest in complex automation flows</li>
                <li>• Email is your primary channel and you want control</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
            <p className="text-lg text-white/70">
              <strong className="text-white">Smart Strategy:</strong> Many high-performing stores use both. Use
              BoostACart to capture early abandoners with multiple channels (WhatsApp, SMS, email), then sync recovered
              customers to Klaviyo for long-term nurturing and personalization.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 backdrop-blur-sm p-8 sm:p-12 rounded-2xl text-white border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Recovering Carts?</h3>
            <p className="text-lg text-white/70 mb-8">
              Try BoostACart free and see how much revenue you can recover from early abandoners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/sign-up"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
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
              <ShoppingCart className="w-6 h-6 text-blue-400" />
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
