import Link from "next/link";
import { cn } from "@/lib/utils";


export default function NavbarItemLink({ pathname, link }: { pathname: string, link: { name: string, href: string } }) {
  return (
    <Link
      href={link.href}
      className={cn(
        "text-lg text-muted-foreground duration-300 hover:text-zinc-950 hover:scale-105 hover:duration-125",
        pathname === link.href && "text-zinc-950 scale-125"
      )}
    >
      {link.name}
    </Link>
  )
}