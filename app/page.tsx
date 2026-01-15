import Link from "next/link"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d1b2a] to-[#1b263b]">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="https://boostacaartt.netlify.app/" className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">BoostACart</span>
            </Link>

            {/* Navigation */}
            <nav className="flex items-center gap-4">
              <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                <Link href="https://boostacaartt.netlify.app/">Contact Us</Link>
              </Button>
              <Button variant="ghost" className="text-white hover:bg-white/10" asChild>
                <Link href="https://boostacaartt.netlify.app/auth/login">Sign In</Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                asChild
              >
                <Link href="https://boostacaartt.netlify.app/auth/sign-up">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-20 pb-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <div className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-sm text-gray-300">Lead Generation Platform</span>
          </div>

          {/* Hero Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Capture Add-to-Cart <br />
            Shoppers{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent">
              Before They Leave
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Crafting exceptional digital experiences through innovative design and cutting-edge technology.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-blue-700 hover:to-purple-700 text-white px-8 py-6 text-lg"
              asChild
            >
              <Link href="https://boostacaartt.netlify.app/auth/sign-up">
                Start Capturing Cart Leads
              </Link>
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-2 border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg bg-transparent"
              asChild
            >
              <Link href="https://boostacaartt.netlify.app/">
                See How It Works
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="container mx-auto px-4 pb-32">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            BoostACart helps online stores capture email and phone numbers the moment a shopper clicks
            "Add to Cart", so you can recover lost sales with WhatsApp, SMS, and email follow-ups.
          </p>
        </div>
      </section>

      {/* What Is BoostACart Section */}
      <section className="container mx-auto px-4 pb-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-[#1a2332] to-[#2a1f3d] rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">
              What Is BoostACart?
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              BoostACart is an add-to-cart lead capture tool for online stores. Instead of waiting for customers
              to abandon checkout, BoostACart captures their contact details at the add-to-cart stage, when
              purchase intent is highest.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              You can then follow up instantly or later using WhatsApp, SMS, or email to recover sales.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
