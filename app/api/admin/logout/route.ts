import { NextResponse } from "next/server"
import { clearSession } from "@/lib/admin-auth"

export async function POST() {
  try {
    await clearSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Admin Logout] Error:", error)
    return NextResponse.json({ error: "Logout failed" }, { status: 500 })
  }
}
