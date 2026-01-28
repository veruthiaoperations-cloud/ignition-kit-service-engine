"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What are your service hours?",
      answer:
        "We're available 24/7 for emergency services. Regular business hours are Monday-Friday 8AM-6PM, Saturday 9AM-4PM. We also offer weekend and evening appointments.",
    },
    {
      question: "Do you offer emergency services?",
      answer:
        "Yes! We provide 24/7 emergency service for urgent situations. Call us anytime and we'll dispatch a technician as quickly as possible.",
    },
    {
      question: "Are you licensed and insured?",
      answer:
        "Absolutely. All our technicians are fully licensed, bonded, and insured. We carry comprehensive liability insurance for your peace of mind.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, checks, and cash. Payment is due upon completion of service unless other arrangements have been made in advance.",
    },
    {
      question: "Do you provide warranties on your work?",
      answer:
        "Yes, we stand behind our work with comprehensive warranties. Parts typically come with manufacturer warranties, and our labor is guaranteed for your satisfaction.",
    },
    {
      question: "How quickly can you respond to a service call?",
      answer:
        "For emergency calls, we typically respond within 1-2 hours. Standard appointments can often be scheduled for the same day or next business day depending on availability.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-slate-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-900 pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-slate-500 transition-transform flex-shrink-0 ${
                    openIndex === index ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
