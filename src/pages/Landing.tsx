import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import CategoryCards from '@/components/CategoryCard';
import SchemeCard from '@/components/SchemeCard';
import heroImage from '@/assets/hero-rural.jpg';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Clock, Star } from 'lucide-react';

export default function Landing() {
  const { t, toggleLang, lang } = useLanguage();
  const { user } = useAuth();
  const [latestSchemes, setLatestSchemes] = useState<any[]>([]);
  const [popularSchemes, setPopularSchemes] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('schemes').select('*').order('created_at', { ascending: false }).limit(4)
      .then(({ data }) => setLatestSchemes(data ?? []));
    supabase.from('schemes').select('*').eq('is_popular', true).order('click_count', { ascending: false }).limit(4)
      .then(({ data }) => setPopularSchemes(data ?? []));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Rural India" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4 py-24 md:py-40">
          <div className="max-w-2xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button variant="outline" size="sm" onClick={toggleLang} className="mb-4 bg-card/20 border-card/30 text-card gap-1 backdrop-blur-sm">
                <Globe className="w-4 h-4" />
                {lang === 'en' ? 'हिंदी में देखें' : 'View in English'}
              </Button>
              <h1 className="text-4xl md:text-6xl font-extrabold text-card leading-tight">
                {t('landing.title')}
              </h1>
              <p className="text-lg md:text-xl text-card/80 mt-4">
                {t('landing.subtitle')}
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link to="/home">
                  <Button size="lg" className="text-lg gap-2 px-8">
                    {t('landing.cta')} <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
                {!user && (
                  <Link to="/login">
                    <Button size="lg" variant="outline" className="text-lg px-8 bg-card/10 border-card/30 text-card backdrop-blur-sm">
                      {t('landing.login')}
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10">{t('nav.schemes')}</h2>
        <CategoryCards />
      </section>

      {/* Latest Schemes */}
      {latestSchemes.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Latest Schemes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestSchemes.map(s => (
              <SchemeCard key={s.id} id={s.id} schemeName={s.scheme_name} details={s.details} type={s.type} category={s.category} fundingAmount={s.funding_amount} applicationLink={s.application_link} />
            ))}
          </div>
        </section>
      )}

      {/* Popular Schemes */}
      {popularSchemes.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Popular Schemes</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSchemes.map(s => (
              <SchemeCard key={s.id} id={s.id} schemeName={s.scheme_name} details={s.details} type={s.type} category={s.category} fundingAmount={s.funding_amount} applicationLink={s.application_link} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
