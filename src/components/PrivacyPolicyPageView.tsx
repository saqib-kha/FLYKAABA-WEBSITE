import React from 'react';

interface PrivacyPolicyPageViewProps {
  onGoHome?: () => void;
  onContactUs?: () => void;
}

export const PrivacyPolicyPageView: React.FC<PrivacyPolicyPageViewProps> = ({
  onContactUs,
}) => {
  return (
    <div className="w-full bg-white min-h-screen text-[#111111] font-sans selection:bg-[#C9A01B]/20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-20 sm:pb-28">
        
        {/* Page Title matching Capture_d9e0ef40.PNG */}
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#111111] mb-6 tracking-tight">
          Privacy Policy
        </h1>

        {/* Effective Date */}
        <p className="text-sm sm:text-base text-[#111111] mb-8">
          <span className="font-bold">Effective Date:</span> 19 September 2026
        </p>

        {/* Introductory Explanation */}
        <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed mb-6 max-w-4xl">
          This Privacy Policy explains how we collect, use, disclose and safeguard your information when you use this website (the &quot;Website&quot;). By using the Website you agree to this policy.
        </p>

        {/* Template Notice matching Capture_d9e0ef40.PNG italic style */}
        <p className="text-sm sm:text-[15px] text-[#4B5563] italic leading-relaxed mb-12 max-w-4xl">
          Template notice: this text is a general starting point. Have it reviewed by a legal adviser and replace it with your final policy before launch.
        </p>

        {/* 1. Information We Collect */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            1. Information We Collect
          </h2>

          <h3 className="text-base sm:text-lg font-bold font-sans text-[#111111] mb-4">
            a. Information you give us
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-[15px] text-[#4B5563] mb-8 marker:text-[#4B5563] max-w-4xl">
            <li>Full name, email address and phone number</li>
            <li>Account details and password (stored securely, never in plain text)</li>
            <li>Booking details, messages and reviews</li>
            <li>For companies: business details and verification documents</li>
          </ul>

          <h3 className="text-base sm:text-lg font-bold font-sans text-[#111111] mb-4">
            b. Information collected automatically
          </h3>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-[15px] text-[#4B5563] marker:text-[#4B5563] max-w-4xl">
            <li>IP address, browser and device type</li>
            <li>Pages visited and search activity</li>
          </ul>
        </section>

        {/* 2. How We Use Your Information */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-[15px] text-[#4B5563] marker:text-[#4B5563] max-w-4xl">
            <li>To create and manage your account and process bookings</li>
            <li>To verify companies and keep the marketplace safe</li>
            <li>To send service messages such as booking updates and verification codes</li>
            <li>To improve and secure the Website</li>
          </ul>
        </section>

        {/* 3. Cookies */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            3. Cookies
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            We use cookies that are needed to keep you signed in and to remember preferences such as language. You can control cookies in your browser settings.
          </p>
        </section>

        {/* 4. Sharing of Information */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            4. Sharing of Information
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            When you send a booking request, the company you chose receives the details needed to fulfil it. We do not sell your personal information. We may share information when required by law.
          </p>
        </section>

        {/* 5. Data Security */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            5. Data Security
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            We use reasonable technical and organisational measures to protect your information. No system is completely secure, so we cannot guarantee absolute security.
          </p>
        </section>

        {/* 6. Data Retention */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            6. Data Retention
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            We keep information for as long as needed to provide the service and meet legal obligations, then delete or anonymise it.
          </p>
        </section>

        {/* 7. Your Rights */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            7. Your Rights
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            You can ask to access, correct or delete your personal information by contacting us using the details on the{' '}
            {onContactUs ? (
              <button
                type="button"
                onClick={onContactUs}
                className="text-[#C9A01B] underline hover:text-[#b89115] font-normal transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            ) : (
              <a
                href="#contact"
                className="text-[#C9A01B] underline hover:text-[#b89115] font-normal transition-colors"
              >
                Contact Us
              </a>
            )}{' '}
            page.
          </p>
        </section>

        {/* 8. Changes to This Policy */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            8. Changes to This Policy
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            We may update this policy from time to time. The effective date above shows when it was last changed.
          </p>
        </section>

        {/* 9. Contact */}
        <section className="mb-16 sm:mb-24">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-6">
            9. Contact
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            Questions about this policy? Please use the{' '}
            {onContactUs ? (
              <button
                type="button"
                onClick={onContactUs}
                className="text-[#C9A01B] underline hover:text-[#b89115] font-normal transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            ) : (
              <a
                href="#contact"
                className="text-[#C9A01B] underline hover:text-[#b89115] font-normal transition-colors"
              >
                Contact Us
              </a>
            )}{' '}
            page.
          </p>
        </section>

      </div>
    </div>
  );
};
