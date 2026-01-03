// BoostACart Widget Loader v1.0
// This file enables Shopify stores to embed the BoostACart widget via iframe

;(() => {
  // Prevent multiple initializations
  if (window.BoostACart) {
    return
  }

  var BOOSTACART_DOMAIN = "https://boostacart-beta-v1.vercel.app"

  // Create the BoostACart global object
  window.BoostACart = {
    // Current iframe reference
    _iframe: null,
    _overlay: null,

    // Open the widget in a full-screen iframe
    open: function (options) {
      // Prevent opening multiple iframes
      if (this._iframe) {
        console.warn("[BoostACart] Widget is already open")
        return
      }

      // Validate options
      if (!options || !options.shop) {
        console.error("[BoostACart] Missing required parameter: shop")
        return
      }

      var shop = options.shop
      var productId = options.product_id || options.productId || ""
      var productTitle = options.product_title || options.productTitle || "Product"

      var embedUrl =
        BOOSTACART_DOMAIN +
        "/embed/" +
        encodeURIComponent(shop) +
        "?product_id=" +
        encodeURIComponent(productId) +
        "&product_title=" +
        encodeURIComponent(productTitle)

      // Create overlay backdrop
      var overlay = document.createElement("div")
      overlay.style.cssText =
        "position: fixed;" +
        "top: 0;" +
        "left: 0;" +
        "width: 100%;" +
        "height: 100%;" +
        "background: rgba(0, 0, 0, 0.5);" +
        "z-index: 999999;" +
        "backdrop-filter: blur(4px);"

      // Create iframe
      var iframe = document.createElement("iframe")
      iframe.src = embedUrl
      iframe.style.cssText =
        "position: fixed;" +
        "top: 0;" +
        "left: 0;" +
        "width: 100%;" +
        "height: 100%;" +
        "border: none;" +
        "z-index: 1000000;"
      iframe.allow = "clipboard-write"

      // Store references
      this._iframe = iframe
      this._overlay = overlay

      // Append to body
      document.body.appendChild(overlay)
      document.body.appendChild(iframe)

      // Prevent body scroll
      document.body.style.overflow = "hidden"

      console.log("[BoostACart] Widget opened for shop:", shop)
    },

    // Close the widget iframe
    close: function () {
      if (this._iframe) {
        this._iframe.remove()
        this._iframe = null
      }

      if (this._overlay) {
        this._overlay.remove()
        this._overlay = null
      }

      // Restore body scroll
      document.body.style.overflow = ""

      console.log("[BoostACart] Widget closed")
    },
  }

  window.addEventListener("message", (event) => {
    // Accept messages from BOOSTACART_DOMAIN for security
    if (event.origin !== BOOSTACART_DOMAIN) {
      return
    }

    if (event.data && event.data.type === "BOOSTACART_CLOSE") {
      window.BoostACart.close()
    }

    if (event.data && event.data.type === "BOOSTACART_GO_TO_CART") {
      console.log("[BoostACart] Navigating to /cart")

      // Close the widget first
      window.BoostACart.close()

      // Navigate to Shopify's cart page (relative URL)
      window.location.href = "/cart"
    }
  })

  console.log("[BoostACart] Loader initialized")
})()
