import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { X, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewSchemeBanner() {
  const [scheme, setScheme] = useState<any>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const lastSeen = localStorage.getItem('lastSeenSchemeDate');
    supabase
      .from('schemes')
      .select('id, scheme_name, created_at')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data && (!lastSeen || new Date(data.created_at) > new Date(lastSeen))) {
          setScheme(data);
        }
      });
  }, []);

  const dismiss = () => {
    setDismissed(true);
    if (scheme) localStorage.setItem('lastSeenSchemeDate', scheme.created_at);
  };

  if (!scheme || dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground py-2 px-4 text-center text-sm flex items-center justify-center gap-2 relative">
      <Sparkles className="w-4 h-4" />
      <span>New scheme added: </span>
      <Link to={`/scheme/${scheme.id}`} className="font-semibold underline underline-offset-2">
        {scheme.scheme_name}
      </Link>
      <button onClick={dismiss} className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-70">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
