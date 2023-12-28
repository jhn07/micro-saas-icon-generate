import { auth } from "@clerk/nextjs"
import prisma from "@/lib/db"
import SectionTitle from "@/components/main/SectionTitle";

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import Image from "next/image";

export const dynamic = "force-dynamic"
export const revalidate = 0

async function getUserPrompt(userId: string) {

  if (!userId) {
    return
  }

  return await prisma.userPrompt.findMany({
    where: { userId: userId },
    select: {
      imageUrl: true,
      prompt: true,
      color: true,
      model: true,
    }
  })
}

export default async function CollectionPage() {

  const { userId } = auth()

  const userPrompt = await getUserPrompt(userId as string)
  // console.log(userPrompt)

  return (
    <div className="h-screen max-w-7xl mx-auto px-2 md:px-0">
      <div className="py-4 flex gap-x-2">
        <SectionTitle
          className="text-3xl text-zinc-800"
          text="You&apos;ve Generated"
        />
        <span className="text-3xl text-zinc-800">
          {userPrompt?.length || 0} Icons!
        </span>
      </div>
      <div className="py-4 flex flex-wrap gap-4 justify-between">
        {userPrompt?.map((item, idx) => (
          <Card key={idx} className="pt-4 shadow-xl">
            <CardContent>
              <div className="">
                <Image
                  src={item.imageUrl}
                  alt={item.prompt}
                  width={200}
                  height={200}
                  className="block object-cover rounded-md"
                />
                <div className="mt-2 flex flex-col gap-2">
                  <p className="text-muted-foreground">User prompt: <span className="text-zinc-900 font-semibold">{item.prompt}</span></p>
                  <p className="text-muted-foreground">Color: <span className="text-zinc-900 font-semibold">{item.color}</span></p>
                  <p className="text-muted-foreground">Model: <span className="text-zinc-900 font-semibold">{item.model}</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

        ))}
      </div>
    </div>
  )
}
