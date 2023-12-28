import { auth } from "@clerk/nextjs"
import prisma from "@/lib/db";
import { User } from "@prisma/client";
import Navbar from "@/components/Navbar";


export const dynamic = "force-dynamic"
export const revalidate = 0



async function savedUSer(userId: string) {
  if (!userId) {
    return
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId
      }
    })

    if (user) {
      return user
    }

    return await prisma.user.create({
      data: {
        userId: userId
      }
    })
  } catch (error) {
    console.error("Error in saveUser:", error);
    throw error;
  }

}

export default async function MainLayout({ children }: { children: React.ReactNode }) {

  const { userId } = auth()


  const user: User | undefined = await savedUSer(userId as string)
  // console.log(user || "User is not Registration")



  return (
    <div>
      <Navbar userLimit={user?.userLimit} />
      {children}
    </div>
  )
}
