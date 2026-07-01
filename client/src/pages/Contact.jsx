import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, HelpCircle } from 'lucide-react';
import { useModal } from '../context/ModalContext';

const Contact = () => {
  const { showPopup } = useModal();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    category: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!formData.fullName.trim()) {
      err.fullName = 'Full Name is required';
    } else if (formData.fullName.trim().length < 3) {
      err.fullName = 'Full Name must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      err.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      err.email = 'Email address is invalid';
    }

    if (!formData.category) {
      err.category = 'Inquiry category is required';
    }

    if (!formData.message.trim()) {
      err.message = 'Message detail is required';
    } else if (formData.message.trim().length < 10) {
      err.message = 'Message must be at least 10 characters';
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }
    setErrors({});
    setFormData({
      fullName: '',
      email: '',
      category: '',
      message: ''
    });
    showPopup({
      title: 'Message Sent!',
      message: 'Thank you for reaching out! Our botanical advisors will contact you shortly.',
      type: 'success'
    });
  };
  return (
    <div className="bg-base-100 min-h-screen transition-colors duration-300">
      
      {/* Hero Section */}
      <div className="hero min-h-[400px] relative overflow-hidden" style={{backgroundImage: 'url(https://i.pinimg.com/1200x/ce/04/9b/ce049b8c4df87d8396531f140de31bb4.jpg)'}}>
        <div className="hero-overlay bg-black/65"></div>
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-xl space-y-6">
            <span className="text-accent font-bold text-sm tracking-widest uppercase">Support & Queries</span>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight font-heading text-white">Get in Touch</h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              We would love to hear from you. Whether you have a question about plant care, order status, custom pairings, or general inquiries, our botanical advisors are here to help.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 space-y-28">
        
        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Information */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-[28px] border border-base-300/40 bg-base-200/50 space-y-8">
            <h2 className="text-2xl font-bold text-base-content font-heading border-b border-base-300 pb-2">Botanical Office</h2>
            
            <div className="space-y-5 text-sm text-base-content/85">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary mt-0.5 shrink-0">
                  <MapPin size={20} />
                </div>
                <span>1427 Willowfen Court, Cedarridge, OR 97405, United States</span>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary mt-0.5 shrink-0">
                  <Mail size={20} />
                </div>
                <a href="mailto:support@greenthumb.com" className="hover:text-primary transition-colors">
                  support@greenthumb.com
                </a>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-2.5 rounded-xl text-primary mt-0.5 shrink-0">
                  <Phone size={20} />
                </div>
                <a href="tel:+917465146654" className="hover:text-primary transition-colors">
                  (+91) 74651 46654
                </a>
              </div>
            </div>

            <div className="border-t border-base-300 pt-6 space-y-2 text-sm text-base-content/85">
              <h3 className="font-bold text-base-content font-heading">Greenhouse Hours</h3>
              <p><b>Monday - Friday:</b> 9:00 AM - 6:00 PM</p>
              <p><b>Saturday - Sunday:</b> 10:00 AM - 4:00 PM</p>
            </div>

            <div className="h-60 rounded-2xl overflow-hidden border border-base-300/40 shadow-inner">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.225833978235!2d144.9631!3d-37.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620229653955!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Map office location"
              >
              </iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-[28px] border border-base-300/40 bg-base-200/50">
            <h2 className="text-2xl font-bold text-base-content font-heading border-b border-base-300 pb-2 mb-6">Send A Message</h2>
            
            <form 
              onSubmit={handleSubmit} 
              className="space-y-5"
            >
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">Your Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.fullName ? 'border-error/60 focus:border-error' : ''}`}
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                  {errors.fullName && <span className="text-error text-xs ml-1 mt-1">{errors.fullName}</span>}
                </div>
                <div className="form-control w-full space-y-2">
                  <label className="text-sm font-semibold text-base-content/85 ml-1">Your Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className={`input input-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.email ? 'border-error/60 focus:border-error' : ''}`}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <span className="text-error text-xs ml-1 mt-1">{errors.email}</span>}
                </div>
              </div>

              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/85 ml-1">Inquiry Category</label>
                <select 
                  className={`select select-bordered w-full rounded-xl glass-input text-sm h-11 mt-1 ${errors.category ? 'border-error/60 focus:border-error' : ''}`}
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="" disabled>Select one</option>
                  <option value="General Botany Question">General Botany Question</option>
                  <option value="Order Delivery status">Order Delivery status</option>
                  <option value="Plant Health Support">Plant Health Support</option>
                  <option value="Business Partnerships">Business Partnerships</option>
                </select>
                {errors.category && <span className="text-error text-xs ml-1 mt-1">{errors.category}</span>}
              </div>

              <div className="form-control w-full space-y-2">
                <label className="text-sm font-semibold text-base-content/85 ml-1">Message Detail</label>
                <textarea 
                  className={`textarea textarea-bordered w-full rounded-xl glass-input text-sm h-32 mt-1 ${errors.message ? 'border-error/60 focus:border-error' : ''}`}
                  placeholder="Write your message details here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                {errors.message && <span className="text-error text-xs ml-1 mt-1">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary h-12 w-full rounded-xl btn-premium text-sm font-semibold shadow-md flex items-center justify-center gap-2">
                <Send className="h-4.5 w-4.5" /> Send Message
              </button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="space-y-12">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-primary font-bold text-sm tracking-wider uppercase font-heading">Common Queries</span>
            <h2 className="text-3xl font-bold text-base-content font-heading">Frequently Asked Questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            
            <div className="collapse collapse-plus p-2 rounded-2xl border border-base-300/40 bg-base-200/50">
              <input type="radio" name="faq-accordion" defaultChecked />
              <div className="collapse-title text-lg font-bold text-base-content font-heading">
                What are your shipping parameters?
              </div>
              <div className="collapse-content text-sm text-base-content/85 leading-relaxed pt-2">
                We deliver nationwide using temperature-controlled botanical boxes that preserve moisture and root aeration. Shipping is complimentary on all orders, with deliveries arriving within 3–5 business days.
              </div>
            </div>

            <div className="collapse collapse-plus p-2 rounded-2xl border border-base-300/40 bg-base-200/50">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-bold text-base-content font-heading">
                Do you guarantee plant survival upon arrival?
              </div>
              <div className="collapse-content text-sm text-base-content/85 leading-relaxed pt-2">
                Yes! We offer a 30-day "Green Guarantee." If your plant arrives damaged or dies within 30 days, we will ship a replacement specimen free of charge. Simply contact us with a photo of the specimen.
              </div>
            </div>

            <div className="collapse collapse-plus p-2 rounded-2xl border border-base-300/40 bg-base-200/50">
              <input type="radio" name="faq-accordion" />
              <div className="collapse-title text-lg font-bold text-base-content font-heading">
                Do the plants arrive in pots?
              </div>
              <div className="collapse-content text-sm text-base-content/85 leading-relaxed pt-2">
                All specimens are shipped in standard biodegradable grower nursery pots with organic potting soil. You can easily repot them into decorative containers or keep them in the shipping planter for up to 3 months.
              </div>
            </div>

          </div>
        </section>

      </div>
    </div>
  );
};

export default Contact;