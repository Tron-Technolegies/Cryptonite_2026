import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="bg-white text-gray-800 py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Terms & Conditions</h1>
        <p className="text-sm text-gray-500 mb-12">Last updated: January 2026</p>

        {/* Intro */}
        <p className="mb-10 leading-relaxed text-gray-700">
          Welcome to <span className="text-green-600 font-semibold">Cryptonite</span>. By accessing
          or using our website, you agree to be bound by these Terms and Conditions. If you do not
          agree with any part of these terms, please discontinue use of our platform.
        </p>

        {/* Content */}
        <div className="space-y-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Use of Website</h2>
            <p>
              You agree to use Cryptonite only for lawful purposes and in a way that does not
              infringe the rights of others or restrict their use of the platform.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Intellectual Property</h2>
            <p>
              All content, including text, visuals, graphics, logos, and code, belongs to Cryptonite
              and is protected under intellectual property laws. Unauthorized use is strictly
              prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Services</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our services at
              any time without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. User Responsibilities</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Do not attempt to damage or exploit the platform</li>
              <li>Do not submit false, misleading, or harmful content</li>
              <li>Do not engage in illegal or unethical activities</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Limitation of Liability</h2>
            <p>
              Cryptonite shall not be liable for any direct, indirect, incidental, or consequential
              damages arising from the use or inability to use our services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Third-Party Links</h2>
            <p>
              Our platform may contain links to third-party websites. Cryptonite is not responsible
              for the content or practices of these external sites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Privacy</h2>
            <p>Your use of Cryptonite is also governed by our Privacy Policy.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to Terms</h2>
            <p>
              We may update these Terms & Conditions at any time. Continued use of the platform
              indicates acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Governing Law</h2>
            <p>These terms are governed and interpreted according to the laws of India.</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Contact Us</h2>
            <p>If you have any questions about these Terms & Conditions, please contact us at:</p>
            <p className="mt-2 text-green-600 font-medium">support@cryptonite.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
