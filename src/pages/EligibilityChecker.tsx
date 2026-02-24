import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import SchemeCard from '@/components/SchemeCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ClipboardCheck, Loader2 } from 'lucide-react';

const STATES = [
  'All India', 'Uttar Pradesh', 'Bihar', 'Madhya Pradesh', 'Rajasthan',
  'West Bengal', 'Maharashtra', 'Tamil Nadu', 'Karnataka', 'Gujarat',
  'Andhra Pradesh', 'Telangana', 'Kerala', 'Punjab', 'Haryana',
  'Odisha', 'Jharkhand', 'Chhattisgarh', 'Assam', 'Delhi'
];

export default function EligibilityChecker() {
  const { t } = useLanguage();
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [income, setIncome] = useState('');
  const [state, setState] = useState('');
  const [occupation, setOccupation] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleCheck = async () => {
    setLoading(true);
    setSearched(true);
    let query = supabase.from('schemes').select('*');

    if (category) query = query.eq('category', category);
    if (state) query = query.or(`state.eq.${state},state.eq.All India`);

    const { data } = await query.order('click_count', { ascending: false });
    let filtered = data ?? [];

    // Gender-based filtering
    if (gender === 'Female') {
      // Prioritize Women schemes but include others
      filtered.sort((a, b) => (b.category === 'Women' ? 1 : 0) - (a.category === 'Women' ? 1 : 0));
    }

    // Occupation-based keyword matching
    if (occupation) {
      const occ = occupation.toLowerCase();
      filtered.sort((a, b) => {
        const aMatch = a.scheme_name.toLowerCase().includes(occ) || a.details?.toLowerCase().includes(occ) ? 1 : 0;
        const bMatch = b.scheme_name.toLowerCase().includes(occ) || b.details?.toLowerCase().includes(occ) ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    setResults(filtered);
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <ClipboardCheck className="w-7 h-7 text-primary" />
        <h1 className="text-3xl font-bold">Eligibility Checker</h1>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg">Enter Your Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Farmers">Farmers</SelectItem>
                <SelectItem value="Students">Students</SelectItem>
                <SelectItem value="Women">Women</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Annual Income Range</Label>
            <Select value={income} onValueChange={setIncome}>
              <SelectTrigger><SelectValue placeholder="Select income" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="below-1l">Below ₹1,00,000</SelectItem>
                <SelectItem value="1l-2.5l">₹1,00,000 - ₹2,50,000</SelectItem>
                <SelectItem value="2.5l-5l">₹2,50,000 - ₹5,00,000</SelectItem>
                <SelectItem value="5l-10l">₹5,00,000 - ₹10,00,000</SelectItem>
                <SelectItem value="above-10l">Above ₹10,00,000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>State</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
              <SelectContent>
                {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <Label>Occupation</Label>
            <Input placeholder="e.g. Farmer, Student, Self-employed" value={occupation} onChange={e => setOccupation(e.target.value)} />
          </div>

          <div className="sm:col-span-2">
            <Button onClick={handleCheck} disabled={loading} className="w-full gap-2">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Check Eligibility
            </Button>
          </div>
        </CardContent>
      </Card>

      {searched && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {results.length > 0 ? `${results.length} Eligible Scheme(s) Found` : 'No matching schemes found'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map(s => (
              <SchemeCard key={s.id} id={s.id} schemeName={s.scheme_name} details={s.details} type={s.type} category={s.category} fundingAmount={s.funding_amount} applicationLink={s.application_link} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
