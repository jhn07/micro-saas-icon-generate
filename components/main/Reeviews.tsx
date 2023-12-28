
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Image from "next/image";
import Rating from "../Rating";


const reviews = [
  {
    name: "Toni Soprano",
    rating: 5,
    image: "/reviews/based.png",
    nickname: "@TonySoprano",
    description: "The UI is easy to user and I like how it tracks all of my previous icons in a easy to find place."
  },
  {
    name: "Rick James",
    rating: 5,
    image: "/reviews/box.png",
    nickname: "@RickJames",
    description: "I could save money and just use DALL-E directly, but generating images on this site is so much easier."
  },
  {
    name: "Bob Ross",
    rating: 5,
    image: "/reviews/coin.png",
    nickname: "@BobRoss",
    description: "This website is addicting. You never know what the AI will generate for you next. It's like a box of chocolates, you never know what you'll get."
  },
  {
    name: "Daria",
    rating: 5,
    image: "/reviews/space.png",
    nickname: "@BASED",
    description: "Probably the most Based web app. I used this application to generate a profile picture icon for my discord profile and I love it."
  },
  {
    name: "Walter White",
    rating: 5,
    image: "/reviews/study.png",
    nickname: "@WalterWhite",
    description: "I needed a logo to use for my product, and this app was just what I needed"
  },
  {
    name: "Walter White",
    rating: 5,
    image: "/reviews/based.png",
    nickname: "@TinaSeibert",
    description: "I enjoy generating icons. So many cool colors, shapes, and styles to choose!"
  },
]


const Reeviews = () => {
  return (
    <div className="grid grid-cols-1 gap-4 p-3 md:grid-cols-3">
      {reviews.map((review, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>
              <div className="flex gap-4">
                <div>
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={50}
                    height={50}
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h2 className=" text-zinc-950">
                    {review.name}
                  </h2>
                  <CardDescription>
                    {review.nickname}
                  </CardDescription>
                </div>
              </div>
              <div className="mt-1.5 flex gap-1">
                <Rating rating={review.rating} />
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-6">
              {review.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Reeviews