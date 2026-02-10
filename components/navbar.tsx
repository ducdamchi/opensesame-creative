"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { createClient } from "@utils/supabase/client"

export default function Navbar({
  textColor,
  showExit,
}: {
  textColor: string
  showExit: boolean
}) {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <div
      className="w-screen min-h-[4rem] flex items-center justify-between p-5 gap-2  bg-zinc-50"
      style={{ color: textColor }}>
      <div className="">
        <div className="font-bold text-2xl flex items-center justify-center gap-2">
          {/* <Image
            src="https://www.opensesame.com/wp-content/themes/os-2024/assets/logos/os_logo.svg"
            alt="OpenSesame Logo"
            width={200}
            height={20}
          /> */}
          <span>OpenSesame Creative Project</span>
        </div>
        <div className="font-mono">Summer 2026 SWE Internship / by Duc Dam</div>
      </div>
      <div className="flex items-center justify-center gap-5 ">
        <Link href="/about">About</Link>
        <Link href="/about">Tools</Link>
        {showExit && <button onClick={handleLogout}>Exit</button>}
      </div>
    </div>
  )
}
