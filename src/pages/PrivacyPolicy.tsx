import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold">Privacy Policy</h1>
      </div>

      <Card>
        <CardContent className="p-6 md:p-8 space-y-5 text-muted-foreground">
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Information We Collect</h2>
            <p>We collect minimal information necessary for account creation (email and name). We do not collect any sensitive personal data related to your government scheme applications.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">How We Use Your Information</h2>
            <p>Your information is used solely for authentication and personalization purposes. We do not sell, share, or distribute your personal information to third parties.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Data Sources</h2>
            <p>Scheme information displayed on this portal is sourced from official government websites including india.gov.in, pmjdy.gov.in, and other respective ministry portals.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Cookies</h2>
            <p>We use essential cookies for authentication and session management. No tracking cookies are used.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-foreground mb-2">Contact</h2>
            <p>If you have questions about this privacy policy, please reach out through our Contact page.</p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
