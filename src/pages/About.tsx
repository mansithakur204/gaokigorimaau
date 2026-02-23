import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Search, ExternalLink, ShieldCheck } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();

  const features = [
    { icon: Target, title: 'Category-Based Browsing', desc: 'Browse schemes organized by Farmers, Students, Women, and General categories.' },
    { icon: Search, title: 'Smart Search', desc: 'Find schemes using keyword search, voice search, and category/state filters.' },
    { icon: ExternalLink, title: 'Official Apply Links', desc: 'Direct links to official government portals for scheme applications.' },
    { icon: ShieldCheck, title: 'Verified Information', desc: 'All scheme details sourced from official government websites.' },
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6">About Rural Services Portal</h1>
      <p className="text-lg text-muted-foreground mb-8">
        The Rural Services Portal is a one-stop platform that aggregates government schemes and welfare programs from various central and state government departments. Our mission is to bridge the information gap and make it easier for citizens — especially in rural areas — to discover, understand, and apply for government benefits.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        {features.map((f) => (
          <Card key={f.title} className="category-card-hover">
            <CardContent className="p-6 flex gap-4 items-start">
              <f.icon className="w-8 h-8 text-primary shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-lg">{f.title}</h3>
                <p className="text-muted-foreground text-sm mt-1">{f.desc}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-3">Our Goal</h2>
          <p className="text-muted-foreground">
            We believe every citizen has the right to easily access information about government schemes designed for their welfare. This portal simplifies the discovery process by presenting scheme details, eligibility criteria, required documents, and direct application links — all in one place, in both English and Hindi.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
