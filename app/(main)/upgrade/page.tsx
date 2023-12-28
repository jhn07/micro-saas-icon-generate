"use client";

import { loadStripe } from "@stripe/stripe-js"
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { userPlanSubscription } from "@/lib/store-chat";
import SectionTitle from "@/components/main/SectionTitle";

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";


const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

const subscriptionPlans = [
  { name: "BASE", credits: 30, price: 15, imageLink: "https://res.cloudinary.com/dg344bsji/image/upload/v1703111402/sc1hylskyccaugalgnla.png" },
  { name: "STANDART", credits: 60, price: 25, imageLink: "https://res.cloudinary.com/dg344bsji/image/upload/v1702910749/xgtbafnmfurdjiqazywf.png" },
  { name: "PRO", credits: 100, price: 35, imageLink: "https://res.cloudinary.com/dg344bsji/image/upload/v1703172595/uwomgupdltorang9hsdf.png" },
]

export default function UpgradePage() {

  const router = useRouter()
  const selected = userPlanSubscription((state) => state.selected)
  const setSelected = userPlanSubscription((state) => state.setSelected)


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(selected)
      })

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      const { sessionId } = await res.json()

      const stripe = await stripePromise

      if (!stripe) {
        throw new Error("Something went wrong");
      }

      await stripe.redirectToCheckout({
        sessionId
      })

    } catch (err) {
      console.error("Error in creating checkout session:", err);
      router.push("/upgrade/cancel");
    }

  }


  return (
    <div className="h-screen max-w-7xl mx-auto">
      <div className="py-4 px-5 md:px-0">
        <SectionTitle
          className="text-3xl text-center text-zinc-800"
          text="Buy Credits"
        />
        <p className="mt-4 max-w-4xl mx-auto text-lg text-zinc-700 leading-6">
          Every new image you create in our web application deducts one credit from
          your account balance. You can also produce variations of existing images,
          but please note, this operation also costs one credit per image variant created.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-10 h-[65vh] py-5 grid grid-cols-1 gap-4 md:grid-cols-3">
          {subscriptionPlans.map((item, idx) => (
            <Card key={idx} className="bg-[#0f1022]">
              <CardContent className="py-6">
                <div className="flex flex-col items-center gap-6">
                  <Image
                    src={item.imageLink}
                    alt="base"
                    width={150}
                    height={150}
                    priority
                    className="object-cover rounded-full shadow-xl transition-opacity "
                  />
                  <p className="text-white text-3xl">{item.credits} Credits</p>
                  <p className="text-white text-3xl">{item.price}$</p>
                  <Button
                    type="submit"
                    variant="linkGenerate"
                    size="lg"
                    className="w-full md:w-1/2"
                    onClick={() => setSelected(item.name, item.price)}
                  >
                    BUY FOR {item.price}$
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </form>
    </div>
  )
}



