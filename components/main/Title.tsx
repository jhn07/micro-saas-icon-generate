import { buttonVariants } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"


const Title = () => {
  return (
    <div className="max-w-4xl mx-auto py-24">
      <div className="grid grid-cols-1 gap-8 p-2 md:grid-cols-2">
        <div className="flex flex-col gap-y-3 px-4 order-last md:px-0 md:order-first md:justify-between">
          <h1 className="text-5xl text-zinc-800 font-semibold">
            Generate icons with a click of a button
          </h1>
          <p className="text-lg text-zinc-700 leading-6">
            Save time by generating icons for your
            businesses website, applications, or brand using our AI digital icon generator.
          </p>
          <Link href="/generate"
            className={buttonVariants({ variant: "linkGenerate" })}
          >
            Generate
          </Link>
        </div>
        <div>
          <Image
            src="/images/landing-banner.png"
            alt="landing-banner"
            width={400}
            height={400}
            className="object-fill rounded-md w-full"
          />
        </div>
      </div>
    </div>

  )
}

export default Title