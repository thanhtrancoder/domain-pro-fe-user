import { CheckIcon } from "../components/icons/Icon";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-lg bg-white shadow-xl">
          <div className="from-primary to-primary-hover bg-gradient-to-r px-6 py-8 text-center">
            <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
            <p className="mt-2 text-blue-100">Last updated: Oct 15, 2025</p>
          </div>

          <div className="px-6 py-8">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Introduction
              </h2>
              <p className="leading-relaxed text-gray-600">
                At Domain Registration Company, we are committed to protecting
                your personal information. This Privacy Policy explains how we
                collect, use, and protect your information when you use our
                domain registration services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Information We Collect
              </h2>
              <div className="border-primary-hover mb-4 border-l-4 bg-blue-50 p-4">
                <p className="text-gray-700">
                  We collect the following types of information to provide and
                  improve our services:
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-6 text-gray-600">
                <li>
                  Personal information: Name, email address, phone number,
                  billing address
                </li>
                <li>Account information: Username, password (encrypted)</li>
                <li>
                  Domain information: Domains you register, DNS details,
                  transfer information
                </li>
                <li>
                  Payment information: Credit card, bank account details
                  (handled by secure third-party processors)
                </li>
                <li>
                  Usage data: Information about how you interact with our
                  website
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                How We Use Your Information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    To provide services
                  </h3>
                  <p className="text-sm text-gray-600">
                    Domain registration, renewal, transfer, and account
                    management
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    To improve services
                  </h3>
                  <p className="text-sm text-gray-600">
                    Analyze data to understand needs and improve user experience
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    To communicate
                  </h3>
                  <p className="text-sm text-gray-600">
                    Send important notifications about your account and services
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    To comply with the law
                  </h3>
                  <p className="text-sm text-gray-600">
                    Respond to legal and regulatory requirements of domain
                    registries
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Sharing Your Information
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                We do not sell, trade, or rent your personal information to
                third parties. We only share your information in the following
                cases:
              </p>
              <div className="mb-4 border-l-4 border-yellow-500 bg-yellow-50 p-4">
                <p className="text-gray-700">
                  The domain owner's contact information (excluding
                  privacy-protected details) may be made public as required by
                  ICANN and domain registries.
                </p>
              </div>
              <ul className="list-disc space-y-2 pl-6 text-gray-600">
                <li>With payment service providers to process transactions</li>
                <li>With domain registries to manage your domains</li>
                <li>With law enforcement agencies upon valid request</li>
                <li>With business partners under confidentiality agreements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Information Security
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                We apply appropriate security measures to protect your
                information:
              </p>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Encrypt sensitive data with SSL/TLS
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Restrict access to personal information
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Regularly review and update security measures
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <CheckIcon className="h-5 w-5" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-gray-700">
                      Data backups and disaster recovery plans
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Cookies and Tracking Technologies
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                We use cookies and similar technologies to enhance your
                experience on our website:
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                      >
                        Cookie Type
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                      >
                        Purpose
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                      >
                        Retention Period
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    <tr>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        Essential cookies
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        Ensure the website functions correctly
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        Session
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        Performance cookies
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        Collect statistical information
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        1 year
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                        Functional cookies
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        Remember your settings
                      </td>
                      <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                        30 days
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Your Rights
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                You have the following rights regarding your personal
                information:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Right of access
                  </h3>
                  <p className="text-sm text-gray-600">
                    Request a copy of your personal information
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Right to rectification
                  </h3>
                  <p className="text-sm text-gray-600">
                    Update or correct inaccurate information
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Right to erasure
                  </h3>
                  <p className="text-sm text-gray-600">
                    Request deletion of your personal information
                  </p>
                </div>
                <div className="rounded-lg border border-gray-200 p-4">
                  <h3 className="mb-2 font-semibold text-gray-800">
                    Right to restriction
                  </h3>
                  <p className="text-sm text-gray-600">
                    Restrict processing of your information
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Changes to This Privacy Policy
              </h2>
              <p className="leading-relaxed text-gray-600">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page and, where significant, we will
                notify you via email or a notice on our website.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                Contact
              </h2>
              <p className="mb-4 leading-relaxed text-gray-600">
                If you have any questions or concerns about this Privacy Policy,
                please contact us:
              </p>
              <div className="rounded-lg bg-gray-50 p-6">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-gray-900">support@domainpro.com</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p className="text-gray-900">(028) 1234 5678</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Address</p>
                  <p className="text-gray-900">
                    123 Technology Street, District 1, Ho Chi Minh City, Vietnam
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
