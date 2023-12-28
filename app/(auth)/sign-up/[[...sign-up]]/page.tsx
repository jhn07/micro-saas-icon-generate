import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen h-screen flex items-center justify-center">
      <SignUp />
    </div>

  )
}