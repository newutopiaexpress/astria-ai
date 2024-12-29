"use client";

import { Button } from "./button";
import { useToast } from "./use-toast";

export function ToastTest() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Model Training Started",
      description: (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md overflow-hidden">
            <img 
              src="/loading.gif" 
              alt="Loading"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            Your model is being trained. We'll notify you when it's ready!
          </div>
        </div>
      ),
      className: "bg-stone-950 text-white border-none",
      duration: 5000,
    });
  };

  return (
    <Button 
      onClick={showToast}
      size="sm" 
      variant="outline"
      className="rounded-full border-neutral-400/20"
    >
      Test Toast Animation
    </Button>
  );
}
