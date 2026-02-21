import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemeCard from '@/components/SchemeCard';
import { Input } from '@/components/ui/input';
import VoiceSearch from '@/components/VoiceSearch';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const { t } = useLanguage();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      let query = supabase.from('schemes').select('*').eq('category', category!).order('created_at', { ascending: false });
      const { data } = await query;
      setSchemes(data ?? []);
      setLoading(false);
    };
    fetch();
  }, [category]);

  const filtered = schemes.filter(s => {
    const matchSearch = s.scheme_name.toLowerCase().includes(search.toLowerCase()) || s.details?.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === 'all' || s.type === typeFilter;
    return matchSearch && matchType;
  });

  const categoryTitle = t(`category.${category?.toLowerCase()}` as any) || category;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{categoryTitle}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t('search.placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>
        <VoiceSearch onResult={setSearch} />
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('search.filter')}</SelectItem>
            <SelectItem value="Central">{t('scheme.central')}</SelectItem>
            <SelectItem value="State">{t('scheme.state')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <p className="text-center text-muted-foreground py-8">{t('common.loading')}</p>
      ) : filtered.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">{t('search.noResults')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(s => (
            <SchemeCard
              key={s.id}
              id={s.id}
              schemeName={s.scheme_name}
              details={s.details}
              type={s.type}
              category={s.category}
              fundingAmount={s.funding_amount}
              applicationLink={s.application_link}
            />
          ))}
        </div>
      )}
    </div>
  );
}
