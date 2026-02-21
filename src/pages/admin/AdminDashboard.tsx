import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sprout, GraduationCap, Heart, FileText } from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useLanguage();
  const [stats, setStats] = useState({ total: 0, farmers: 0, students: 0, women: 0 });

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from('schemes').select('category');
      if (!data) return;
      setStats({
        total: data.length,
        farmers: data.filter(s => s.category === 'Farmers').length,
        students: data.filter(s => s.category === 'Students').length,
        women: data.filter(s => s.category === 'Women').length,
      });
    };
    fetch();
  }, []);

  const cards = [
    { label: t('admin.totalSchemes'), value: stats.total, icon: FileText, color: 'gradient-saffron' },
    { label: t('category.farmers'), value: stats.farmers, icon: Sprout, color: 'gradient-green' },
    { label: t('category.students'), value: stats.students, icon: GraduationCap, color: 'gradient-navy' },
    { label: t('category.women'), value: stats.women, icon: Heart, color: 'gradient-saffron' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">{t('admin.dashboard')}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map(c => (
          <Card key={c.label} className={`${c.color} border-0`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-primary-foreground/80">{c.label}</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span className="text-3xl font-bold text-primary-foreground">{c.value}</span>
              <c.icon className="w-8 h-8 text-primary-foreground/60" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
