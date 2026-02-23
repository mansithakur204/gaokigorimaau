import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowLeft, ExternalLink, IndianRupee, CheckCircle, FileText, Gift, Phone, HelpCircle } from 'lucide-react';

export default function SchemeDetail() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const [scheme, setScheme] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('schemes').select('*').eq('id', id!).single().then(({ data }) => {
      setScheme(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="container mx-auto px-4 py-16 text-center text-muted-foreground">{t('common.loading')}</div>;
  if (!scheme) return <div className="container mx-auto px-4 py-16 text-center">Scheme not found</div>;

  const faqItems: { question: string; answer: string }[] = Array.isArray(scheme.faq) ? scheme.faq : [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Link to="/home" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="w-4 h-4" /> {t('common.back')}
      </Link>

      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary text-primary-foreground">{scheme.category}</Badge>
            <Badge variant="outline">{scheme.type}</Badge>
            {scheme.state && scheme.state !== 'All India' && <Badge variant="secondary">{scheme.state}</Badge>}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold">{scheme.scheme_name}</h1>

          {scheme.funding_amount && (
            <div className="flex items-center gap-2 text-lg font-semibold text-secondary">
              <IndianRupee className="w-5 h-5" />
              {t('scheme.funding')}: {scheme.funding_amount}
            </div>
          )}

          <div>
            <h3 className="font-semibold mb-2">{t('scheme.details')}</h3>
            <p className="text-muted-foreground whitespace-pre-wrap">{scheme.details}</p>
          </div>

          {scheme.eligibility && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-1">
                <CheckCircle className="w-4 h-4 text-secondary" /> {t('scheme.eligibility')}
              </h3>
              <p className="text-muted-foreground">{scheme.eligibility}</p>
            </div>
          )}

          {scheme.benefits && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-1">
                <Gift className="w-4 h-4 text-primary" /> Benefits
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{scheme.benefits}</p>
            </div>
          )}

          {scheme.documents && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-1">
                <FileText className="w-4 h-4 text-accent" /> Required Documents
              </h3>
              <p className="text-muted-foreground whitespace-pre-wrap">{scheme.documents}</p>
            </div>
          )}

          {scheme.helpline && (
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-1">
                <Phone className="w-4 h-4 text-secondary" /> Helpline
              </h3>
              <p className="text-muted-foreground">{scheme.helpline}</p>
            </div>
          )}

          {faqItems.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-1">
                <HelpCircle className="w-4 h-4 text-primary" /> Frequently Asked Questions
              </h3>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((faq, i) => (
                  <AccordionItem key={i} value={`faq-${i}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {scheme.application_link && (
            <a href={scheme.application_link} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="w-full gap-2 text-lg mt-4">
                {t('scheme.apply')} <ExternalLink className="w-5 h-5" />
              </Button>
            </a>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
