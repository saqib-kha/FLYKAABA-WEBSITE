import React from 'react';

interface TermsConditionsPageViewProps {
  onGoHome?: () => void;
  onContactUs?: () => void;
  onContactSupport?: () => void;
}

export const TermsConditionsPageView: React.FC<TermsConditionsPageViewProps> = ({
  onContactUs,
  onContactSupport,
}) => {
  const handleContact = onContactUs || onContactSupport;

  return (
    <div className="w-full bg-white min-h-screen text-[#111111] font-sans selection:bg-[#C9A01B]/20">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 pt-14 sm:pt-20 pb-20 sm:pb-28">
        
        {/* Page Title matching Capture_53324761.PNG */}
        <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#111111] mb-6 tracking-tight">
          Terms and Conditions
        </h1>

        {/* Effective Date */}
        <p className="text-sm sm:text-base text-[#111111] mb-8">
          <span className="font-bold">Effective Date:</span> 19 September 2026
        </p>

        {/* Introductory Explanation */}
        <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed mb-6 max-w-4xl">
          These Terms and Conditions govern your use of this website and marketplace (the &quot;Marketplace&quot;). By creating an account or making a booking you agree to these terms.
        </p>

        {/* Template Notice matching Capture_53324761.PNG italic style */}
        <p className="text-sm sm:text-[15px] text-[#4B5563] italic leading-relaxed mb-12 max-w-4xl">
          Template notice: this text is a general starting point. Have it reviewed by a legal adviser and replace it with your final terms before launch.
        </p>

        {/* 1. About the Marketplace */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            1. About the Marketplace
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            The Marketplace connects customers with independent, verified transport companies. Vehicles and services are provided by the companies, not by the Marketplace.
          </p>
        </section>

        {/* 2. Accounts */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            2. Accounts
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-[15px] text-[#4B5563] marker:text-[#4B5563] max-w-4xl">
            <li>You must provide accurate information and keep your password confidential.</li>
            <li>You are responsible for activity on your account.</li>
          </ul>
        </section>

        {/* 3. Bookings matching Capture1_a7777bae.PNG */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            3. Bookings
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-[15px] text-[#4B5563] marker:text-[#4B5563] max-w-4xl">
            <li>A booking request becomes a confirmed booking only when the company accepts it.</li>
            <li>The total price is calculated by the Marketplace from the daily price, the number of days and any route price shown at the time of booking.</li>
            <li>Requests that a company does not answer within the set time expire automatically.</li>
          </ul>
        </section>

        {/* 4. Payments */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            4. Payments
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            Payment is currently arranged directly between you and the company after your booking is accepted. Online payments may be introduced later.
          </p>
        </section>

        {/* 5. Cancellations */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            5. Cancellations
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            You can cancel a booking from your account. Cancellation terms shown before you confirm a booking apply.
          </p>
        </section>

        {/* 6. Company Obligations */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            6. Company Obligations
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm sm:text-[15px] text-[#4B5563] marker:text-[#4B5563] max-w-4xl">
            <li>Companies must keep their documents valid and their listings accurate.</li>
            <li>Companies must honour accepted bookings.</li>
          </ul>
        </section>

        {/* 7. Acceptable Use matching Capture2_917b6fed.PNG */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            7. Acceptable Use
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            You must not misuse the Marketplace, attempt to access other accounts, upload harmful files or submit false information.
          </p>
        </section>

        {/* 8. Reviews */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            8. Reviews
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            Only customers who completed a booking may leave a review. Reviews must be honest and lawful; we may hide reviews that break these rules.
          </p>
        </section>

        {/* 9. Limitation of Liability */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            9. Limitation of Liability
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            To the extent permitted by law, the Marketplace is not liable for the acts or omissions of companies or for losses arising from a booking.
          </p>
        </section>

        {/* 10. Changes */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            10. Changes
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            We may update these terms. Continuing to use the Marketplace after a change means you accept the updated terms.
          </p>
        </section>

        {/* 11. Governing Law matching Capture3_25acf7c2.PNG */}
        <section className="mb-12">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            11. Governing Law
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            These terms are governed by the laws of the Kingdom of Saudi Arabia.
          </p>
        </section>

        {/* 12. Contact matching Capture3_25acf7c2.PNG & Capture4_e5298079.PNG */}
        <section className="mb-8">
          <h2 className="font-playfair text-2xl sm:text-[28px] font-bold text-[#111111] mb-4">
            12. Contact
          </h2>
          <p className="text-sm sm:text-[15px] text-[#4B5563] leading-relaxed max-w-4xl">
            Questions about these terms? Please use the{' '}
            <button
              onClick={handleContact}
              className="text-[#C9A01B] hover:text-[#B38F17] underline font-medium cursor-pointer transition-colors"
            >
              Contact Us
            </button>{' '}
            page.
          </p>
        </section>

      </div>
    </div>
  );
};
