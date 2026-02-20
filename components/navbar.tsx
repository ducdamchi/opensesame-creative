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
          <Link href="/">
            <span className="text-orange-600">OpenSesame&nbsp;</span>Creative
            Project
          </Link>
        </div>
        <div className="font-mono">
          Summer 2026 SWE Internship / by{" "}
          <a
            className="text-orange-600 hover:underline"
            href="https://github.com/ducdamchi"
            target="_blank"
            rel="noopener noreferrer">
            Duc Dam
          </a>
        </div>
      </div>
      {showExit && (
        <div className="flex items-center justify-center gap-5 ">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/tools" className="hover:underline">
            Tools
          </Link>
          <button onClick={handleLogout} className="hover:underline">
            Exit
          </button>
        </div>
      )}
    </div>
  )
}
