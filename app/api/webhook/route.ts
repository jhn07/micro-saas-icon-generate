import Stripe from "stripe"
import prisma from "@/lib/db"
import { SubscriptionPlanName } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
})

const stripeSecretWebhook = process.env.NEXT_STRIPE_WEBHOOK_SECRET!

const subscriptionPlans = {
  "FREE": { credits: 3 },
  "BASE": { credits: 30 },
  "STANDART": { credits: 60 },
  "PRO": { credits: 100 },
};

const createSubscriptionPlan = async (userId: string, userPlan: any, planDetail: any) => {
  try {
    await prisma.subscriptionPlan.create({
      data: {
        userId: userId,
        name: userPlan,
        price: planDetail.price,
        creditCount: planDetail.credits
      }
    });
    console.log(`Subscription plan ${userPlan} created for user ${userId}`);
  } catch (error) {
    console.error(`Error creating subscription plan for user ${userId}:`, error);
  }
};


const webhookHandler = async (req: NextRequest) => {
  const buf = await req.text()
  const sig = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(buf, sig, stripeSecretWebhook)
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    if (err! instanceof Error) console.log(err)
    console.log(`❌ Error message: ${errorMessage}`)
    return new NextResponse(JSON.stringify(
      { error: { message: `Webhook Error: ${errorMessage}` } }), { status: 400 }
    )
  }

  // Successfully constructed event.
  console.log("✅ Success:", event.id);

  switch (event.type) {
    case "checkout.session.completed":

      const session = event.data.object as Stripe.Checkout.Session

      if (!session.metadata || !session.metadata.userId || !session.metadata.userPlan) {
        console.error("Missing metadata in Stripe session");
        return new NextResponse(JSON.stringify({ error: "Missing metadata" }), { status: 400 });
      }

      const userId = session.metadata.userId
      const userPlan = session.metadata.userPlan as keyof typeof SubscriptionPlanName
      const planDetail = subscriptionPlans[userPlan]


      const currentUser = await prisma.user.findUnique({
        where: { userId: userId },
        select: { subscriptionPlan: true, userLimit: true }
      })

      if (!currentUser) return new NextResponse(JSON.stringify({ error: "User not found" }), { status: 404 });



      if (currentUser.subscriptionPlan === "FREE") {
        await prisma.user.update({
          where: { userId: userId },
          data: {
            subscriptionPlan: userPlan,
            userLimit: planDetail.credits
          }
        })
        console.log(`USER plan was FREE updated ${userPlan}`)
      }

      if (currentUser.subscriptionPlan !== "FREE") {
        await prisma.user.update({
          where: { userId: userId },
          data: {
            subscriptionPlan: userPlan,
            userLimit: currentUser.userLimit + planDetail.credits
          }
        })
        console.log(`USER plan is not FREE updated ${userPlan}`)
      }
  }


  return new NextResponse(JSON.stringify({ result: event }))
}

export { webhookHandler as POST }