import { Star } from "lucide-react";

export default function Rating({ rating }: { rating: number }) {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <div key={index} className={`${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}>
      <Star fill="yellow" className="h-4 w-4 text-yellow-200" />
    </div>
  ));

  return (
    <>
      {stars}
    </>
  )
}
