"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Copy, Check, Code, ShoppingCart } from "lucide-react"
import { getWhatsAppLink } from "@/lib/whatsapp"

export default function ShopifySetupPage() {
  const [copied, setCopied] = useState(false)

  const embedCode = `<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.includes('/products/')) {
    document.body.addEventListener('click', async function(e) {
      const atcButton = e.target.closest('[aria-label*="Add to cart"], .add-to-cart, .product-form__submit');
      
      if (atcButton) {
        e.preventDefault();
        
        const productUrl = window.location.href;
        const productName = "{{ product.title | replace: '\"', '\\\\\"' }}";
        
        const productData = {
          product_url: productUrl,
          product_name: productName,
          variant_id: document.querySelector('[name="id"]').value,
          quantity: document.querySelector('[name="quantity"]')?.value || 1
        };
        
        await fetch('/cart/add.js', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({items: [{id: productData.variant_id, quantity: 1}]})
        });
        
        const widgetUrl = \`https://boostacart-beta.netlify.app/widget/monsoonkart.com?\${new URLSearchParams(productData)}\`;
        window.location.href = widgetUrl;
      }
    });
  }
});
</script>`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(embedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="min-h-screen bg-[#030303]">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/setup"
              className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Setup</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center shadow-lg shadow-green-500/25">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">Shopify Integration</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Shopify Integration Setup</h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Follow these simple steps to integrate BoostACart into your Shopify store and start capturing more leads.
          </p>
        </div>

        {/* Step-by-Step Instructions */}
        <div className="space-y-8 mb-12">
          {/* Step 1 */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-lg shadow-green-500/25 text-lg">
                1
              </div>
              <h2 className="text-2xl font-bold text-white">Access Your Shopify Admin</h2>
            </div>
            <p className="text-white/70 mb-4">
              Log in to your Shopify admin dashboard and navigate to your store's theme editor.
            </p>
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-white/60 text-sm">
                <span className="text-green-400 font-medium">Path:</span> Online Store → Themes → Click "Edit Code" on
                your active theme
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-lg shadow-green-500/25 text-lg">
                2
              </div>
              <h2 className="text-2xl font-bold text-white">Open theme.liquid File</h2>
            </div>
            <p className="text-white/70 mb-4">In the code editor sidebar, locate and open the main layout file.</p>
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-white/60 text-sm">
                <span className="text-green-400 font-medium">File:</span> Layout/theme.liquid
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-lg shadow-green-500/25 text-lg">
                3
              </div>
              <h2 className="text-2xl font-bold text-white">Locate the Closing Body Tag</h2>
            </div>
            <p className="text-white/70 mb-4">Scroll to the bottom of the file and find the closing body tag.</p>
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-white/60 text-sm font-mono">
                Look for: <span className="text-blue-300">{"</body>"}</span> and{" "}
                <span className="text-blue-300">{"</html>"}</span>
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-lg shadow-green-500/25 text-lg">
                4
              </div>
              <h2 className="text-2xl font-bold text-white">Paste the BoostACart Code</h2>
            </div>
            <p className="text-white/70 mb-4">
              Copy the code below and paste it just before the closing {"</body>"} tag.
            </p>
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-white/60 text-sm">
                <span className="text-green-400 font-medium">Position:</span> Just before {"</body>"} and {"</html>"}
              </p>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full flex items-center justify-center font-bold mr-4 shadow-lg shadow-green-500/25 text-lg">
                5
              </div>
              <h2 className="text-2xl font-bold text-white">Save and Deploy</h2>
            </div>
            <p className="text-white/70 mb-4">
              Click the "Save" button in Shopify to deploy your changes. Your BoostACart widget is now live!
            </p>
            <div className="bg-black/20 p-4 rounded-lg border border-white/10">
              <p className="text-white/60 text-sm">
                <span className="text-green-400 font-medium">Status:</span> Changes are live immediately after saving
              </p>
            </div>
          </div>
        </div>

        {/* Code Display Section */}
        <div className="mb-12">
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Embed Code</h3>
              </div>
              <button
                onClick={handleCopy}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  copied
                    ? "bg-green-600/20 text-green-400 border border-green-500/50"
                    : "bg-blue-600/20 text-blue-400 border border-blue-500/50 hover:bg-blue-600/30"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block */}
            <div className="bg-black/40 rounded-lg border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <pre className="p-4 text-sm text-blue-300 font-mono whitespace-pre-wrap break-words">
                  <code>{embedCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm p-8 rounded-2xl text-white text-center border border-white/10">
          <h3 className="text-2xl font-bold mb-4">Need Help?</h3>
          <p className="text-white/70 mb-6">
            If you encounter any issues during the integration process, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://youtu.be/shIy8lasBDI"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
            >
              Watch Setup Video
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 font-medium border border-white/20 hover:border-white/30 backdrop-blur-sm"
            >
              Contact Support
            </Link>
            <a
              href={getWhatsAppLink("918303208502", "support")}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
            >
              WhatsApp Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
