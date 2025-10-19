"use client"
import Link from "next/link"
import { HeroGeometric } from "@/components/ui/shape-landing-hero"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { getWhatsAppLink } from "@/lib/whatsapp"
import { MessageCircle } from "lucide-react"

const ShoppingCartIcon = () => (
  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M9 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM20.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
    />
  </svg>
)

const ZapIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const TrendingUpIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const UsersIcon = () => (
  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const CheckIcon = () => (
  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
)

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030303] overflow-x-hidden">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <div className="text-blue-400">
                <ShoppingCartIcon />
              </div>
              <span className="text-2xl font-bold text-white">BoostACart</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/contact"
                className="px-4 py-2 text-white/80 hover:text-blue-400 font-medium transition-colors border border-white/20 rounded-lg hover:border-blue-400/50 hover:bg-white/5 backdrop-blur-sm"
              >
                Contact Us
              </Link>
              <Link href="/auth/login" className="text-white/70 hover:text-white transition-colors">
                Sign In
              </Link>
              <Link
                href="/auth/sign-up"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                Get Started
              </Link>
            </div>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <button
                    aria-label="Open menu"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 transition-colors"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="text-sm">Menu</span>
                  </button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#030303]/95 border-white/10">
                  <SheetHeader>
                    <SheetTitle className="text-white">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className="w-full px-4 py-3 text-white/80 hover:text-blue-400 font-medium transition-colors border border-white/20 rounded-lg hover:border-blue-400/50 hover:bg-white/5 backdrop-blur-sm text-center"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/auth/login"
                      className="w-full px-4 py-3 text-white/80 hover:text-white transition-colors border border-white/20 rounded-lg hover:border-white/30 text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      href="/auth/sign-up"
                      className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-center"
                    >
                      Get Started
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroGeometric badge="Lead Generation Platform" title1="Stop Losing Sales to" title2="Abandoned Carts" />

      {/* Action Buttons Section */}
      <section className="py-16 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent"></div>
        <div className="max-w-4xl mx-auto text-center px-4 relative">
          <p className="text-xl text-white/70 mb-8 leading-relaxed">
            Most visitors click Add to Cart but leave before checkout. BoostACart captures their details instantly, so
            you can follow up and recover lost sales.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5 flex items-center justify-center"
            >
              Start Free Trial
            </Link>
            <a
              href="https://youtu.be/udfKevSEDhw"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold text-lg shadow-lg border border-white/20 flex items-center justify-center backdrop-blur-sm hover:border-white/30"
            >
              Watch Video
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-xl text-white/60 max-w-3xl mx-auto px-2">
              Simple 3-step process to turn abandoned carts into valuable leads
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300">
                <ZapIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">
                Lead Capture at Add-to-Cart
              </h3>
              <p className="text-xs sm:text-base text-white/60 leading-relaxed">
                Customer clicks Add to Cart → BoostACart widget pops up and never lose anonymous shoppers again.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white shadow-lg shadow-green-500/25 group-hover:shadow-green-500/40 transition-all duration-300">
                <TrendingUpIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Customizable Widget</h3>
              <p className="text-xs sm:text-base text-white/60 leading-relaxed">
                Collects Name, Email, or Phone → customer details saved in your dashboard. Change text, colors, and
                design to match your brand.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white shadow-lg shadow-purple-500/25 group-hover:shadow-purple-500/40 transition-all duration-300">
                <UsersIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Smart Dashboard</h3>
              <p className="text-xs sm:text-base text-white/60 leading-relaxed">
                Redirects to Checkout or Shows Discount → you keep them moving towards purchase. Track leads, monthly
                limits, and plan status.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-orange-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white shadow-lg shadow-orange-500/25 group-hover:shadow-orange-500/40 transition-all duration-300">
                <ShoppingCartIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Exit-Intent Popup</h3>
              <p className="text-xs sm:text-base text-white/60 leading-relaxed">
                Catch visitors before they leave your store and turn them into leads you can follow up with.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-teal-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white shadow-lg shadow-teal-500/25 group-hover:shadow-teal-500/40 transition-all duration-300">
                <TrendingUpIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Follow-Up Ready</h3>
              <p className="text-xs sm:text-base text-white/60 leading-relaxed">
                Export leads for WhatsApp, SMS, or sales calls. Increase conversions by 20–30% and reduce cost per
                purchase.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-white/10 hover:border-indigo-500/30 transition-all duration-300 hover:bg-white/10 group">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6 text-white shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-all duration-300">
                <ZapIcon />
              </div>
              <h3 className="text-base sm:text-xl font-semibold text-white mb-3 sm:mb-4">Why BoostACart?</h3>
              <p className="text-xs sm:text-base text-white/60 leading-relaxed">
                Ad spend is expensive. Purchases are fewer than Add-to-Carts. Without customer details, you can't
                recover those carts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-12 sm:py-20 bg-[#030303] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              Choose the plan that fits your store
            </h2>
            <p className="text-base sm:text-xl text-white/60">Capture more leads from the same ad budget</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Free Plan</h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$0</div>
                <p className="text-white/60 text-sm sm:text-base">Try it risk-free</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">Up to 100 leads/month</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">Basic analytics</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">Email support</span>
                </li>
              </ul>
              <Link
                href="/auth/sign-up"
                className="w-full py-2 sm:py-3 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium text-center block border border-white/20 hover:border-white/30 backdrop-blur-sm text-sm sm:text-base"
              >
                Start Free Trial
              </Link>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-blue-500/50 shadow-xl relative hover:border-blue-400 transition-all duration-300">
              <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Starter Plan</h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$29</div>
                <p className="text-white/60 text-sm sm:text-base">For growing stores</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">1,000 leads per month</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">Advanced analytics</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">Priority support</span>
                </li>
              </ul>
              <a
                href={getWhatsAppLink("918303208502", "pricing")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 sm:py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium text-center block shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm sm:text-base"
              >
                Start Free Trial
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
              <div className="text-center mb-6 sm:mb-8">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Pro Plan</h3>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">$99</div>
                <p className="text-white/60 text-xs sm:text-base">For scaling brands with heavy traffic</p>
              </div>
              <ul className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">Unlimited leads</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">Custom integrations</span>
                </li>
                <li className="flex items-center">
                  <div className="text-green-400">
                    <CheckIcon />
                  </div>
                  <span className="text-white/80 ml-3 text-sm sm:text-base">Dedicated support</span>
                </li>
              </ul>
              <a
                href={getWhatsAppLink("918303208502", "upgrade")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 sm:py-3 px-4 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium text-center block border border-white/20 hover:border-white/30 backdrop-blur-sm text-sm sm:text-base"
              >
                Contact Sales
              </a>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-16">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4">Still on the fence?</h3>
            <p className="text-base sm:text-xl text-white/70 mb-6 sm:mb-8">
              Try BoostACart free and see how many sales you recover this week.
            </p>
            <Link
              href="/auth/sign-up"
              className="inline-flex px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-semibold text-base sm:text-lg shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:-translate-y-0.5"
            >
              Start Free Trial →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div className="mt-8 sm:mt-12 text-center">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm p-6 sm:p-8 rounded-2xl text-white border border-white/10">
          <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ready to Boost Your Cart Conversions?</h3>
          <p className="text-sm sm:text-base text-white/70 mb-4 sm:mb-6">
            Join thousands of stores already capturing more leads with BoostACart
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href="/auth/sign-up"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium border border-white/20 hover:border-white/30 backdrop-blur-sm text-sm sm:text-base"
            >
              Start Free Trial
            </Link>
            <a
              href={getWhatsAppLink("918303208502", "demo")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium flex items-center justify-center space-x-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 text-sm sm:text-base"
            >
              <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0" />
              <span>Get Personal Demo</span>
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-sm text-white py-8 sm:py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="flex items-center space-x-2 mb-4 sm:mb-0">
              <div className="text-blue-400">
                <ShoppingCartIcon />
              </div>
              <span className="text-lg sm:text-xl font-bold">BoostACart</span>
            </div>
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6">
              <Link href="/setup" className="text-white/60 hover:text-white transition-colors text-sm sm:text-base">
                Setup Guide
              </Link>
              <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-sm sm:text-base">
                Contact Us
              </Link>
              <Link
                href="/auth/login"
                className="text-white/60 hover:text-white transition-colors text-sm sm:text-base"
              >
                Sign In
              </Link>
            </div>
          </div>
          <div className="border-t border-white/10 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-white/40 text-xs sm:text-base">
            <p>© 2025 BoostACart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
