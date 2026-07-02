import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircleQuestion } from 'lucide-react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Do you ship live plants all over India?",
      answer: "Yes! We ship our greenhouse specimens to almost all pin codes across India. To safeguard the plants during transit, we pack them in specially designed ventilated boxes that protect the foliage and roots from bruising and heat."
    },
    {
      question: "What happens if my plant arrives damaged or dead?",
      answer: "We offer a 100% Live Arrival Guarantee. If your specimen arrives dead or severely damaged, send us a clear photo of the plant inside its original box within 24 hours of delivery at support@greenthumb.com. We will ship a free replacement or process a store credit immediately."
    },
    {
      question: "How do I know if a plant is available for purchase?",
      answer: "Each plant card displays a real-time status badge. If a specimen is sold out, it will show a red 'Out of Stock' banner, and the 'Add to Cart' button is disabled automatically. If there are 5 or fewer units remaining, it will show a warning: 'Only X Left' so you can purchase before it sells out."
    },
    {
      question: "Can I cancel my order after placing it?",
      answer: "Yes, you can cancel any order directly from your profile dashboard under 'My Orders' at any time before it is marked as 'Shipped'. Once it is dispatched, order status is locked, and we cannot cancel or recall the package."
    },
    {
      question: "What tax rate is applied to my purchase?",
      answer: "We apply GST dynamically according to our global boutique configuration. This rate is fetched directly from the database and calculated at checkout. You can review the exact GST value and complimentary shipping details under the invoice specifications before completing payment."
    },
    {
      question: "Where can I find instructions on watering and caring for my plants?",
      answer: "Every plant page has a detailed 'Care Information' tab detailing its specific light, watering, soil, temperature, humidity, and pest defense guidelines. You can also visit our main 'Care Guide' page in the top navbar for general gardening tutorials."
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in-up">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-base-content tracking-tight">
          Greenhouse FAQ & Support
        </h1>
        <p className="text-base-content/70 text-sm max-w-xl mx-auto">
          Find instant answers to common questions about shipping live plants, refunds, stock levels, and care instructions.
        </p>
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index;
          return (
            <div 
              key={index}
              className="rounded-2xl border border-base-300/40 bg-base-200/40 hover:bg-base-200/60 transition-all duration-300 glass-card overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-5 sm:p-6 text-left flex justify-between items-center gap-4 focus:outline-none cursor-pointer"
              >
                <span className="font-bold text-base-content font-heading text-base sm:text-lg flex items-center gap-2.5">
                  <MessageCircleQuestion className={`h-5 w-5 ${isOpen ? 'text-primary' : 'text-base-content/40'} flex-shrink-0`} />
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="h-5 w-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-base-content/40 flex-shrink-0" />
                )}
              </button>
              
              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 sm:px-6 pb-6 text-sm text-base-content/75 leading-relaxed border-t border-base-300/30 pt-4 bg-base-100/30">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Support Banner Card */}
      <div className="p-6 sm:p-8 rounded-[28px] border border-base-300/40 bg-base-200/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 glass-card">
        <div className="space-y-1">
          <h4 className="font-bold text-base-content font-heading text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" /> Still have questions?
          </h4>
          <p className="text-sm text-base-content/70">Our botanical customer support experts are here to assist you.</p>
        </div>
        <a 
          href="/contact"
          className="btn btn-primary btn-sm h-11 px-5 rounded-xl btn-premium text-sm font-semibold shadow-md inline-flex items-center justify-center"
        >
          Contact Support
        </a>
      </div>

    </div>
  );
};

export default FAQ;
