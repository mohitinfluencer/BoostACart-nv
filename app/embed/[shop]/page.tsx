import { Suspense } from "react"
import EmbedWidgetContent from "./embed-widget-content"

export default function EmbedWidget() {
  return (
    <Suspense
      fallback={
        <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <EmbedWidgetContent />
    </Suspense>
  )
}
