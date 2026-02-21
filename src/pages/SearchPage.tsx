import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemeCard from '@/components/SchemeCard';
import { Input } from '@/components/ui/input';
import VoiceSearch from '@/components/VoiceSearch';
import { Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function SearchPage() {
  const { t } = useLanguage();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('schemes').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setSchemes(data ?? []);
      setLoading(false);
    });
  }, []);

  const filtered = schemes.filter(s => {
    const matchSearch = !search || s.scheme_name.toLowerCase().includes(search.toLowerCase()) || s.details?.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || s.category === categoryFilter;
    const matchType = typeFilter === 'all' || s.type === typeFilter;
    return matchSearch && matchCat && matchType;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{t('nav.search')}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder={t('search.placeholder')} value={search} onChange={e => setSearch(e.target.value)} className="pl-10 text-base" />
        </div>
        <VoiceSearch onResult={setSearch} />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Farmers">{t('category.farmers')}</SelectItem>
            <SelectItem value="Students">{t('category.students')}</SelectItem>
            <SelectItem value="Women">{t('category.women')}</SelectItem>
            <SelectItem value="General">{t('category.general')}</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map(s => (
            <SchemeCard key={s.id} id={s.id} schemeName={s.scheme_name} details={s.details} type={s.type} category={s.category} fundingAmount={s.funding_amount} applicationLink={s.application_link} />
          ))}
        </div>
      )}
    </div>
  );
}
