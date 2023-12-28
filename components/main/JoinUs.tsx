import Image from "next/image"


const images = [
  { src: "/images/openai-logo.svg", alt: "openai-logo", width: 100, height: 100 },
  { src: "/vercel.svg", alt: "vercel-logo", width: 100, height: 100 },
  { src: "/images/huggingface-logo.svg", alt: "huggingface-logo", width: 40, height: 40 },
  { src: "/images/openai-logo.svg", alt: "openai-logo", width: 100, height: 100 },
]

const JoinUs = () => {
  return (
    <div className="mt-5 text-center px-2">
      <h3 className="text-4xl">
        Join the <span className="text-orange-300">61733 users</span> creating <span className="text-blue-400">74747 icons</span> so far!
      </h3>
      <div className="mt-2 py-3">
        <p className="text-sm font-semibold text-zinc-500">
          built & shipped with these awesome tools
        </p>
        <div className="mt-2 flex justify-center gap-6 opacity-30 py-2">
          {images.map((image, idx) => (
            <Image
              key={idx}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              priority
              className="object-contain"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default JoinUs