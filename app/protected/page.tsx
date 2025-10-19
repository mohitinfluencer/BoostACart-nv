import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function ProtectedPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect("/auth/login")
  }

  // Check if user has a store
  const { data: stores } = await supabase.from("stores").select("*").eq("user_id", data.user.id)

  if (!stores || stores.length === 0) {
    redirect("/onboarding")
  }

  // Redirect to dashboard if user has stores
  redirect("/dashboard")
}
