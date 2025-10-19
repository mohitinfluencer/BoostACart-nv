import Link from "next/link"
import { MessageCircle, Mail, Phone, ArrowLeft } from "lucide-react"
import { getWhatsAppLink } from "@/lib/whatsapp"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 py-3 sm:py-0 sm:h-16">
            <Link
              href="/"
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="h-6 sm:h-8 w-6 sm:w-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
                <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold text-white">BoostACart</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-base sm:text-xl text-white/60 max-w-2xl mx-auto px-2">
            Need help with your BoostACart setup or have questions? We're here to help you maximize your lead
            generation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          {/* Contact Methods */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/25 flex-shrink-0">
                  <MessageCircle className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white">WhatsApp Support</h3>
                  <p className="text-xs sm:text-sm text-white/60">Get instant help via WhatsApp</p>
                </div>
              </div>
              <a
                href={getWhatsAppLink("918303208502", "support")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium flex items-center justify-center space-x-2 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 text-sm sm:text-base"
              >
                <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 flex-shrink-0">
                  <Mail className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white">Email Support</h3>
                  <p className="text-xs sm:text-sm text-white/60">Send us your questions</p>
                </div>
              </div>
              <a
                href="mailto:boostacart@gmail.com"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 text-sm sm:text-base break-all"
              >
                <Mail className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0" />
                <span>boostacart@gmail.com</span>
              </a>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
                <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/25 flex-shrink-0">
                  <Phone className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold text-white">Phone Support</h3>
                  <p className="text-xs sm:text-sm text-white/60">Call us directly</p>
                </div>
              </div>
              <a
                href="tel:+918303208502"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-300 font-medium flex items-center justify-center space-x-2 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 text-sm sm:text-base"
              >
                <Phone className="h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0" />
                <span>+91 8303208502</span>
              </a>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Frequently Asked Questions</h3>
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h4 className="font-medium text-white text-sm sm:text-base mb-1 sm:mb-2">How do I set up my widget?</h4>
                <p className="text-xs sm:text-sm text-white/60 mb-2">
                  After creating your account, go to the Dashboard and click on "Customization" to configure your widget
                  settings.
                </p>
                <Link
                  href="/setup"
                  className="text-blue-400 hover:text-blue-300 text-xs sm:text-sm font-medium transition-colors"
                >
                  View Setup Guide →
                </Link>
              </div>

              <div>
                <h4 className="font-medium text-white text-sm sm:text-base mb-1 sm:mb-2">How do I upgrade my plan?</h4>
                <p className="text-xs sm:text-sm text-white/60 mb-2">
                  Contact us via WhatsApp or email to discuss upgrading your plan and increasing your lead limits.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white text-sm sm:text-base mb-1 sm:mb-2">
                  Can I customize the widget appearance?
                </h4>
                <p className="text-xs sm:text-sm text-white/60">
                  Yes! You can customize colors, text, form fields, and discount codes in the Customization section of
                  your dashboard.
                </p>
              </div>

              <div>
                <h4 className="font-medium text-white text-sm sm:text-base mb-1 sm:mb-2">How do leads get captured?</h4>
                <p className="text-xs sm:text-sm text-white/60">
                  When visitors fill out your widget form, their information is automatically saved to your dashboard
                  for follow-up.
                </p>
              </div>
            </div>
          </div>
        </div>

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
      </div>
    </div>
  )
}
