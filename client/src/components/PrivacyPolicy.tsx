export default function PrivacyPolicy({
  effectiveDate = "9/12/2025",
  contactEmail = "johndifelice@gmail.com",
  siteOrAuthor = "John DiFelice",
  termsHref = "/terms",
}: {
  effectiveDate?: string;
  contactEmail?: string;
  siteOrAuthor?: string;
  termsHref?: string;
}) {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_800px_at_10%_-10%,#1f2937_0,transparent_60%),radial-gradient(1000px_700px_at_110%_10%,#1e293b_0,transparent_60%),#0f172a] text-gray-200">
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <header className="p-6 md:p-7 rounded-2xl border border-gray-800 bg-white/5 shadow-2xl shadow-black/30">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">Privacy Policy</h2>
          <p className="text-gray-400 mt-1">Effective Date: <span>{effectiveDate}</span></p>
          <nav aria-label="Related" className="mt-3">
            <a href={termsHref} className="text-sky-300 border-b border-dashed border-sky-300/60 hover:border-solid">
              Terms of Service
            </a>
          </nav>
        </header>

        <main className="grid gap-4 mt-6">
          <section className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-5">
            <p>
              This Privacy Policy explains how we collect, use, and protect your information when you visit and interact
              with our website, which publishes original works of fiction.
            </p>
          </section>

          <Section
            id="info-we-collect"
            title="1. Information We Collect"
          >
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Personal Information:</strong> If you choose to subscribe to updates, contact us, or submit content,
                we may collect your name, email address, or other details you voluntarily provide.
              </li>
              <li>
                <strong>Non-Personal Information:</strong> We automatically collect certain data such as your IP address,
                browser type, device information, and pages visited for analytics and site improvement.
              </li>
            </ul>
          </Section>

          <Section id="how-we-use" title="2. How We Use Your Information">
            <ul className="list-disc pl-5 space-y-2">
              <li>To deliver updates, newsletters, or notifications you request.</li>
              <li>To respond to inquiries or feedback.</li>
              <li>To analyze site traffic and improve the reading experience.</li>
            </ul>
          </Section>

          <Section id="cookies" title="3. Cookies & Tracking">
            <p>
              We may use cookies or similar technologies to enhance site functionality and analyze usage. You may disable
              cookies in your browser settings, but some site features may not function properly.
            </p>
          </Section>

          <Section id="sharing" title="4. Sharing of Information">
            <p>We do not sell or rent your information. We may share information only:</p>
            <ul className="list-disc pl-5 space-y-2 mt-2">
              <li>
                With service providers who assist in running the website (e.g., hosting, email delivery, analytics) under
                appropriate confidentiality obligations.
              </li>
              <li>
                If required by law, legal process, or to protect our rights, users, or the public.
              </li>
            </ul>
          </Section>

          <Section id="security" title="5. Security">
            <p>
              We take reasonable steps to protect your information, but no method of transmission or storage is 100%
              secure.
            </p>
          </Section>

          <Section id="children" title="6. Children’s Privacy">
            <p>
              Our site is not directed to children under 13, and we do not knowingly collect information from them.
            </p>
          </Section>

          <Section id="changes" title="7. Changes to this Policy">
            <p>
              We may update this Privacy Policy occasionally. The “Effective Date” above indicates the most recent
              version. If changes are material, we may provide additional notice.
            </p>
          </Section>

          <Section id="contact" title="8. Contact">
            <p>
              For questions about this Privacy Policy, please contact us at {" "}
              <a className="text-sky-300 border-b border-dashed border-sky-300/60 hover:border-solid"
                 href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </p>
          </Section>
        </main>

        
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="rounded-2xl border border-gray-800 bg-gray-900/60 backdrop-blur-sm p-5">
      <h2 className="text-emerald-400 text-2xl mb-2 tracking-tight">{title}</h2>
      <div className="space-y-2">{children}</div>
    </section>
  );
}
