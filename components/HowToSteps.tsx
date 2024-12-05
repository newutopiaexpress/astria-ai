import React, { useEffect, useState } from 'react';
import { Badge } from "@/components/ui/badge";
import Spline from '@splinetool/react-spline/next';

export type Step = {
  number: number;
  title: string;
  description: string;
};

interface HowToStepsProps {
  steps: Step[];
}

export const HowToSteps: React.FC<HowToStepsProps> = ({ steps }) => {
  const [Spline, setSpline] = useState<any>(null);

  useEffect(() => {
    import('@splinetool/react-spline')
      .then((module) => {
        setSpline(() => module.default);
      })
      .catch((error) => {
        console.error("Error loading Spline:", error);
      });
  }, []);

  return (
    <div className="mx-auto px-4 relative text-center py-6 md:py-10 min-h-[540px]">
      {/*<Badge variant="outline" className="mx-auto">How it Works?</Badge>
      <div className="absolute w-full h-72 left-0 right-0 top-0">
        <h1 className="z-[50] text-center mb-24 text-stone-800 font-thin tracking-tight drop-shadow-sm [text-wrap:balance] text-5xl leading-[2.7rem] md:text-6xl md:leading-[3.8rem]">
          <span className="bg-gradient-to-r from-stone-800 via-red-800  to-fuchsia-800 inline-block text-transparent bg-clip-text pb-2">Three Steps to<br/> Showing Your Best Self</span>
        </h1>
      </div>
      */}
      <div className="max-w-[1100px] mx-auto flex flex-col gap-9 md:flex-row justify-between items-start md:items-center relative">
        {steps.map((step) => (
          <div key={step.number} className="mx-auto flex-1 text-center mb-8 md:mb-0 relative z-10">
            <div className="inline-flex items-center justify-center w-8 h-8 mb-4 rounded-full outline outline-rose-300/20 outline-7 outline-offset-4 hover:outline hover:outline-stone-300/30 hover:outline-2 hover:outline-offset-0  bg-gradient-to-t from-fuchsia-100 via-neutral-100 to-white shadow-md py-6 px-6 font-normal text-sm text-stone-800 transition-all duration-100 shadow-fuchsia-600/10">
              {step.number}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">{step.description}</p>
          </div>
        ))}
        <div className="z-2 absolute top-6 left-2 right-0 hidden md:block">
          <div className="h-px bg-gradient-to-r from-white/0 from-10% via-rose-900/10 via-30% to-white/0 to-90%" aria-hidden="true"></div>
        </div>
      </div>
      {Spline && <Spline className="absolute top-0 z-[1]" scene="https://prod.spline.design/FKzuUFZjjusRKimK/scene.splinecode" />}
    </div>
  );
};