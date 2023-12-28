import { auth } from "@clerk/nextjs"
import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16"
})

export async function POST(req: NextRequest) {
  const { userId } = auth()
  const { name, price } = await req.json()

  if (!userId) return new NextResponse("User is not Valid", { status: 500 })
  console.log({ name, price, })

  try {
    const stripeParams: Stripe.Checkout.SessionCreateParams = {
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "CAD",
            product_data: {
              name: name,
            },
            unit_amount: price * 100,
          },
          quantity: 1
        }
      ],
      metadata: {
        userId: userId,
        userPlan: name
      },
      success_url: `${req.headers.get("origin")}/upgrade/success`,
      cancel_url: `${req.headers.get("origin")}/upgrade/cancel`
    }

    const stripeCheckoutSession: Stripe.Checkout.Session = await stripe.checkout.sessions.create(stripeParams)

    return new NextResponse(JSON.stringify({ sessionId: stripeCheckoutSession.id }))
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify(
      { message: "something went wrong", ok: false },
    ), { status: 500 })
  }
}
