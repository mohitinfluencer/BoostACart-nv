// BoostACart Widget Loader v2.0 with UX improvements
// Features: Loading animation, lead limit enforcement, installation tracking

;(() => {
  // Prevent multiple initializations
  if (window.BoostACart) {
    return
  }

  var BOOSTACART_DOMAIN = "https://boostacart-beta-v1.vercel.app"

  // Create the BoostACart global object
  window.BoostACart = {
    // Current iframe and overlay references
    _iframe: null,
    _overlay: null,
    _loader: null,

    // Show loading animation
    showLoader: function () {
      if (this._loader) return

      var loader = document.createElement("div")
      loader.style.cssText =
        "position: fixed;" +
        "top: 0;" +
        "left: 0;" +
        "width: 100%;" +
        "height: 100%;" +
        "background: rgba(0, 0, 0, 0.7);" +
        "backdrop-filter: blur(8px);" +
        "z-index: 999998;" +
        "display: flex;" +
        "align-items: center;" +
        "justify-content: center;" +
        "flex-direction: column;"

      var spinner = document.createElement("div")
      spinner.style.cssText =
        "width: 50px;" +
        "height: 50px;" +
        "border: 4px solid rgba(255, 255, 255, 0.3);" +
        "border-top: 4px solid #60A5FA;" +
        "border-radius: 50%;" +
        "animation: spin 1s linear infinite;"

      var text = document.createElement("div")
      text.textContent = "Preparing your discount..."
      text.style.cssText = "color: white;" + "font-size: 18px;" + "margin-top: 20px;" + "font-family: sans-serif;"

      // Add keyframe animation
      if (!document.getElementById("boostacart-spinner-style")) {
        var style = document.createElement("style")
        style.id = "boostacart-spinner-style"
        style.textContent = "@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }"
        document.head.appendChild(style)
      }

      loader.appendChild(spinner)
      loader.appendChild(text)
      document.body.appendChild(loader)

      this._loader = loader
      document.body.style.overflow = "hidden"
    },

    // Hide loading animation
    hideLoader: function () {
      if (this._loader) {
        this._loader.remove()
        this._loader = null
        if (!this._iframe) {
          document.body.style.overflow = ""
        }
      }
    },

    // Show limit reached modal
    showLimitModal: (storeInfo) => {
      var modal = document.createElement("div")
      modal.style.cssText =
        "position: fixed;" +
        "top: 0;" +
        "left: 0;" +
        "width: 100%;" +
        "height: 100%;" +
        "background: rgba(0, 0, 0, 0.7);" +
        "backdrop-filter: blur(8px);" +
        "z-index: 999999;" +
        "display: flex;" +
        "align-items: center;" +
        "justify-content: center;"

      var content = document.createElement("div")
      content.style.cssText =
        "background: white;" +
        "padding: 40px;" +
        "border-radius: 16px;" +
        "max-width: 400px;" +
        "text-align: center;" +
        "box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);"

      var icon = document.createElement("div")
      icon.textContent = "🚫"
      icon.style.cssText = "font-size: 48px;" + "margin-bottom: 20px;"

      var title = document.createElement("h2")
      title.textContent = "Lead Limit Reached"
      title.style.cssText =
        "font-size: 24px;" +
        "font-weight: bold;" +
        "margin-bottom: 10px;" +
        "color: #1f2937;" +
        "font-family: sans-serif;"

      var message = document.createElement("p")
      message.textContent = "You've reached your monthly lead limit. Upgrade your plan to continue collecting leads."
      message.style.cssText =
        "font-size: 14px;" +
        "color: #6b7280;" +
        "margin-bottom: 20px;" +
        "line-height: 1.6;" +
        "font-family: sans-serif;"

      var closeButton = document.createElement("button")
      closeButton.textContent = "Close"
      closeButton.style.cssText =
        "padding: 12px 24px;" +
        "background: #3b82f6;" +
        "color: white;" +
        "border: none;" +
        "border-radius: 8px;" +
        "font-size: 14px;" +
        "font-weight: 600;" +
        "cursor: pointer;" +
        "font-family: sans-serif;"

      closeButton.onclick = () => {
        modal.remove()
        document.body.style.overflow = ""
      }

      content.appendChild(icon)
      content.appendChild(title)
      content.appendChild(message)
      content.appendChild(closeButton)
      modal.appendChild(content)
      document.body.appendChild(modal)

      document.body.style.overflow = "hidden"
    },

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

      // Show loading animation
      this.showLoader()

      // Check lead limit before opening
      fetch(BOOSTACART_DOMAIN + "/api/check-lead-limit?shopify_domain=" + encodeURIComponent(shop))
        .then((response) => response.json())
        .then((data) => {
          if (!data.canAcceptLeads) {
            this.hideLoader()
            this.showLimitModal(data)
            return
          }

          // Build embed URL
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

          // Hide loader when iframe loads
          iframe.onload = () => {
            this.hideLoader()

            // Notify backend of successful installation
            fetch(BOOSTACART_DOMAIN + "/api/widget-installed", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ shopify_domain: shop }),
            }).catch((err) => {
              console.error("[BoostACart] Failed to track installation:", err)
            })
          }

          // Store references
          this._iframe = iframe
          this._overlay = overlay

          // Append to body
          document.body.appendChild(overlay)
          document.body.appendChild(iframe)

          // Prevent body scroll
          document.body.style.overflow = "hidden"

          console.log("[BoostACart] Widget opened for shop:", shop)
        })
        .catch((error) => {
          console.error("[BoostACart] Failed to check lead limit:", error)
          this.hideLoader()
          // On error, fail silently and don't open widget
        })
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

      if (this._loader) {
        this._loader.remove()
        this._loader = null
      }

      // Restore body scroll
      document.body.style.overflow = ""

      console.log("[BoostACart] Widget closed")
    },
  }

  // Listen for postMessage events
  window.addEventListener("message", (event) => {
    if (event.origin !== BOOSTACART_DOMAIN) {
      return
    }

    if (event.data && event.data.type === "BOOSTACART_CLOSE") {
      window.BoostACart.close()
    }

    if (event.data && event.data.type === "BOOSTACART_GO_TO_CART") {
      console.log("[BoostACart] Navigating to cart:", event.data.cartUrl || "/cart")

      // Close the widget first
      window.BoostACart.close()

      // Navigate to cart
      var cartUrl = event.data.cartUrl || "/cart"
      window.location.href = cartUrl
    }
  })

  console.log("[BoostACart] Loader v2.0 initialized")
})()
