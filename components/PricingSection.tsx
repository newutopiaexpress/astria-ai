import Link from "next/link";
import { Button } from "./ui/button";

export default function PricingSection() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pricingOptions.map((option, index) => (
          <div
            key={index}
            className={`p-4  rounded-2xl w-full ${option.bgColor}`}
          >
            <div className="flex-grow ">
              <h3 className="text-2xl font-semibold text-center">
                {option.title}
              </h3>
              <p className="text-xl font-bold text-center mb-2">
                {option.price}
              </p>
              <p className="text-sm text-gray-600 text-center">
                {option.description}
              </p>
              <ul className="space-y-2 mb-4 pl-4">
                {option.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center space-x-2">
                    <span className="text-green-500">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 text-center">
              <Link href="/login">
                {" "}
                <Button className="w-3/4">{option.buttonText}</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const pricingOptions = [
  {
    title: "Starter",
    price: "1 Credit",
    description:
      "19 photos",
    features: [
      "One round of image generation",
    ],
    buttonText: "Choose Starter",
    bgColor: "bg-white",
  },
  {
    title: "Basic",
    price: "3 Credits",
    description:
      "3x19 different hairstyle and haircut for you",
    features: [
      "Three round of image generation",
    ],
    buttonText: "Choose Basic",
    bgColor: "bg-blue-50",
  },
  {
    title: "Premium",
    price: "5 Credits",
    description: "5x19 different hairstyle and haircut for you",
    features: [
      "Five round of image generation",
    ],
    buttonText: "Choose Premium",
    bgColor: "bg-white",
  },
];
