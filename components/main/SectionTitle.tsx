import { cn } from "@/lib/utils"

const SectionTitle = ({ text, className }: { text: string, className: string }) => {
  return (
    <h3 className={cn(
      className
    )}>
      {text}
    </h3>
  )
}

export default SectionTitle