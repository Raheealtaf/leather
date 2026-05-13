// app/privacy-policy/page.tsx
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#111] font-sans pt-20 md:pt-32 pb-24">
      {/* ── HEADER ── */}
      <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 md:mb-24">
        <p className="text-[#C8A96E] font-bold tracking-[0.25em] uppercase text-[10px] mb-6">
          Legal & Compliance
        </p>
        <h1 className="text-3xl md:text-5xl font-serif tracking-wide mb-6 text-[#111]">
          Privacy Policy
        </h1>
        <p className="text-[11px] tracking-[0.1em] uppercase text-gray-400">
          Last Updated: May 2026
        </p>
      </section>

      {/* ── CONTENT BODY ── */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="space-y-16 text-sm text-gray-600 leading-loose font-light">
          {/* Section 1 */}
          <div>
            <h2 className="text-xl font-serif text-[#111] mb-6 border-b border-gray-200/50 pb-4">
              1. Introduction
            </h2>
            <div className="space-y-4">
              <p>
                At RS Leather, we respect your privacy and are committed to
                protecting your personal data. This Privacy Policy will inform
                you as to how we look after your personal data when you visit
                our website (regardless of where you visit it from) and tell you
                about your privacy rights and how the law protects you.
              </p>
              <p>
                By using our website and services, you agree to the collection,
                use, and disclosure of your information as described in this
                Privacy Policy.
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h2 className="text-xl font-serif text-[#111] mb-6 border-b border-gray-200/50 pb-4">
              2. Information We Collect
            </h2>
            <div className="space-y-4">
              <p>
                We may collect, use, store and transfer different kinds of
                personal data about you which we have grouped together follows:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-500">
                <li>
                  <strong className="text-gray-700 font-medium">
                    Identity Data:
                  </strong>{" "}
                  includes first name, last name, username or similar
                  identifier.
                </li>
                <li>
                  <strong className="text-gray-700 font-medium">
                    Contact Data:
                  </strong>{" "}
                  includes billing address, delivery address, email address, and
                  telephone numbers.
                </li>
                <li>
                  <strong className="text-gray-700 font-medium">
                    Financial Data:
                  </strong>{" "}
                  includes payment card details (processed securely via our
                  third-party payment gateways; we do not store full card
                  numbers).
                </li>
                <li>
                  <strong className="text-gray-700 font-medium">
                    Transaction Data:
                  </strong>{" "}
                  includes details about payments to and from you and other
                  details of products you have purchased from us.
                </li>
                <li>
                  <strong className="text-gray-700 font-medium">
                    Technical Data:
                  </strong>{" "}
                  includes internet protocol (IP) address, your login data,
                  browser type and version, time zone setting and location.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 3 */}
          <div>
            <h2 className="text-xl font-serif text-[#111] mb-6 border-b border-gray-200/50 pb-4">
              3. How We Use Your Information
            </h2>
            <div className="space-y-4">
              <p>
                We will only use your personal data when the law allows us to.
                Most commonly, we will use your personal data in the following
                circumstances:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-500">
                <li>
                  To process and deliver your order, including managing
                  payments, fees, and charges.
                </li>
                <li>
                  To manage our relationship with you, including notifying you
                  about changes to our terms or privacy policy.
                </li>
                <li>
                  To administer and protect our business and this website
                  (including troubleshooting, data analysis, testing, system
                  maintenance).
                </li>
                <li>
                  To deliver relevant website content and advertisements to you
                  and measure or understand the effectiveness of the advertising
                  we serve to you.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 4 */}
          <div>
            <h2 className="text-xl font-serif text-[#111] mb-6 border-b border-gray-200/50 pb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <div className="space-y-4">
              <p>
                We use cookies and similar tracking technologies to track the
                activity on our service and hold certain information. Cookies
                are files with a small amount of data which may include an
                anonymous unique identifier.
              </p>
              <p>
                You can instruct your browser to refuse all cookies or to
                indicate when a cookie is being sent. However, if you do not
                accept cookies, you may not be able to use some portions of our
                website.
              </p>
            </div>
          </div>

          {/* Section 5 */}
          <div>
            <h2 className="text-xl font-serif text-[#111] mb-6 border-b border-gray-200/50 pb-4">
              5. Data Security
            </h2>
            <div className="space-y-4">
              <p>
                We have put in place appropriate security measures to prevent
                your personal data from being accidentally lost, used or
                accessed in an unauthorized way, altered, or disclosed. In
                addition, we limit access to your personal data to those
                employees, agents, contractors, and other third parties who have
                a business need to know.
              </p>
            </div>
          </div>

          {/* Section 6 */}
          <div>
            <h2 className="text-xl font-serif text-[#111] mb-6 border-b border-gray-200/50 pb-4">
              6. Your Legal Rights
            </h2>
            <div className="space-y-4">
              <p>
                Under certain circumstances, you have rights under data
                protection laws in relation to your personal data, including the
                right to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-gray-500">
                <li>Request access to your personal data.</li>
                <li>Request correction of your personal data.</li>
                <li>Request erasure of your personal data.</li>
                <li>Object to processing of your personal data.</li>
                <li>Request restriction of processing your personal data.</li>
              </ul>
              <p>
                If you wish to exercise any of the rights set out above, please
                contact us.
              </p>
            </div>
          </div>

          {/* Section 7 */}
          <div>
            <h2 className="text-xl font-serif text-[#111] mb-6 border-b border-gray-200/50 pb-4">
              7. Contact Us
            </h2>
            <div className="space-y-4">
              <p>
                If you have any questions about this Privacy Policy or our
                privacy practices, please contact us at:
              </p>
              <div className="bg-white border border-gray-200/50 p-8 mt-4 text-center sm:text-left">
                <p className="font-serif text-lg text-[#111] mb-2">
                  RS Leather
                </p>
                <p className="text-gray-500 mb-1">Lahore, Punjab, Pakistan</p>
                <p className="text-gray-500 mb-4">
                  Email: support@rsleathers.com
                </p>
                <Link
                  href="/contact"
                  className="inline-block text-[10px] font-bold tracking-[0.2em] uppercase text-[#111] border-b border-[#111] pb-1 hover:text-[#C8A96E] hover:border-[#C8A96E] transition-colors"
                >
                  Go to Contact Page
                </Link>
              </div>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}
