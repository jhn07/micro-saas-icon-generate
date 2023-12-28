import { auth } from "@clerk/nextjs"
import prisma from "@/lib/db"


const getUser = async (userId: string) => {

  if (!userId) {
    return
  }

  return await prisma.user.findUnique({
    where: { userId: userId },
    select: { subscriptionPlan: true, userLimit: true }
  })
}

export default async function SuccessPage() {

  const { userId } = auth()

  const userDetailsPlan = await getUser(userId as string)


  return (
    <div className="max-w-7xl mx-auto">
      <div className="h-[40vh] flex flex-col gap-2 justify-center items-center">
        <h1 className="text-3xl">Success!</h1>
        <p className="text-3xl">
          You have updated PLAN <span className="font-semibold">{userDetailsPlan?.subscriptionPlan}</span>
        </p>
        <p className="text-3xl">Your credits score is <span className="font-semibold">{userDetailsPlan?.userLimit}</span></p>
      </div>
    </div>
  )
}
