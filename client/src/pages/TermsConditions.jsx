import React from 'react';
import { Scale, HeartHandshake, ShoppingBag, Truck, Ban, AlertOctagon, HelpCircle, FileCheck } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in-up">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
          <Scale className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-base-content tracking-tight">
          Terms of Service & Nursery Agreement
        </h1>
        <p className="text-base-content/70 text-sm max-w-xl mx-auto">
          Effective July 2, 2026. Please read this agreement in full. By utilizing our store, you agree to comply with all standard purchase terms.
        </p>
      </div>

      {/* Intro Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-base-300/40 bg-base-200/50 glass-card space-y-4">
        <h2 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
          <HeartHandshake className="h-5 w-5" /> 1. Acceptance of Terms
        </h2>
        <p className="text-sm text-base-content/85 leading-relaxed">
          Welcome to GreenThumb Nursery. This website and its integrated e-commerce solutions are operated by GreenThumb. Throughout this agreement, terms like "we", "us", and "our" refer to GreenThumb. By accessing our platform, registering user profiles, adding plants to your cart, or placing orders, you agree to be bound by these Terms of Service.
        </p>
      </div>

      {/* Terms list */}
      <div className="space-y-8">
        
        {/* Term 2 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <ShoppingBag className="h-4.5 w-4.5 text-accent" /> 2. Ordering, Pricing, and GST
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed mb-2">
            When you purchase specimens from our catalog, you agree to provide accurate checkout information:
          </p>
          <ul className="list-disc pl-6 text-sm text-base-content/75 space-y-2">
            <li><strong>Prices:</strong> All catalog prices are listed in Indian Rupees (INR). Price changes are applied dynamically based on supplier variables and seasonal availability.</li>
            <li><strong>GST Tax:</strong> All orders are subject to dynamic Goods and Services Tax (GST) calculations during checkout, according to the global database rate set by administrators.</li>
            <li><strong>Accuracy:</strong> We reserve the right to cancel orders if a plant is listed at an incorrect price due to database sync errors.</li>
          </ul>
        </div>

        {/* Term 3 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <Truck className="h-4.5 w-4.5 text-accent" /> 3. Live Plant Delivery and Carrier Risks
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            Plants are delicate living specimens. We take maximum precautions to secure pots and roots inside custom ventilated boxes. However:
          </p>
          <ul className="list-disc pl-6 text-sm text-base-content/75 space-y-2">
            <li><strong>Transit Times:</strong> Estimated delivery dates are shipping guidelines and not legal guarantees. Transit delays caused by bad weather, courier traffic, or regional holidays are beyond our control.</li>
            <li><strong>Transit Damage:</strong> Minor transit stress, such as leaf bruising, leaf yellowing, or slight soil displacement, is normal. If a plant arrives dead on arrival (DOA), you must submit photographic evidence within 24 hours of package delivery to request a refund or replacement.</li>
          </ul>
        </div>

        {/* Term 4 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <Ban className="h-4.5 w-4.5 text-accent" /> 4. Order Cancellations and Status Locking
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            Order statuses are tracked in real-time. You can cancel orders directly from your customer profile if the status is marked 'Pending' or 'Confirmed'. Once your order is processed for packing and marked 'Shipped', the status locks, and cancellations are blocked. Administrators are prohibited from canceling user orders without explicit authorization.
          </p>
        </div>

        {/* Term 5 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <AlertOctagon className="h-4.5 w-4.5 text-accent" /> 5. Limitation of Liability
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            While we provide extensive watering, light, and pest guidelines on our plant detail pages, we are not responsible for plant death, root rot, or pest infestations that occur after 15 days of successful receipt in your household. Care difficulties are marked clearly, and it is the customer's responsibility to manage hydration and soil requirements.
          </p>
        </div>

        {/* Term 6 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <FileCheck className="h-4.5 w-4.5 text-accent" /> 6. Governing Law
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            These Terms of Service are governed by and construed in accordance with the laws of India. Any legal disputes arising from transactions on this platform will be settled under the exclusive jurisdiction of the regional courts where GreenThumb corporate operations are registered.
          </p>
        </div>

      </div>

    </div>
  );
};

export default TermsConditions;
