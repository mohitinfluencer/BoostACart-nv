import { NextResponse } from "next/server"
import { verifySession } from "@/lib/admin-auth"

export async function GET() {
  try {
    const session = await verifySession()

    if (!session) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    return NextResponse.json({ authenticated: true, user: session })
  } catch (error) {
    console.error("[Admin Verify] Error:", error)
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
