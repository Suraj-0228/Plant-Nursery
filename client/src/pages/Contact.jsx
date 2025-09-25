import React from 'react';
import { Phone, Mail, MapPin, ChevronDown } from 'lucide-react';

const Contact = () => {
  return (
    <div className="bg-base-100">
      {/* Hero Section */}
      <div className="hero min-h-[400px]" style={{backgroundImage: 'url(https://i.pinimg.com/1200x/ce/04/9b/ce049b8c4df87d8396531f140de31bb4.jpg)'}}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Get in Touch</h1>
            <p className="mb-5">We'd love to hear from you! Whether you have a question about our plants, an order, or just want to say hello, our team is ready to help.</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Contact Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="bg-base-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="text-primary mr-4" size={24} />
                <span>7, Sant-Tukaram Society Part-2, Palanpur Jakatnaka, Surat.</span>
              </div>
              <div className="flex items-center">
                <Mail className="text-primary mr-4" size={24} />
                <a href="mailto:greenthumb@plantnursery.com" className="link link-hover">greenthumb@plantnursery.com</a>
              </div>
              <div className="flex items-center">
                <Phone className="text-primary mr-4" size={24} />
                <a href="tel:+917465146654" className="link link-hover">(+91) 74651 46654</a>
              </div>
            </div>
            <div className="divider my-8"></div>
            <h3 className="text-2xl font-bold mb-4">Hours of Operation</h3>
            <p><span className="font-bold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
            <p><span className="font-bold">Saturday - Sunday:</span> 10:00 AM - 4:00 PM</p>
            <div className="mt-8">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.225833978235!2d144.9631!3d-37.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620229653955!5m2!1sen!2sus" 
                width="100%" 
                height="300" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                className="rounded-2xl shadow-md">
              </iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-base-200 p-8 shadow-lg">
            <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-1">Full Name</span>
                </label>
                <input type="text" placeholder="Your Name" className="input input-bordered rounded-xl w-full" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-1">Email</span>
                </label>
                <input type="email" placeholder="your.email@example.com" className="input input-bordered rounded-xl w-full" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-1">Inquiry Type</span>
                </label>
                <select className="select select-bordered rounded-xl w-full">
                  <option disabled selected>Select one</option>
                  <option>General Question</option>
                  <option>Order Inquiry</option>
                  <option>Plant Care Help</option>
                  <option>Feedback</option>
                </select>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text my-1">Message</span>
                </label>
                <textarea className="textarea textarea-bordered rounded-xl w-full h-32" placeholder="Your message..."></textarea>
              </div>
              <button className="btn btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="py-24">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="collapse collapse-plus bg-base-200 shadow-md">
              <input type="radio" name="my-accordion-3" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                What are your shipping options?
              </div>
              <div className="collapse-content">
                <p>We offer standard and expedited shipping. Shipping costs and times vary based on your location. More details are available at checkout.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 shadow-md">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Do you offer refunds?
              </div>
              <div className="collapse-content">
                <p>We have a 30-day return policy for most items. Please visit our returns page for more information.</p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-base-200 shadow-md">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                How do I care for my new plant?
              </div>
              <div className="collapse-content">
                <p>Each plant comes with a care card, and you can find detailed care guides on our Guide page.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;