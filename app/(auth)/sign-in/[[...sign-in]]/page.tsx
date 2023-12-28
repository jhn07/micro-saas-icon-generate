import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen h-screen flex items-center justify-center">
      <SignIn />
    </div>

  )
}