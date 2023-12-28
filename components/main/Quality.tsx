
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  RefreshCcw,
  UploadCloud,
  Settings,
  CircleDollarSign,
  Ruler,
  Share2,
  LucideIcon
} from "lucide-react"



const cardQualityDescription = [
  {
    title: "Quick Feedback Loop",
    description: "Our icons will generate within a few seconds so you can continously fine-tune your prompt and icon options to find the icon that works best for you.",
    icon: RefreshCcw
  },
  {
    title: "Manage your Collection",
    description: "We store all icons you've generated into the cloud so you'll never need to manage your colleciton yourself.",
    icon: UploadCloud
  },
  {
    title: "Variety of Options",
    description: "Diversify your icons with our various presets that help you make the icons of your dreams.",
    icon: Settings
  },
  {
    title: "Affordable Prices",
    description: "We provide the most credits compared to other icon generator services. Don't get scammed paying $10 for 10 credits.",
    icon: CircleDollarSign
  },
  {
    title: "High Resolution",
    description: "Your icons are high resolution of 1024x1024 so you can modify them in your favorite image editor as needed.",
    icon: Ruler
  },
  {
    title: "Social Presence",
    description: "Easily share your icons on social media and get feedback from your friends.",
    icon: Share2
  },

]


const Quality = () => {
  return (
    <div className="mt-10 grid grid-cols-1 gap-4 p-3 md:grid-cols-3">
      {cardQualityDescription.map((card, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle>
              <div className="text-center flex items-center">
                <div className="h-10 w-10 flex items-center justify-center rounded-md bg-blue-400">
                  <IconView Icon={card.icon} />
                </div>
                <h2 className=" flex-1 text-center gap-4 text-zinc-950">
                  {card.title}
                </h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-6">
              {card.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Quality


const IconView = ({ Icon }: { Icon: LucideIcon }) => {
  return (
    <Icon className="h-7 w-7" />
  )
};