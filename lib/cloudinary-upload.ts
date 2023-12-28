import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface CloudinaryResponseProps {
  url?: string
}

export const uploadToCloudinary = async (generatedIconUrl: string): Promise<string> => {
  const imageResponse = await fetch(generatedIconUrl)
  const arrayBuffer = await imageResponse.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  const cloudinaryResponse = await new Promise<CloudinaryResponseProps>((resolve, reject) => {
    cloudinary.uploader.upload_stream({
      resource_type: "image",
    }, function (error, result) {
      if (error) {
        reject(error)
        return
      }
      if (!result) {
        reject(new Error("No result from Cloudinary"))
        return
      }

      resolve(result)
    }).end(buffer)
  })

  if (!cloudinaryResponse || !cloudinaryResponse.url) {
    throw new Error("URL is not available in the Cloudinary response");
  }


  return cloudinaryResponse.url

}