import { Camera,  Sparkles } from 'lucide-react'

interface TimelineStep {
  title: string
  description: string
  completed: boolean
  position: "left" | "right";
  icon: JSX.Element;
}

const steps: TimelineStep[] = [
  {
    title: "Upload your photos & Select a style",
    description: "Upload your photos to the platform. You can upload as many photos as you want.",
    completed: true,
    position: "right",
    icon: <Camera />, 
  },
  {
    title: "Our AI learn your unique style & generate new photos",
    description: "We create a custom AI model trained on your photos. This model will be used to generate new photos.",
    completed: false,
    position: "left",
    icon: < Sparkles/>, 
  },
  {
    title: "Get yor photos in 30 minutes",
    description: "You will receive your new photos in 30 minutes in high quality (printable) resolution.",
    completed: false,
    position: "right",
    icon: <Sparkles/>, 
  },
]


export default function VerticalTimeline() {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-stone-300 dark:bg-gray-700" />
        
        {steps.map((step, index) => (
          <div key={index} className={`mb-12 flex items-center ${step.position === "left" ? "flex-row-reverse" : ""}`}>
            {/* Timeline content */}
            <div className={`w-1/2 ${step.position === "left" ? "pr-8" : "pl-8"}`}>
              <div className={`bg-transparent p-6  ${step.position === "left" ? "text-left" : "text-right"}`}>
                <h3 className={`text-xl font-semibold mb-2 ${step.completed ? "text-primary" : "text-card-foreground"}`}>
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>

            {/* Timeline dot */}
            <div className="text-stone-100 absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full outline outline-rose-300/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-l from-rose-950 to-neutral-950 hover:bg-gradient-to-br hover:from-rose-900 hover:to-neutral-900 font-normal text-sm shadow-xl hover:shadow-lg transition-all duration-100 hover:scale-105 shadow-fuchsia-600/10">
              {step.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

