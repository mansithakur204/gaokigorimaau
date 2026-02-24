import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GitCompareArrows } from 'lucide-react';

export default function CompareSchemes() {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [schemeA, setSchemeA] = useState('');
  const [schemeB, setSchemeB] = useState('');

  useEffect(() => {
    supabase.from('schemes').select('*').order('scheme_name').then(({ data }) => setSchemes(data ?? []));
  }, []);

  const a = schemes.find(s => s.id === schemeA);
  const b = schemes.find(s => s.id === schemeB);

  const rows = [
    { label: 'Category', key: 'category' },
    { label: 'Type', key: 'type' },
    { label: 'State', key: 'state' },
    { label: 'Funding Amount', key: 'funding_amount' },
    { label: 'Eligibility', key: 'eligibility' },
    { label: 'Benefits', key: 'benefits' },
    { label: 'Required Documents', key: 'documents' },
    { label: 'Helpline', key: 'helpline' },
    { label: 'Popularity (Clicks)', key: 'click_count' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="flex items-center gap-2 mb-6">
        <GitCompareArrows className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold">Compare Schemes</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Select value={schemeA} onValueChange={setSchemeA}>
          <SelectTrigger><SelectValue placeholder="Select Scheme 1" /></SelectTrigger>
          <SelectContent>
            {schemes.filter(s => s.id !== schemeB).map(s => (
              <SelectItem key={s.id} value={s.id}>{s.scheme_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={schemeB} onValueChange={setSchemeB}>
          <SelectTrigger><SelectValue placeholder="Select Scheme 2" /></SelectTrigger>
          <SelectContent>
            {schemes.filter(s => s.id !== schemeA).map(s => (
              <SelectItem key={s.id} value={s.id}>{s.scheme_name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {a && b && (
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="p-3 text-left font-semibold w-1/4">Field</th>
                  <th className="p-3 text-left font-semibold w-[37.5%]">
                    <Badge className="bg-primary text-primary-foreground">{a.scheme_name}</Badge>
                  </th>
                  <th className="p-3 text-left font-semibold w-[37.5%]">
                    <Badge className="bg-accent text-accent-foreground">{b.scheme_name}</Badge>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map(r => (
                  <tr key={r.key} className="border-b last:border-b-0">
                    <td className="p-3 font-medium text-muted-foreground">{r.label}</td>
                    <td className="p-3">{a[r.key] ?? '—'}</td>
                    <td className="p-3">{b[r.key] ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
