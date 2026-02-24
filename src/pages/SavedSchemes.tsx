import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import SchemeCard from '@/components/SchemeCard';
import { Bookmark, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SavedSchemes() {
  const { user } = useAuth();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    const load = async () => {
      const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('scheme_id')
        .eq('user_id', user.id);
      if (!bookmarks?.length) { setSchemes([]); setLoading(false); return; }
      const ids = bookmarks.map(b => b.scheme_id);
      const { data } = await supabase.from('schemes').select('*').in('id', ids);
      setSchemes(data ?? []);
      setLoading(false);
    };
    load();
  }, [user]);

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center space-y-4">
        <Bookmark className="w-12 h-12 mx-auto text-muted-foreground" />
        <p className="text-muted-foreground">Please log in to view saved schemes.</p>
        <Link to="/login"><Button>Login</Button></Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Bookmark className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold">Saved Schemes</h1>
      </div>
      {loading ? (
        <div className="text-center py-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div>
      ) : schemes.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">You haven't saved any schemes yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schemes.map(s => (
            <SchemeCard key={s.id} id={s.id} schemeName={s.scheme_name} details={s.details} type={s.type} category={s.category} fundingAmount={s.funding_amount} applicationLink={s.application_link} />
          ))}
        </div>
      )}
    </div>
  );
}
