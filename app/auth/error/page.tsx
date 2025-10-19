import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl text-white">Sorry, something went wrong.</CardTitle>
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-white/70">Code error: {params.error}</p>
              ) : (
                <p className="text-sm text-white/70">An unspecified error occurred.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
