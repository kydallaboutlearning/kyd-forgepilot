
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What industries do you specialize in?",
    a: "We partner with real estate, healthcare, and fast-moving digital teams, but love challenges across any sector."
  },
  {
    q: "Can you integrate with our existing software?",
    a: "Yes! We specialize in custom API integrations, CRMs, databases, third-party platforms and more."
  },
  {
    q: "How quickly can we launch?",
    a: "Most projects go live in under 30 days, with prototypes in as little as a week."
  },
  {
    q: "Is my data safe?",
    a: "Security and compliance are top priorities — HIPAA, GDPR, SOC-2 best practices always observed."
  },
  {
    q: "Do you handle ongoing maintenance?",
    a: "Yes, we offer proactive support packages and continuous optimization."
  }
]

export default function FAQ() {
  return (
    <section className="w-full py-24 px-4 flex flex-col items-center bg-black border-b border-neutral-900">
      <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider mb-11 text-primary text-center font-sans">FAQs</h2>
      <Accordion type="single" collapsible className="w-full max-w-2xl border-none">
        {faqs.map((item, i) => (
          <AccordionItem key={i} value={"faq-" + i} className="border-b-0">
            <AccordionTrigger className="text-xl font-bold text-white py-5 px-2 rounded-md hover:bg-neutral-900 transition">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="text-gray-300 text-base px-4 pb-5 pt-0 transition-all duration-250">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

