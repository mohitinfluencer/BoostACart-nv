import Link from "next/link"
import type { Metadata } from "next"
import { CheckCircle, ShoppingCart } from "lucide-react"

export const metadata: Metadata = {
  title: "Case Study: Pre-Checkout Email Capture — BoostACart",
  description:
    "Real example showing how BoostACart recovers lost sales using pre-checkout lead capture and automated follow-ups.",
}

export default function CaseStudyPrecheckoutEmailCapturePage() {
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#030303] via-[#0a0a1f] to-[#030303]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-transparent to-transparent"></div>

        <div className="max-w-6xl mx-auto px-4 py-20 text-center relative z-10">
          <div className="inline-block mb-6 px-4 py-2 bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-sm">
            <span className="text-orange-400 font-medium text-sm">Case Study</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Pre-Checkout Email Capture <br />
            <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Doubled Recovery Rate
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-8 max-w-3xl mx-auto">
            This page explains how a store implemented BoostACart and what happened when leads were captured at
            Add-to-Cart instead of only after checkout.
          </p>
        </div>
      </section>

      {/* Setup Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Setup</h2>
            <p className="text-lg text-white/70 leading-relaxed">
              BoostACart was installed in minutes and configured to capture name, email, and phone at Add-to-Cart. The
              entire implementation took less than an hour, and the store was ready to start recovering leads
              immediately.
            </p>
          </div>
        </div>
      </section>

      {/* What Changed Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">What Changed</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Before */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-red-400 mb-6">Before BoostACart</h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Many users abandoned at Add-to-Cart stage</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>No way to contact shoppers who didn't complete checkout</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>High customer acquisition cost with low conversion</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 mt-1">✕</span>
                  <span>Lost revenue from shoppers who hesitated before checkout</span>
                </li>
              </ul>
            </div>

            {/* After */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10">
              <h3 className="text-2xl font-bold text-green-400 mb-6">After BoostACart</h3>
              <ul className="space-y-4 text-white/70">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Contacts saved automatically at Add-to-Cart</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Email follow-ups triggered immediately</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Recovery of interested shoppers previously lost</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Direct communication channel with high-intent buyers</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8 text-center">Results</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  2x
                </div>
                <p className="text-white/70">Recovery Rate</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  45%
                </div>
                <p className="text-white/70">Email Open Rate</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                  $8K+
                </div>
                <p className="text-white/70">Revenue Recovered</p>
              </div>
            </div>

            <p className="text-lg text-white/70 leading-relaxed text-center">
              More recovered orders, more customer conversations, and increased revenue without heavy discounts. Email
              capture proved to be a highly effective channel for recovering interested shoppers.
            </p>
          </div>
        </div>
      </section>

      {/* Inline CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Want to try this on your store?</h3>
            <p className="text-lg text-white/70 mb-6">Install BoostACart and start capturing leads at Add-to-Cart.</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5"
            >
              Try BoostACart Free
            </Link>
          </div>
        </div>
      </section>

      {/* Key Takeaways Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="max-w-4xl mx-auto px-4 relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">Key Takeaways</h2>

          <div className="bg-white/5 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-white/10">
            <ul className="space-y-5 text-white/80">
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <span className="text-lg">Capture leads earlier in the funnel when intent is highest</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <span className="text-lg">Automate reminders and follow-ups across multiple channels</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <span className="text-lg">Recover revenue from shoppers who leave before checkout</span>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-orange-400 flex-shrink-0 mt-1" />
                <span className="text-lg">Plug revenue leaks and improve customer acquisition ROI</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-red-900/5 to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative">
          <div className="bg-gradient-to-br from-red-500/10 to-orange-500/10 backdrop-blur-sm p-8 sm:p-12 rounded-2xl border border-white/10 text-center">
            <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">Recover lost revenue automatically</h3>
            <p className="text-lg text-white/70 mb-6">
              BoostACart follows up via WhatsApp, SMS and email to bring customers back.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-block px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-semibold text-lg shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transform hover:-translate-y-0.5"
            >
              Start Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm text-white py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <ShoppingCart className="w-6 h-6 text-orange-400" />
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
          <div className="text-center text-white/40 text-sm">© 2025 BoostACart. All rights reserved.</div>
        </div>
      </footer>
    </main>
  )
}
