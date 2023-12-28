import { auth } from "@clerk/nextjs"
import prisma from "@/lib/db";
import OpenaAi from "openai"
import { NextRequest, NextResponse } from "next/server";
import namer from "color-namer"
import { uploadToCloudinary } from "@/lib/cloudinary-upload";

const getColorName = (hexColor: string) => {
  const names = namer(hexColor)
  return names.pantone[0].name
}

const openai = new OpenaAi({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: NextRequest) {
  const { userId } = auth()
  const { prompt, color, model, } = await req.json()

  if (!userId) return new NextResponse("User is not Valid", { status: 500 })

  // console.log({ prompt, color, model, })

  const colorName = getColorName(color)

  try {
    const user = await prisma.user.findUnique({
      where: {
        userId: userId
      }
    })

    if (!user || user.userLimit <= 0) return new NextResponse("User limit reached", { status: 400 })

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt: `3D render of a miniature ${prompt} face icon in color ${colorName} with a white background and diffuse lighting.`,
      n: 1,
      style: "natural",
      size: "1024x1024"
    })

    const generatedIconUrl = response.data[0].url

    if (!generatedIconUrl) return new NextResponse("Image is not Valid. Try again", { status: 500 })

    const cloudinaryUrl = await uploadToCloudinary(generatedIconUrl)

    // console.log(cloudinaryUrl)

    const imageRecord = await prisma.image.create({
      data: {
        userId: userId,
        url: cloudinaryUrl,
      }
    })

    const userPromptRecord = await prisma.userPrompt.create({
      data: {
        userId: userId,
        model: model,
        prompt: prompt,
        imageUrl: cloudinaryUrl,
        color: color,
      }
    })

    const updateUserLimit = await prisma.user.update({
      where: {
        userId: userId
      },
      data: {
        userLimit: { increment: -1 }
      }
    })


    if (!updateUserLimit || !imageRecord || !userPromptRecord) return new NextResponse("User is not updated or Failed to save image or Prompt data", { status: 400 })

    return new NextResponse(JSON.stringify({ userLimit: updateUserLimit.userLimit, imageUrl: cloudinaryUrl }), { status: 200 })

  } catch (error) {
    console.log(error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}