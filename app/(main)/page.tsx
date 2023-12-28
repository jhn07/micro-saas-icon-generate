import Title from "@/components/main/Title";
import JoinUs from "@/components/main/JoinUs";
import SectionTitle from "@/components/main/SectionTitle";
import Quality from "@/components/main/Quality";
import Reeviews from "@/components/main/Reeviews";
import Benefits from "@/components/main/Benefits";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";



export default function Home() {
  return (
    <div className="min-h-screen h-screen max-w-7xl mx-auto">
      <Title />
      <JoinUs />
      <div className="mt-5 px-2 py-10">
        <SectionTitle
          className="text-5xl text-center text-zinc-800 font-semibold"
          text="Let&apos;s save your time!"
        />
        <p className="mt-4 max-w-4xl mx-auto text-lg text-zinc-700 leading-6 md:text-center">
          Hiring a designer to build web assets and digital icons for your site can be hard and time consuming.
          Describe your icons with a custom prompt, and we&apos;ll generate your assets in seconds.
        </p>
      </div>
      <Quality />
      <div className="mt-5 px-2 py-10">
        <SectionTitle
          className="text-5xl text-center text-zinc-800 font-semibold"
          text="What the say about us!"
        />
      </div>
      <Reeviews />
      <div className="mt-5 py-10">
        <SectionTitle
          className="text-5xl text-center text-zinc-800 font-semibold"
          text="The Benefits of Generated Icons"
        />
        <p className="mt-4 max-w-4xl mx-auto text-lg text-zinc-700 leading-6 md:text-center">
          Let&apos;s be honest, you don&apos;t have the time or money to find a designer,
          communicate back and forth via email, and refine your icon over and over again.
          Letting AI generate your icon provides many benefits.
        </p>
      </div>
      <Benefits />
      <div className="py-10 flex justify-center">
        <Link href="/generate"
          className={buttonVariants({ variant: "linkGenerate" })}
        >
          Generate
        </Link>
      </div>
    </div>
  )
}
