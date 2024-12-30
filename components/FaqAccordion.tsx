import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  import { AiOutlineSafetyCertificate } from "react-icons/ai";
  
  const faqs = [
    {
        question: "How does the AI photo generation process work?",
        answer: "We train an AI model with your photos and generate 24 new, unique images in your style. The entire process takes about 10-15 minutes."
      },
      {
        question: "What kind of photos should I upload?",
        answer: "Upload 15-20 high-quality photos including a mix of portraits (face), half-body, and full-body shots. Photos should be well-lit, clear, and without heavy filters."
      },
      {
        question: "What will I receive?",
        answer: "You'll receive 24 AI-generated photos in high-resolution (1792x2304px) printable JPG format."
      },
      {
        question: "Is there a refund policy?",
        answer: "We don't offer refunds as we incur computing costs for each training session, regardless of the outcome."
      },
      {
        question: "How long do you store my photos and the AI model?",
        answer: "Uploaded photos are automatically deleted within 24 hours, and the trained AI model is stored for 30 days."
      },
      {
        question: "Can I use the generated images commercially?",
        answer: "Yes, you receive full usage rights for both personal and commercial purposes."
      },
      {
        question: "What affects the quality of the results?",
        answer: "Results largely depend on the quality and variety of your uploaded photos. Better input photos lead to better results."
      },
      {
        question: "Do you accept custom projects?",
        answer: "Yes, we're happy to discuss custom projects and special requirements via chat."
      }
  ]
  
  export default function FaqAccordion() {
    return (
      <section className="relative w-full pb-12 px-4  sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-28">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-thin text-2xl">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-md">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <div className="absolute left-4 bottom-4 text-xs text-stone-300 w-full flex flex-row gap-12">
          <span>Utopia Express 2024. </span>
          <span>Powered by <span className="font-extrabold">Flux AI</span></span>
          <span className="text-[15px]"><AiOutlineSafetyCertificate /></span>
          <span>Secured by <span className="font-extrabold italic">Stripe</span></span>
        </div>
      </section>
    )
  }
  
  