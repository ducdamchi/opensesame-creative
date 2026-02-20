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
      <img
        src="https://ghiinqdxtvecsscabqyl.supabase.co/storage/v1/object/sign/opensesame-media/cave2.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9kMzY0ZThjZC1hOTRjLTQwODktOGI0Ni04MGE2Yzg5MTY4MTciLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJvcGVuc2VzYW1lLW1lZGlhL2NhdmUyLmpwZyIsImlhdCI6MTc3MTYxMDMyNiwiZXhwIjoxODAzMTQ2MzI2fQ.JZNXJW80rPVMZtzdGK7O_ST6L96jSCCvua1ZsqYRkJI"
        alt="Image of a cave"
        className="w-screen object-cover rounded-xl"
      />
      <div className="absolute top-0 z-100">
        <Navbar textColor="black" showExit={false} />
      </div>
      <div className="w-full max-w-sm absolute">
        <LoginForm />
      </div>
    </div>
  )
}
