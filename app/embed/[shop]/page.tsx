"use client"

import { useParams, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function EmbedWidget() {
  const params = useParams()
  const searchParams = useSearchParams()

  const shop = params.shop as string
  const productId = searchParams.get("product_id") || ""
  const productTitle = searchParams.get("product_title") || ""

  const widgetUrl = new URL(`https://boostacart-beta-v1.vercel.app/widget/${shop}`)
  if (productId) widgetUrl.searchParams.set("product_id", productId)
  if (productTitle) widgetUrl.searchParams.set("product_title", productTitle)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === "BOOSTACART_CLOSE") {
        // Forward close message to parent (Shopify store)
        window.parent.postMessage({ type: "BOOSTACART_CLOSE" }, "*")
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  return (
    <iframe
      src={widgetUrl.toString()}
      className="fixed inset-0 w-full h-full border-0"
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
      }}
      title="BoostACart Widget"
      allow="clipboard-write"
    />
  )
}
