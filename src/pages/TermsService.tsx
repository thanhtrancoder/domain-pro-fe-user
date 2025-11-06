const TermsService: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl">
        {/* Header Section */}
        <div className="from-primary to-primary-hover bg-gradient-to-r px-8 py-10">
          <h1 className="text-center text-3xl font-bold text-white">
            Terms of Service
          </h1>
          <p className="mt-2 text-center text-blue-100">
            Last updated: Oct 15, 2025
          </p>
        </div>

        {/* Content Section */}
        <div className="px-8 py-8">
          {/* Introduction */}
          <div className="mb-8">
            <p className="leading-relaxed text-gray-700">
              Welcome to our domain registration service. By using our services,
              you agree to comply with the terms and conditions outlined below.
              Please read these terms carefully before using our services.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            {/* Section 1 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                1. Acceptance of Terms
              </h2>
              <p className="leading-relaxed text-gray-700">
                By using our services, you confirm that you have read,
                understood, and agree to be bound by these Terms of Service. If
                you do not agree with any part of these terms, you may not use
                our services.
              </p>
            </div>

            {/* Section 2 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                2. Service Description
              </h2>
              <p className="mb-3 leading-relaxed text-gray-700">
                Our services include:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>New domain registration</li>
                <li>Domain renewal</li>
                <li>Domain transfer</li>
                <li>DNS management</li>
                <li>Privacy protection</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                3. User Responsibilities
              </h2>
              <p className="mb-3 leading-relaxed text-gray-700">
                As a user of our services, you agree to:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>Provide accurate, complete, and up-to-date information</li>
                <li>Not use domains for illegal activities</li>
                <li>Not violate third-party intellectual property rights</li>
                <li>Not send spam or engage in fraudulent activities</li>
                <li>
                  Maintain the confidentiality of your account information
                </li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                4. Payment and Renewal
              </h2>
              <p className="mb-3 leading-relaxed text-gray-700">
                Regarding domain payment and renewal:
              </p>
              <ul className="ml-4 list-inside list-disc space-y-2 text-gray-700">
                <li>All payments must be made in full and on time</li>
                <li>Prices may change without prior notice</li>
                <li>Domains may be cancelled if not renewed on time</li>
                <li>No refunds for registered domains</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                5. Service Cancellation
              </h2>
              <p className="leading-relaxed text-gray-700">
                You can cancel our services at any time. However, we do not
                provide refunds for completed payments. Upon cancellation, you
                will lose access to registered domains.
              </p>
            </div>

            {/* Section 6 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                6. Security
              </h2>
              <p className="leading-relaxed text-gray-700">
                We are committed to protecting your personal information in
                accordance with our privacy policy. However, we are not
                responsible for any data leaks caused by third parties or by
                your own actions.
              </p>
            </div>

            {/* Section 7 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                7. Limitation of Liability
              </h2>
              <p className="leading-relaxed text-gray-700">
                To the maximum extent permitted by law, we are not liable for
                any indirect, special, incidental, or consequential damages
                arising from the use of or inability to use our services.
              </p>
            </div>

            {/* Section 8 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                8. Changes to Terms
              </h2>
              <p className="leading-relaxed text-gray-700">
                We reserve the right to change these Terms of Service at any
                time. Changes take effect immediately upon being posted on our
                website. Your continued use of the services after changes are
                posted constitutes acceptance of the updated terms.
              </p>
            </div>

            {/* Section 9 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                9. Dispute Resolution
              </h2>
              <p className="leading-relaxed text-gray-700">
                Any disputes arising from or related to these Terms of Service
                will be resolved under the laws of the country where our
                headquarters are located.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-primary-hover border-l-4 pl-4">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                10. Contact
              </h2>
              <p className="leading-relaxed text-gray-700">
                If you have any questions about these Terms of Service, please
                contact us via email: support@domainpro.com or by phone: (123)
                456-7890.
              </p>
            </div>
          </div>

          {/* Agreement Section */}
          {/* <div className="mt-12 rounded-lg bg-blue-50 p-6">
            <p className="mb-6 text-center text-gray-700">
              By clicking the "I Agree" button below, you confirm that you have
              read, understood, and agree to comply with these Terms of Service.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="focus:ring-opacity-50 rounded-lg bg-gray-300 px-6 py-3 font-medium text-gray-700 transition duration-300 hover:bg-gray-400 focus:ring-2 focus:ring-gray-500 focus:outline-none">
                I Do Not Agree
              </button>
              <button className="focus:ring-opacity-50 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                I Agree
              </button>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default TermsService;
