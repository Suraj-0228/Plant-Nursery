import React from 'react';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Contact Form */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
          <form className="space-y-4">
            <div className="form-control flex flex-col gap-y-1">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input type="text" placeholder="Your Name" className="input input-bordered w-[85%]" />
            </div>
            <div className="form-control flex flex-col gap-y-1">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email" placeholder="your.email@example.com" className="input input-bordered w-[85%]" />
            </div>
            <div className="form-control flex flex-col gap-y-1">
              <label className="label">
                <span className="label-text">Inquiry Type</span>
              </label>
              <select className="select select-bordered w-[85%]">
                <option disabled selected>Select one</option>
                <option>General Question</option>
                <option>Order Inquiry</option>
                <option>Plant Care Help</option>
                <option>Feedback</option>
              </select>
            </div>
            <div className="form-control flex flex-col gap-y-1">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea className="textarea textarea-bordered w-[85%] h-24" placeholder="Your message..."></textarea>
            </div>
            <button className="btn btn-primary px-9">Submit</button>
          </form>
        </section>

        {/* Contact Info & Map */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Our Location & Hours</h2>
          <div className="space-y-4">
            <p><span className="font-bold">Address:</span> 7, Sant-Tukaram Society Part-2, Palanpur Jakatnaka, Surat.</p>
            <p><span className="font-bold">Email:</span> greenthumb@plantnursery.com</p>
            <p><span className="font-bold">Phone:</span> (+91) 7465146654</p>
            <div>
              <h3 className="text-xl font-bold mb-2">Hours of Operation</h3>
              <p><span className="font-bold">Monday - Friday:</span> 9:00 AM - 6:00 PM</p>
              <p><span className="font-bold">Saturday - Sunday:</span> 10:00 AM - 4:00 PM</p>
              <p className="text-sm mt-2">(Hours may vary by season)</p>
            </div>
          </div>
          <div className="mt-8">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.225833978235!2d144.9631!3d-37.814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1620229653955!5m2!1sen!2sus" 
              width="100%" 
              height="300" 
              style={{border:0}} 
              allowFullScreen="" 
              loading="lazy">
            </iframe>
          </div>
        </section>
      </div>

      {/* FAQ Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="collapse collapse-plus bg-base-200 mb-2">
          <input type="radio" name="my-accordion-3" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            What are your shipping options?
          </div>
          <div className="collapse-content">
            <p>We offer standard and expedited shipping. Shipping costs and times vary based on your location. More details are available at checkout.</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200 mb-2">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            Do you offer refunds?
          </div>
          <div className="collapse-content">
            <p>We have a 30-day return policy for most items. Please visit our returns page for more information.</p>
          </div>
        </div>
        <div className="collapse collapse-plus bg-base-200">
          <input type="radio" name="my-accordion-3" />
          <div className="collapse-title text-xl font-medium">
            How do I care for my new plant?
          </div>
          <div className="collapse-content">
            <p>Each plant comes with a care card, and you can find detailed care guides on our Guide page.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
