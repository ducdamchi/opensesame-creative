// import "../globals.css"
import Navbar from "@/components/navbar"
import { createClient } from "@utils/supabase/server"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <>
      <Navbar textColor="black" showExit={true} />
      {children}
    </>
  )
}
