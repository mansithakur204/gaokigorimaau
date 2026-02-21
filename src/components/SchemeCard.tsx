import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { ExternalLink, IndianRupee, Sprout, GraduationCap, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SchemeCardProps {
  id: string;
  schemeName: string;
  details: string | null;
  type: string;
  category: string;
  fundingAmount: string | null;
  applicationLink: string | null;
}

const categoryIcons: Record<string, React.ReactNode> = {
  Farmers: <Sprout className="w-5 h-5" />,
  Students: <GraduationCap className="w-5 h-5" />,
  Women: <Heart className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  Farmers: 'bg-secondary text-secondary-foreground',
  Students: 'bg-accent text-accent-foreground',
  Women: 'bg-primary text-primary-foreground',
};

export default function SchemeCard({ id, schemeName, details, type, category, fundingAmount, applicationLink }: SchemeCardProps) {
  const { t } = useLanguage();

  return (
    <Card className="category-card-hover flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge className={categoryColors[category] ?? 'bg-muted text-muted-foreground'}>
            <span className="mr-1">{categoryIcons[category]}</span>
            {category}
          </Badge>
          <Badge variant="outline">{type}</Badge>
        </div>
        <CardTitle className="text-lg mt-2 line-clamp-2">{schemeName}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground text-sm line-clamp-3">{details}</p>
        {fundingAmount && (
          <div className="flex items-center gap-1 mt-3 text-sm font-semibold text-secondary">
            <IndianRupee className="w-4 h-4" />
            {fundingAmount}
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 gap-2">
        <Link to={`/scheme/${id}`} className="flex-1">
          <Button variant="outline" className="w-full" size="sm">{t('scheme.details')}</Button>
        </Link>
        {applicationLink && (
          <a href={applicationLink} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="gap-1">
              {t('scheme.apply')} <ExternalLink className="w-3 h-3" />
            </Button>
          </a>
        )}
      </CardFooter>
    </Card>
  );
}
