import SectionTitle from "@/components/main/SectionTitle";
import Chat from "@/components/generate/Chat";


const rules = [
  { rules: "Do not ask for words or letters, AI does not generate characters and words correctly" },
  { rules: "Simple prompts often work best" },
  { rules: "Use variants once you find a starting icon you like" },
  { rules: "Experiment with adding words, such as happy or vibrant" },
]

export default function GeneratePage() {
  return (
    <div className="min-h-screen h-screen max-w-7xl mx-auto">
      <div className="py-5">
        <SectionTitle
          className="text-4xl text-center text-zinc-800 font-semibold"
          text="Let's generate your Icon"
        />
        <div className="mt-4 max-w-4xl mx-auto px-5 md:px-0">
          <p className="text-lg text-zinc-700 leading-6">
            Your results may vary. We are working on fine tuning results for each style.
            Here are some tips to make better icons:
          </p>
          <ul className="mt-2 px-3">
            {rules.map((rule, idx) => (
              <li key={idx}
                className="list-disc text-zinc-700 font-medium mb-1.5"
              >
                {rule.rules}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Chat />
    </div>
  )
}
