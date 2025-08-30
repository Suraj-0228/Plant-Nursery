import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageSquare } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const faqs = [
    {
      question: 'Do you offer plant delivery?',
      answer: 'Yes! We offer free delivery on orders over $50 within a 25-mile radius. Delivery is available Tuesday through Saturday.'
    },
    {
      question: 'What is your plant guarantee policy?',
      answer: 'We offer a 30-day health guarantee on all plants. If your plant shows signs of disease or poor health within 30 days, bring it back with your receipt for a full refund or exchange.'
    },
    {
      question: 'Do you provide plant care consultations?',
      answer: 'Absolutely! Our plant specialists offer free consultations in-store. For detailed home visits or garden planning, we offer premium consultation services starting at $75.'
    },
    {
      question: 'Can you help me choose plants for specific conditions?',
      answer: 'Yes, our experts can recommend plants based on your lighting conditions, space constraints, experience level, and aesthetic preferences. Just ask!'
    },
    {
      question: 'Do you offer workshops or classes?',
      answer: 'We host monthly workshops on various topics like propagation, seasonal care, and container gardening. Check our newsletter or call for upcoming schedules.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, all major credit cards, PayPal, and offer financing options for larger purchases through Affirm.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Have questions about plants, need care advice, or want to visit our nursery? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-4 sm:mb-6 animate-slide-in-left">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Visit Our Nursery</h3>
                    <p className="text-gray-600 text-sm">
                      123 Garden Lane<br />
                      Green Valley, Mumbai 400001
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Call Us</h3>
                    <p className="text-gray-600 text-sm">+91 98765 43210</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Email Us</h3>
                    <p className="text-gray-600 text-sm">info@greenthumb.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base">Hours</h3>
                    <div className="text-gray-600 text-sm">
                      <p>Mon-Fri: 8:00 AM - 7:00 PM</p>
                      <p>Saturday: 8:00 AM - 8:00 PM</p>
                      <p>Sunday: 9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-slide-in-left" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4">Find Us</h3>
              <div className="bg-gray-200 rounded-lg h-40 sm:h-48 flex items-center justify-center">
                <p className="text-gray-600">Interactive Map</p>
              </div>
              <button className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-all duration-200 transform hover:scale-105">
                Get Directions
              </button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8 animate-slide-in-right">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                Send us a Message
              </h2>
              
              {submitted && (
                <div className="mb-4 p-3 sm:p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-sm animate-scale-in">
                  Thank you for your message! We'll get back to you within 24 hours.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200"
                  >
                    <option value="">Select a topic</option>
                    <option value="plant-care">Plant Care Question</option>
                    <option value="order">Order Inquiry</option>
                    <option value="delivery">Delivery Information</option>
                    <option value="consultation">Plant Consultation</option>
                    <option value="workshop">Workshop Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-all duration-200 disabled:opacity-50 flex items-center justify-center transform hover:scale-105 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* FAQ Section */}
            <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="border-b border-gray-200 pb-4 group">
                    <summary className="cursor-pointer font-medium text-gray-900 hover:text-green-600 transition-colors text-sm sm:text-base list-none">
                      {faq.question}
                    </summary>
                    <p className="mt-2 text-gray-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}