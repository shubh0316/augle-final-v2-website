import type { Metadata } from "next";
import Link from "next/link";
import { LegalLayout, legalH2, legalLi, legalLink, legalP, legalUl } from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy — Augle",
  description: "Augle's Privacy Policy — how we collect, use, and protect your information.",
};

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "controller", label: "Data controller" },
  { id: "collect", label: "Information we collect" },
  { id: "sources", label: "Sources of information" },
  { id: "use", label: "How we use information" },
  { id: "legalbasis", label: "Legal basis for processing" },
  { id: "share", label: "How we share information" },
  { id: "subprocessors", label: "Sub-processors" },
  { id: "content", label: "Uploaded documents & session content" },
  { id: "retention", label: "Data retention" },
  { id: "rights", label: "Your rights and choices" },
  { id: "donotsell", label: "Do not sell or share (California)" },
  { id: "cookies", label: "Cookies and tracking technologies" },
  { id: "security", label: "Data security" },
  { id: "breach", label: "Breach notification" },
  { id: "children", label: "Children's privacy" },
  { id: "international", label: "International data transfers" },
  { id: "automated", label: "Automated decision-making" },
  { id: "thirdpartylinks", label: "Third-party links" },
  { id: "changes", label: "Changes to this policy" },
  { id: "contact", label: "Contact us" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout crumbLabel="Privacy Policy" title="Privacy Policy" lastUpdated="Last updated: [Month] 2026" toc={TOC}>
      <h2 id="overview" className={legalH2}>1. Overview</h2>
      <p className={legalP}>
        This Privacy Policy explains how Augle, Inc. (&quot;Augle,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;) collects, uses, shares, and protects information when you use our website,
        application, and multi-agent deliberation services (collectively, the &quot;Service&quot;). It
        applies to visitors, registered users, and anyone whose information we process in connection
        with the Service. By using the Service, you acknowledge the practices described in this Policy.
      </p>

      <h2 id="controller" className={legalH2}>2. Data controller</h2>
      <p className={legalP}>
        Augle, Inc., a Delaware corporation, is the data controller responsible for the personal
        information described in this Policy, except where we act as a processor on behalf of an
        organizational customer, in which case that organization is the controller and Augle&apos;s
        obligations are governed by a separate data processing agreement.
      </p>

      <h2 id="collect" className={legalH2}>3. Information we collect</h2>
      <p className={legalP}>We collect the following categories of information:</p>
      <ul className={legalUl}>
        <li className={legalLi}>
          <strong className="text-ink">Account information</strong> — name, email address, password
          (stored as a salted hash), organization, and role, when you sign up or join the waitlist.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Session content</strong> — the questions, documents, and URLs
          you submit to run a deliberation session, and the resulting Findings and session records.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Payment information</strong> — handled by our third-party
          payment processor; Augle does not store full payment card numbers or bank account details.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Communications</strong> — support requests, survey responses,
          and other correspondence with us.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Usage data</strong> — pages visited, features used, session
          frequency, referring/exit pages, and similar diagnostic information.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Device and log data</strong> — IP address, browser type and
          version, operating system, device identifiers, and standard server log information.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Approximate location</strong> — inferred from IP address, for
          fraud prevention and legal-compliance purposes.
        </li>
      </ul>

      <h2 id="sources" className={legalH2}>4. Sources of information</h2>
      <p className={legalP}>
        We collect information directly from you (account creation, session submissions, support
        requests), automatically through your use of the Service (usage and device data via cookies
        and similar technologies), and, in limited cases, from third parties such as our payment
        processor or, where applicable, single sign-on providers you choose to connect.
      </p>

      <h2 id="use" className={legalH2}>5. How we use information</h2>
      <p className={legalP}>We use collected information to:</p>
      <ul className={legalUl}>
        <li className={legalLi}>
          Provide, operate, and maintain the Service, including running deliberation sessions and
          generating Findings.
        </li>
        <li className={legalLi}>Process credit purchases, manage your account, and provide customer support.</li>
        <li className={legalLi}>
          Improve calibration accuracy and Service quality, including through internal research on
          de-identified or aggregated session data.
        </li>
        <li className={legalLi}>
          Communicate with you about your account, updates, security notices, and support requests.
        </li>
        <li className={legalLi}>
          Send product or marketing communications where permitted, with an opt-out available at any
          time.
        </li>
        <li className={legalLi}>Detect, investigate, and prevent fraud, abuse, or security incidents.</li>
        <li className={legalLi}>
          Comply with legal obligations and enforce our{" "}
          <Link href="/terms" className={legalLink}>Terms of Service</Link>.
        </li>
      </ul>

      <h2 id="legalbasis" className={legalH2}>6. Legal basis for processing</h2>
      <p className={legalP}>
        Where applicable law requires a legal basis for processing (for example, under the EU/UK
        GDPR), we rely on: performance of a contract with you (providing the Service you&apos;ve
        signed up for), our legitimate interests (improving and securing the Service, preventing
        fraud), your consent (for optional communications or cookies, where required), and compliance
        with legal obligations. <em>[To be confirmed with counsel based on your user base&apos;s jurisdictions.]</em>
      </p>

      <h2 id="share" className={legalH2}>7. How we share information</h2>
      <p className={legalP}>We do not sell your personal information. We may share information with:</p>
      <ul className={legalUl}>
        <li className={legalLi}>
          <strong className="text-ink">Service providers</strong> — infrastructure, hosting, payment
          processing, customer support, and analytics vendors who process data on our behalf under
          contractual confidentiality and data-protection obligations.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">AI model providers</strong> — session content is processed by
          third-party language model providers as part of running a deliberation; these providers act
          as data processors under their own data-handling terms and are contractually restricted
          from using your content to train their general-purpose models, except as otherwise
          disclosed.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Professional advisors</strong> — lawyers, accountants,
          auditors, and insurers, as needed and under confidentiality obligations.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Legal and safety</strong> — when required by law, subpoena, or
          court order, or to protect the rights, property, or safety of Augle, our users, or the
          public.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Business transfers</strong> — in connection with a merger,
          acquisition, financing, or sale of assets, subject to standard confidentiality protections
          and, where required, notice to you.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">With your direction</strong> — when you explicitly direct us to
          share information, such as publishing a Finding publicly.
        </li>
      </ul>

      <h2 id="subprocessors" className={legalH2}>8. Sub-processors</h2>
      <p className={legalP}>
        We maintain a current list of sub-processors who may process personal information on our
        behalf (for example, cloud hosting, payment processing, and AI model providers).{" "}
        <em>[A specific, maintained sub-processor list will be published or made available on request prior to launch.]</em>
      </p>

      <h2 id="content" className={legalH2}>9. Uploaded documents &amp; session content</h2>
      <p className={legalP}>
        When you submit a document (PDF or DOCX) or a URL as evidence for a session, Augle processes
        that content to run the deliberation and generate a Finding. URLs are captured once as a
        frozen snapshot at the time of submission, together with a timestamp and content hash, rather
        than accessed live on an ongoing basis. Illustrative or example sessions shown on our public
        Outcomes pages do not contain real user-submitted content unless explicitly labeled otherwise.
      </p>

      <h2 id="retention" className={legalH2}>10. Data retention</h2>
      <p className={legalP}>
        We retain account and session information for as long as your account is active or as needed
        to provide the Service, resolve disputes, and enforce our agreements. Specific retention
        periods vary by data type — for example, financial records are generally retained longer to
        meet tax and accounting obligations, while device logs are generally retained for a shorter
        operational window. <em>[A detailed retention schedule by data category will be finalized with counsel and published here.]</em>{" "}
        You may request deletion of your account and associated data at any time, subject to these
        legal retention requirements.
      </p>

      <h2 id="rights" className={legalH2}>11. Your rights and choices</h2>
      <p className={legalP}>Depending on your location, you may have rights to:</p>
      <ul className={legalUl}>
        <li className={legalLi}>Access the personal information we hold about you.</li>
        <li className={legalLi}>Correct inaccurate or incomplete information.</li>
        <li className={legalLi}>Request deletion of your information.</li>
        <li className={legalLi}>Export your information in a portable format.</li>
        <li className={legalLi}>Object to, or request that we restrict, certain processing.</li>
        <li className={legalLi}>
          Withdraw consent, where processing is based on consent, without affecting prior lawful
          processing.
        </li>
        <li className={legalLi}>Lodge a complaint with your local data protection authority.</li>
      </ul>
      <p className={legalP}>
        To exercise these rights, contact us using the details below. We will respond within the
        timeframe required by applicable law.{" "}
        <em>[Region-specific disclosures, including under GDPR and CCPA/CPRA, and any applicable identity-verification procedure, to be finalized with counsel prior to publication.]</em>
      </p>

      <h2 id="donotsell" className={legalH2}>12. Do not sell or share (California)</h2>
      <p className={legalP}>
        Augle does not sell personal information for money, and does not &quot;share&quot; personal
        information for cross-context behavioral advertising as those terms are defined under the
        California Consumer Privacy Act. <em>[To be confirmed with counsel once advertising/analytics vendor stack is finalized.]</em>
      </p>

      <h2 id="cookies" className={legalH2}>13. Cookies and tracking technologies</h2>
      <p className={legalP}>We use the following categories of cookies and similar technologies:</p>
      <ul className={legalUl}>
        <li className={legalLi}>
          <strong className="text-ink">Strictly necessary</strong> — required for core functionality
          such as staying signed in.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Preference</strong> — remember settings such as display options.
        </li>
        <li className={legalLi}>
          <strong className="text-ink">Analytics</strong> — help us understand how the Service is
          used, in aggregate.
        </li>
      </ul>
      <p className={legalP}>
        You can control cookies through your browser settings; disabling certain cookies may affect
        Service functionality. <em>[A cookie consent banner and preference center will be implemented prior to launch where required by law.]</em>
      </p>

      <h2 id="security" className={legalH2}>14. Data security</h2>
      <p className={legalP}>
        We use technical and organizational measures designed to protect your information, described
        in more detail on our <Link href="/security" className={legalLink}>Security page</Link>. No
        method of transmission or storage is completely secure, and we cannot guarantee absolute
        security.
      </p>

      <h2 id="breach" className={legalH2}>15. Breach notification</h2>
      <p className={legalP}>
        In the event of a security incident affecting your personal information, we will notify
        affected users and, where required, relevant regulators, without undue delay and in
        accordance with applicable law.
      </p>

      <h2 id="children" className={legalH2}>16. Children&apos;s privacy</h2>
      <p className={legalP}>
        The Service is not directed to individuals under 18, and we do not knowingly collect personal
        information from children. If you believe a child has provided us with personal information,
        please contact us so we can investigate and remove it.
      </p>

      <h2 id="international" className={legalH2}>17. International data transfers</h2>
      <p className={legalP}>
        Augle is based in the United States, and information we collect may be transferred to,
        stored, and processed in the United States or other countries where our service providers
        operate, which may have data protection laws different from those in your country. Where
        required, we rely on appropriate safeguards for such transfers, such as Standard Contractual
        Clauses. <em>[Transfer mechanism disclosures to be finalized with counsel prior to publication.]</em>
      </p>

      <h2 id="automated" className={legalH2}>18. Automated decision-making</h2>
      <p className={legalP}>
        Findings are generated by an automated multi-agent system. Augle does not use this automated
        processing to make decisions producing legal or similarly significant effects concerning you
        as an individual; Findings are informational outputs for your own use and judgment.
      </p>

      <h2 id="thirdpartylinks" className={legalH2}>19. Third-party links</h2>
      <p className={legalP}>
        The Service may contain links to third-party websites. We are not responsible for the privacy
        practices of those sites, and encourage you to review their privacy policies.
      </p>

      <h2 id="changes" className={legalH2}>20. Changes to this policy</h2>
      <p className={legalP}>
        We may update this Privacy Policy from time to time. We will post the updated version here
        with a revised &quot;Last updated&quot; date, and where changes are material, we will provide
        additional notice, such as an email or in-product notification.
      </p>

      <h2 id="contact" className={legalH2}>21. Contact us</h2>
      <p className={legalP}>
        Questions about this Privacy Policy, or requests to exercise your privacy rights, can be
        directed to <a href="mailto:privacy@augle.com" className={legalLink}>privacy@augle.com</a>.{" "}
        <em>[A postal address for formal notices will be added prior to publication.]</em>
      </p>
    </LegalLayout>
  );
}
