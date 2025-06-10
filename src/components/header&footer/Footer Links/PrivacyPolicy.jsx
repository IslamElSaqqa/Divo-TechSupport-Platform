import React from "react";


function PrivacyPolicy() {

  return (
    <div className="privacy-policy p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        At Divo, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our application and related services. By using Divo, you consent to the practices described below.
      </p>

      <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
      <p className="mb-4">
        We collect several types of information to provide and improve our services:
        <ul className="list-disc ml-6">
          <li><strong>Personal Information:</strong> Includes your name, email address, phone number, and payment details (for remote sessions).</li>
          <li><strong>Location Data:</strong> Used to find nearby repair shops and provide accurate map navigation.</li>
          <li><strong>Device Information:</strong> Includes IP address, browser type, device model, and operating system.</li>
          <li><strong>Community Interactions:</strong> Posts, comments, and shared content in our Community Tab.</li>
          <li><strong>Error Queries:</strong> Searches and saved logs related to error messages you inquire about.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to:
        <ul className="list-disc ml-6">
          <li>Match you with nearby laptop repair shops based on your location.</li>
          <li>Help you compare real-time product prices across e-commerce platforms.</li>
          <li>Enable communication and knowledge sharing through the Community Tab.</li>
          <li>Provide remote assistance via remote access tools (e.g., AnyDesk).</li>
          <li>Diagnose and assist with software issues by referencing your submitted error logs.</li>
          <li>Improve the functionality, security, and performance of the app.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">3. Cookies and Tracking Technologies</h2>
      <p className="mb-4">
        Divo may use cookies and similar tracking technologies to analyze app usage, improve performance, and personalize your experience. You can disable cookies through your browser settings, but this may affect some features of the service.
      </p>

      <h2 className="text-xl font-semibold mb-2">4. Web Scraping and Price Aggregation</h2>
      <p className="mb-4">
        To support our price comparison feature, we use web scraping tools to collect publicly available price data from third-party e-commerce platforms. This data is stored temporarily and refreshed periodically. We do not collect or store any user credentials for these platforms.
      </p>

      <h2 className="text-xl font-semibold mb-2">5. Data Sharing and Disclosure</h2>
      <p className="mb-4">
        We do not sell or rent your personal data to third parties. We may share data with:
        <ul className="list-disc ml-6">
          <li>Trusted service providers who help us operate and maintain our app (e.g., payment processors, hosting services).</li>
          <li>Technicians during remote support sessions, only with your explicit permission.</li>
          <li>Authorities, if required by law or to protect our rights, users, or platform.</li>
        </ul>
      </p>

      <h2 className="text-xl font-semibold mb-2">6. Data Security</h2>
      <p className="mb-4">
        We implement industry-standard security measures to protect your data, including encryption, firewalls, and secure authentication methods. However, no transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold mb-2">7. Children’s Privacy</h2>
      <p className="mb-4">
        Divo is not intended for use by individuals under the age of 13. We do not knowingly collect personal data from children. If we become aware that a child has provided us with personal information, we will delete it promptly.
      </p>

      <h2 className="text-xl font-semibold mb-2">8. Changes to This Privacy Policy</h2>
      <p className="mb-4">
        We may update this policy from time to time to reflect changes in our practices or legal requirements. We will notify users of significant changes by posting a notice in the app or sending a notification. Continued use of the app after changes are posted constitutes your acceptance of the updated policy.
      </p>

      <h2 className="text-xl font-semibold mb-2">9. Your Rights and Choices</h2>
      <p className="mb-4">
        You have the right to access, correct, or delete your personal information at any time. You may also withdraw consent for specific data processing features by adjusting your settings or contacting us directly.
      </p>

      <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at: <br />
        <strong>Email:</strong> divomobilerepairs@divoapp.com
      </p>
    </div>
  );
}

export default PrivacyPolicy;
