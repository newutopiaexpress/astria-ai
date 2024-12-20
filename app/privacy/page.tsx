import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="w-full max-w-3xl mx-auto pb-12 px-4 mt-36 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-bold py-6">Privacy Policy</h1>  

      {/* Important Notices */}
      <div className="mb-12 space-y-4">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-stone-100 border border-stone-200">
          <AlertCircle className="w-5 h-5 text-stone-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-stone-800">24-Hour Photo Retention</h3>
            <p className="text-stone-600 text-sm">
              For your privacy and security, all uploaded photos are automatically deleted from our servers after 24 hours of processing.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-lg bg-stone-100 border border-stone-200">
          <AlertCircle className="w-5 h-5 text-stone-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-stone-800">30-Day Model Retention</h3>
            <p className="text-stone-600 text-sm">
              AI models generated from your photos are stored for 30 days, after which they are permanently deleted from our system.
            </p>
          </div>
        </div>
      </div>

      {/* Existing Privacy Policy Content */}
      <div className="space-y-6">
        <h2>Privacy Policy for Utopia.photos</h2>
        <p>Last Updated: 2024.12.09.</p>
        <h2>1. Introduction</h2>
        <p>Welcome to Utopia.photos ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our AI-powered photo transformation service.</p>
        <h2>2. Information We Collect</h2>
        <p>2.1 Personal Information: Name and email address, billing information, photos you upload, account credentials, usage data.</p>
        <p>2.2 Automatically Collected Information: IP address, browser type, device information, cookies and similar technologies, usage patterns and preferences.</p>
        <h2>3. How We Use Your Information</h2>
        <p>We use your information to: Provide our photo transformation services, process your payments, improve our services, communicate with you, ensure platform security, comply with legal obligations.</p>
        <h2>4. Photo Usage and Storage</h2>
        <p>4.1 Uploaded Photos: We process your photos to provide our AI transformation services. Your original photos remain your property. We store photos securely for service provision. Photos are deleted 30 days after processing unless otherwise specified.</p>
        <p>4.2 Generated Images: AI-generated images are provided for your personal use. Usage rights are subject to our Terms of Service.</p>
        <h2>5. Data Security</h2>
        <p>We implement appropriate security measures to protect your data, including: Encryption of sensitive data, secure servers, regular security updates, access controls, data backup systems.</p>
        <h2>6. Data Sharing</h2>
        <p>We may share your information with: Service providers who assist our operations, payment processors, cloud storage providers, legal authorities when required by law. We do not sell your personal information to third parties.</p>
        <h2>7. Your Rights</h2>
        <p>You have the right to: Access your personal data, correct inaccurate data, request data deletion, object to data processing, download your data, withdraw consent.</p>
        <h2>8. Cookies</h2>
        <p>We use cookies to: Improve user experience, analyze site usage, remember preferences, provide secure services. You can control cookie settings through your browser.</p>
        <h2>9. Children's Privacy</h2>
        <p>Our service is not intended for children under 13 without parental consent. We do not knowingly collect data from children under 13.</p>
        <h2>10. International Data Transfers</h2>
        <p>We may transfer data internationally. We ensure appropriate safeguards are in place for such transfers.</p>
        <h2>11. Changes to This Policy</h2>
        <p>We may update this policy periodically. We will notify you of significant changes through our website or email.</p>
        <h2>12. Contact Us</h2>
        <p>For privacy-related questions or concerns: Email: [admin@utopia.photos]</p>
        <h2>13. Legal Basis for Processing (GDPR)</h2>
        <p>We process your data based on: Contract performance, legal obligations, legitimate interests, your consent.</p>
        <h2>14. Data Retention</h2>
        <p>We retain your data for: Active accounts: Duration of service, inactive accounts: 30 days, financial records: As required by law, generated images: 30 days.</p>
        <h2>15. Third-Party Services</h2>
        <p>Our service may include links to third-party websites. We are not responsible for their privacy practices.</p>
        <h2>16. California Privacy Rights</h2>
        <p>California residents have additional rights under CCPA. Contact us for details.</p>
        <h2>17. Compliance</h2>
        <p>We comply with: GDPR, CCPA, local data protection laws, industry standards.</p>        
      </div>
    </div>
  );
}

