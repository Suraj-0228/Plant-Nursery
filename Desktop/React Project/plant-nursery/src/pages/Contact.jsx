import React from 'react';
import ContactForm from '../components/forms/ContactForm';

const Contact = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Get in Touch</h2>
          <ContactForm />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          {/* FAQ Placeholder */}
          <div className="collapse collapse-plus bg-base-200 mb-2">
            <input type="radio" name="my-accordion-3" defaultChecked />
            <div className="collapse-title text-xl font-medium">
              What are your shipping options?
            </div>
            <div className="collapse-content">
              <p>We ship nationwide via our trusted courier partners. Shipping costs and times vary by location.</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-2">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Do you offer refunds?
            </div>
            <div className="collapse-content">
              <p>Yes, we have a 30-day return policy for most items. Please see our full policy for details.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
