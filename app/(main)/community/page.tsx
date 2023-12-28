import prisma from "@/lib/db"
import SectionTitle from "@/components/main/SectionTitle";
import Image from "next/image";

const getIconCollection = async () => {
  return await prisma.image.findMany({
    select: {
      url: true
    }
  })
}

export default async function CommunityPage() {

  const allImages = await getIconCollection()

  return (
    <div className="max-w-7xl mx-auto px-2 md:px-0">
      <div className="py-6">
        <SectionTitle
          className="text-3xl text-zinc-800"
          text="Recent Community Icons"
        />
      </div>
      <div className="py-6 flex gap-4 flex-wrap">
        {allImages.map((item, idx) => (
          <div key={idx}>
            <Image
              src={item.url}
              alt="collection-image"
              width={150}
              height={150}
              className="object-cover rounded-md shadow-xl border-b-2 border-l-2 border-black/30"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
