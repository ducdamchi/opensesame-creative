import { redirect } from "next/navigation"
import { createClient } from "@utils/supabase/server"
import { LoginForm } from "@/components/login-form"
import Navbar from "@/components/navbar"
// import "../globals.css"

export default async function LoginPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If user is already logged in, redirect to home
  if (user) {
    redirect("/")
  }

  return (
    <div className="flex flex-col min-h-svh w-screen items-center justify-center p-6 md:p-10 bg-zinc-50">
      {/* <img
        src="/cave2.jpg"
        alt="Image of a cave"
        className="w-screen object-cover rounded-xl"
      /> */}
      <div className="absolute top-0 z-100">
        <Navbar textColor="black" showExit={false} />
      </div>
      <div className="w-full max-w-sm absolute">
        <LoginForm />
      </div>
    </div>
  )
}
