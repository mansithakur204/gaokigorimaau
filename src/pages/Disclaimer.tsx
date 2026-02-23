import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <AlertTriangle className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold">Disclaimer</h1>
      </div>

      <Card>
        <CardContent className="p-6 md:p-8 space-y-4 text-muted-foreground">
          <p>
            The information provided on the Rural Services Portal is collected from official government websites and publicly available resources. While we strive to keep the information accurate and up-to-date, we make no guarantees regarding the completeness, accuracy, or reliability of the content.
          </p>
          <p>
            <strong className="text-foreground">Users are advised to verify all scheme details, eligibility criteria, and application procedures from the respective official government portals</strong> before making any decisions or submitting applications.
          </p>
          <p>
            This portal is an informational aggregator and is not affiliated with or endorsed by any government body. We do not process applications or handle any personal data related to scheme applications.
          </p>
          <p>
            The scheme details, funding amounts, and eligibility criteria may change without notice as government policies are updated. Always refer to the official sources linked on each scheme page for the most current information.
          </p>
          <p>
            By using this portal, you agree that you will use the information solely for reference purposes and that we shall not be liable for any loss or damage arising from the use of this information.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
