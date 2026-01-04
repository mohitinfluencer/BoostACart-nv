import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"

const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export function getAdminCredentials() {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.SESSION_SECRET

  if (!username || !password || !secret) {
    console.error("[Admin Auth] Missing environment variables:")
    if (!username) console.error("  - ADMIN_USERNAME is not set")
    if (!password) console.error("  - ADMIN_PASSWORD is not set")
    if (!secret) console.error("  - SESSION_SECRET is not set")
  }

  return {
    username: username || "memohit",
    password: password || "mohitmossi7738",
    secret: secret || "fallback-secret-change-in-production-please",
  }
}

export async function createSession(username: string) {
  const credentials = getAdminCredentials()
  const secret = new TextEncoder().encode(credentials.secret)

  const token = await new SignJWT({ username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret)

  const cookieStore = await cookies()
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  })

  return token
}

export async function verifySession() {
  const cookieStore = await cookies()
  const token = cookieStore.get("admin_session")?.value

  if (!token) {
    return null
  }

  try {
    const credentials = getAdminCredentials()
    const secret = new TextEncoder().encode(credentials.secret)
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.error("[Admin Auth] Session verification failed:", error)
    return null
  }
}

export async function clearSession() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
}

export function validateCredentials(username: string, password: string): boolean {
  const credentials = getAdminCredentials()
  return username === credentials.username && password === credentials.password
}
