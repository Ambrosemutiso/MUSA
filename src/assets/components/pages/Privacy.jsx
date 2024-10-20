import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-black py-10 px-6 lg:px-20">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Privacy Policy</h1>
        
        <p className="mb-4 text-lg">
          Welcome to the Makueni University Students Association (MUSA). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
        </p>
        
        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect information about you in various ways. The information we may collect via our website includes:
        </p>
        <ul className="list-disc list-inside ml-6 mb-6">
          <li>Personal Data: Name, email address, phone number, and other information voluntarily provided by you.</li>
          <li>Usage Data: Information on how you use our services and interact with our platform.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use the collected data to:
        </p>
        <ul className="list-disc list-inside ml-6 mb-6">
          <li>Provide and manage services related to MUSA events and activities.</li>
          <li>Send you important updates and information about our association.</li>
          <li>Analyze and improve our services to enhance your experience.</li>
        </ul>
        
        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">3. Sharing Your Information</h2>
        <p className="mb-4">
          We do not share or sell your personal information to third parties. However, we may share information in the following cases:
        </p>
        <ul className="list-disc list-inside ml-6 mb-6">
          <li>If required by law or to comply with legal obligations.</li>
          <li>To protect the rights, property, or safety of MUSA or others.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">4. Data Security</h2>
        <p className="mb-4">
          We use appropriate security measures to protect your data. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">5. Your Privacy Rights</h2>
        <p className="mb-4">
          You have the right to access, correct, or delete your personal information. You may also choose to stop receiving communication from us by unsubscribing from our mailing list.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">6. Changes to This Policy</h2>
        <p className="mb-4">
          We may update this Privacy Policy periodically. Any changes will be posted on this page with the updated date.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-4">7. Contact Us</h2>
        <p className="mb-4">
          If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:info@officialmusamakueni.co.ke" className="text-blue-800">info@officialmusamakueni.co.ke</a>.
        </p>

        <div className="text-sm text-gray-600 mt-10">
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
