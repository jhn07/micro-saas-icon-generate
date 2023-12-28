"use client";

import { UserButton, useUser } from "@clerk/nextjs"
import { useEffect } from "react";
import { useUserLimit } from "@/lib/store-chat";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavbarItemLink from "./NavbarItem";
import { buttonVariants } from "./ui/button";


const navlinks = [
  { name: "Generate", href: "/generate" },
  { name: "Community", href: "/community" },
  { name: "Collection", href: "/collection" },
]

type NavbarProps = {
  userLimit: number | undefined
}


export default function Navbar({ userLimit }: NavbarProps) {
  const { user } = useUser()
  const userLimitCount = useUserLimit((state) => state.userLimitCount)
  const setuserLimitCount = useUserLimit((state) => state.setUserLimitCount)

  const pathname = usePathname()


  useEffect(() => {
    setuserLimitCount(userLimit as number)
  }, [userLimit, setuserLimitCount])

  return (
    <div className="p-6">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-x-10">
          <div>
            <Link href="/">
              <h1 className="text-3xl font-semibold">IconGenerator.io</h1>
            </Link>
            <p className="text-sm font-mono text-center text-muted-foreground ">
              Your revolutionary SaaS
            </p>
          </div>
          <ul className="hidden md:flex items-center gap-x-5">
            {navlinks.map((link) => (
              <NavbarItemLink key={link.name} pathname={pathname} link={link} />
            ))}
          </ul>
        </div>
        <div className="">
          {user ? (
            <div className="flex items-center flex-wrap-reverse justify-center gap-3 md:gap-x-5">
              <div className="flex flex-col items-center">
                <h3>Hello {user.firstName || "USER"} 👋</h3>
                <h2>You have {userLimitCount} points</h2>
              </div>
              {pathname === "/generate" ? (
                <Link href="/upgrade" className={buttonVariants({ size: "sm", variant: "outline" })}>
                  Upgarde
                </Link>
              ) : (
                <Link href="/generate" className={buttonVariants({ size: "sm", variant: "outline" })}>
                  Generate
                </Link>
              )}
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
              Sign-In
            </Link>
          )}
        </div>
      </div>
      <div className="w-full flex mt-3 py-1.5">
        <ul className="md:hidden flex items-center gap-x-5">
          {navlinks.map((link) => (
            <NavbarItemLink key={link.name} pathname={pathname} link={link} />
          ))}
        </ul>
      </div>
    </div>
  )
}


