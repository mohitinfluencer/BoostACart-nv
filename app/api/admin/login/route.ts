import { type NextRequest, NextResponse } from "next/server"
import { createSession, validateCredentials } from "@/lib/admin-auth"

const loginAttempts = new Map<string, { count: number; lockoutUntil: number | null }>()

const MAX_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 // 15 minutes

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    const clientIp = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"

    const attempts = loginAttempts.get(clientIp) || { count: 0, lockoutUntil: null }

    if (attempts.lockoutUntil && attempts.lockoutUntil > Date.now()) {
      return NextResponse.json(
        {
          error: "Too many failed attempts",
          remainingTime: Math.ceil((attempts.lockoutUntil - Date.now()) / 1000),
        },
        { status: 429 },
      )
    }

    if (attempts.lockoutUntil && attempts.lockoutUntil <= Date.now()) {
      loginAttempts.delete(clientIp)
    }

    if (!validateCredentials(username, password)) {
      const newCount = (attempts.count || 0) + 1

      if (newCount >= MAX_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_DURATION
        loginAttempts.set(clientIp, { count: newCount, lockoutUntil })

        return NextResponse.json(
          {
            error: "Too many failed attempts. Account locked for 15 minutes.",
            remainingAttempts: 0,
          },
          { status: 429 },
        )
      }

      loginAttempts.set(clientIp, { count: newCount, lockoutUntil: null })

      return NextResponse.json(
        {
          error: "Invalid credentials",
          remainingAttempts: MAX_ATTEMPTS - newCount,
        },
        { status: 401 },
      )
    }

    loginAttempts.delete(clientIp)

    await createSession(username)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Admin Login] Error:", error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
