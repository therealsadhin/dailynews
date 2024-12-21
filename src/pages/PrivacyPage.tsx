import { Helmet } from 'react-helmet';

export function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - NewsDaily</title>
        <meta name="description" content="Privacy Policy for NewsDaily - Learn how we protect and handle your personal information." />
      </Helmet>
      
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-3xl mx-auto prose">
          <h1>Privacy Policy</h1>
          
          <p>Last updated: January 21, 2024</p>

          <h2>Introduction</h2>
          <p>At NewsDaily, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.</p>

          <h2>Information We Collect</h2>
          <h3>Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li>Subscribe to our newsletter</li>
            <li>Create an account</li>
            <li>Contact us</li>
            <li>Participate in surveys or contests</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Improve user experience</li>
            <li>Send newsletters and updates</li>
            <li>Respond to inquiries</li>
          </ul>

          <h2>Data Security</h2>
          <p>We implement appropriate technical and organizational security measures to protect your personal information.</p>

          <h2>Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at:</p>
          <ul>
            <li>Email: privacy@newsdaily.com</li>
            <li>Address: 123 News Street, Media City, ST 12345</li>
          </ul>
        </div>
      </div>
    </>
  );
}
