interface Feature {
  icon: JSX.Element;
  title: string;
  highlight?: string;
  description: string;
}


import { VscTarget } from "react-icons/vsc";
import { VscWand } from "react-icons/vsc";
import { VscChromeRestore } from "react-icons/vsc";

export function UtopiaFeatures() {
  const features: Feature[] = [
    {
      icon:  <VscTarget/>,
      title: "Predefined Style Packs",
      highlight: "",
      description: "We train a dedicated AI model for you that contains the characteristic of a person."
    },
    {
      icon: <VscChromeRestore />,
      title: "Printable Resolution",
      highlight: "",
      description: "Describe any image or choose from dozens of pre-made, well engineered prompts."
    },
    {
      icon: <VscWand />,
      title: "Umnder 30 minutes",
      highlight: "",
      description: "Perfect price / quality ratio for professional use or for experimentation."
    }
  ];

  return (
    <section className="w-full px-0 py-12 md:gap-12 bg-transparent md:grid md:grid-cols-3 mx-auto text-center" aria-label="Features">
      {features.map((feature, index) => (
        <div key={index} className="md:col-span-1 hover:shadow-xl rounded-2xl transition-all p-4">
          <div className="content-center">
            <p className="text-[4em] opacity-15 mx-auto text-center h-24 w-24 flex items-center justify-center">{feature.icon}</p>
            <h2 className="text-center pb-2 pt-2 text-stone-800 font-thin tracking-tight [text-wrap:balance] text-3xl md:text-3xl md:leading-[3rem]">
              {feature.highlight && <span className="text-red-400">{feature.highlight}</span>}
              {feature.title}
            </h2>
            <p className="pb-6 max-w-[500px] text-stone-700 text-md">
              {feature.description}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}



