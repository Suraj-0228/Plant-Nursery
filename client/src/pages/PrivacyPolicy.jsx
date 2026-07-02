import React from 'react';
import { ShieldCheck, Lock, Eye, FileText, Database, Key, RefreshCw, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 space-y-12 animate-fade-in-up">
      
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-2">
          <ShieldCheck className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold font-heading text-base-content tracking-tight">
          Privacy & Data Protection Policy
        </h1>
        <p className="text-base-content/70 text-sm max-w-xl mx-auto">
          Last Updated: July 2, 2026. This comprehensive document describes how GreenThumb Nursery manages and protects your personal, financial, and botanical transaction records.
        </p>
      </div>

      {/* Intro Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-base-300/40 bg-base-200/50 glass-card space-y-4">
        <h2 className="text-xl font-bold font-heading text-primary flex items-center gap-2">
          <FileText className="h-5 w-5" /> 1. Commitment to Data Sanctity
        </h2>
        <p className="text-sm text-base-content/85 leading-relaxed">
          At GreenThumb Nursery, the privacy of our gardening community is paramount. We treat your personal details with the same level of care that we dedicate to cultivating our premium live plants. This policy describes our processing practices, data collections, security protocols, and your user rights under global privacy rules.
        </p>
      </div>

      {/* Main Content Sections */}
      <div className="space-y-8">
        
        {/* Section 2 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <Eye className="h-4.5 w-4.5 text-accent" /> 2. Personal Data We Collect
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed mb-2">
            To provide a seamless botanical e-commerce experience, we collect specific categories of information when you interact with our platform:
          </p>
          <ul className="list-disc pl-6 text-sm text-base-content/75 space-y-2">
            <li><strong>Account Profiles:</strong> Username, email coordinates, hashed security credentials, and registered account metadata created during signup.</li>
            <li><strong>Shipping and Logistics Parameters:</strong> Full legal name, destination street addresses, contact phone numbers, state, zip/postal codes, and custom delivery instructions.</li>
            <li><strong>Transaction Histories:</strong> Records of plants ordered, wishlist item saves, cart contents, total amounts paid, and selected payment methods.</li>
            <li><strong>Device Analytics:</strong> IP addresses, browser specifications, access timestamps, and page interaction flows collected via local browser storage to optimize site responsiveness.</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <Database className="h-4.5 w-4.5 text-accent" /> 3. Data Processing and Storage Bases
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            We process your information under defined legal bases:
          </p>
          <ul className="list-disc pl-6 text-sm text-base-content/75 space-y-2">
            <li><strong>Contractual Fulfillment:</strong> Processing shipping addresses is necessary to package and deliver your ordered live plants.</li>
            <li><strong>Legitimate Interests:</strong> Running site analytics, managing dynamic stock checks, displaying low stock notices, and tracking sales performance.</li>
            <li><strong>Consent:</strong> Storing and polling your wishlist items to show badge updates, and sending optional newsletter care reminders.</li>
          </ul>
        </div>

        {/* Section 4 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <Lock className="h-4.5 w-4.5 text-accent" /> 4. Payment Gateway Integrity
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            All monetary transactions are routed through encrypted payment processors (such as Stripe or Razorpay). GreenThumb developers and administrators do not view, capture, or store your raw credit card numbers, CVV codes, UPI pins, or online banking passwords on our local database servers. All connections are secured using industry-standard SSL (Secure Sockets Layer) encryption layers.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <RefreshCw className="h-4.5 w-4.5 text-accent" /> 5. Data Sharing with Third Parties
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            We do not sell, rent, or trade your personal information. We share your destination details exclusively with trusted courier services (such as Delhivery or BlueDart) solely to fulfill shipping logistics. In exceptional cases, data may be disclosed to comply with legal warrants or protect the safety of our customers and nursery workers.
          </p>
        </div>

        {/* Section 6 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <Key className="h-4.5 w-4.5 text-accent" /> 6. Your Rights and Data Control
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            You hold complete ownership of your personal data. From your profile settings page, you can access, update, or completely delete your saved addresses and account files. If you choose to delete your account, all associated database records (excluding completed tax-compliant sales invoices) are permanently removed from our active databases.
          </p>
        </div>

        {/* Section 7 */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold font-heading text-base-content flex items-center gap-2">
            <AlertCircle className="h-4.5 w-4.5 text-accent" /> 7. Policy Adjustments
          </h3>
          <p className="text-sm text-base-content/75 leading-relaxed">
            We review and update this privacy documentation as new greenhouse technologies are integrated. We will notify registered users via system alerts or emails if major changes are deployed.
          </p>
        </div>

      </div>

    </div>
  );
};

export default PrivacyPolicy;
