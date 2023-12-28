
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const benefits = [
  {
    title: "Save Money",
    description: "Hiring a designer to create custom icons can be expensive, especially if you need a large number of icons or want to make frequent updates. Our AI icon generator tool offers more affordable pricing.",
    image: "/benefits/savings.svg"
  },
  {
    title: "Customizable",
    description: "Our AI icon generator tools offer a high degree of customizability, allowing you to adjust the colors, shapes, and other aspects of the icons to fit your specific needs. This can be more difficult to achieve with a designer, who may have limited time or resources to make extensive customizations.",
    image: "/benefits/preferences.svg"
  },
  {
    title: "Time",
    description: "Hiring a designer, on the other hand, can take days or even weeks, especially if the designer is working on other projects at the same time. Our digital icon generator can create custom icons quickly, often in just a few seconds.",
    image: "/benefits/time.svg"
  },
  {
    title: "Consistency",
    description: "Our icon generator tool can ensure a consistent look and feel across all of your icons, which can be difficult to achieve if you're hiring multiple designers or working with a single designer who has a different style for each icon. This can be particularly important for branding purposes, where you want your icons to convey a consistent message and image.",
    image: "/benefits/consistency.svg"
  },
]

const Benefits = () => {
  return (
    <div className="mt-10 max-w-6xl mx-auto grid grid-cols-1 gap-4 p-3 md:grid-cols-2">
      {benefits.map((benefit, idx) => (
        <Card key={idx} className="border-none">
          <CardHeader>
            <CardTitle>
              <div className="flex flex-col gap-3">
                <h2 className=" flex-1 text-center gap-4 text-zinc-950">
                  {benefit.title}
                </h2>
                <div>
                  <Image
                    src={benefit.image}
                    alt={benefit.title}
                    width={300}
                    height={300}
                    className="object-cover"
                  />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground leading-6 ">
              {benefit.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default Benefits