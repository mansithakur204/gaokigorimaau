import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Plus, Pencil, Trash2 } from 'lucide-react';

interface SchemeForm {
  scheme_name: string;
  details: string;
  type: string;
  category: string;
  funding_amount: string;
  eligibility: string;
  application_link: string;
}

const emptyForm: SchemeForm = { scheme_name: '', details: '', type: 'Central', category: 'Farmers', funding_amount: '', eligibility: '', application_link: '' };

export default function AdminSchemes() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const [schemes, setSchemes] = useState<any[]>([]);
  const [form, setForm] = useState<SchemeForm>(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchSchemes = async () => {
    const { data } = await supabase.from('schemes').select('*').order('created_at', { ascending: false });
    setSchemes(data ?? []);
  };

  useEffect(() => { fetchSchemes(); }, []);

  const handleSave = async () => {
    setSaving(true);
    if (editId) {
      await supabase.from('schemes').update(form).eq('id', editId);
      toast({ title: 'Scheme updated!' });
    } else {
      await supabase.from('schemes').insert({ ...form, created_by: user?.id });
      toast({ title: 'Scheme added!' });
    }
    setForm(emptyForm);
    setEditId(null);
    setDialogOpen(false);
    setSaving(false);
    fetchSchemes();
  };

  const handleEdit = (s: any) => {
    setForm({ scheme_name: s.scheme_name, details: s.details ?? '', type: s.type, category: s.category, funding_amount: s.funding_amount ?? '', eligibility: s.eligibility ?? '', application_link: s.application_link ?? '' });
    setEditId(s.id);
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from('schemes').delete().eq('id', id);
    toast({ title: 'Scheme deleted' });
    fetchSchemes();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">{t('admin.schemes')}</h1>
        <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) { setForm(emptyForm); setEditId(null); } }}>
          <DialogTrigger asChild>
            <Button className="gap-1"><Plus className="w-4 h-4" /> {t('admin.addScheme')}</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editId ? t('admin.editScheme') : t('admin.addScheme')}</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Scheme Name" value={form.scheme_name} onChange={e => setForm({ ...form, scheme_name: e.target.value })} />
              <Textarea placeholder="Details" value={form.details} onChange={e => setForm({ ...form, details: e.target.value })} rows={3} />
              <div className="grid grid-cols-2 gap-3">
                <Select value={form.type} onValueChange={v => setForm({ ...form, type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Central">Central</SelectItem>
                    <SelectItem value="State">State</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={form.category} onValueChange={v => setForm({ ...form, category: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Farmers">Farmers</SelectItem>
                    <SelectItem value="Students">Students</SelectItem>
                    <SelectItem value="Women">Women</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Input placeholder="Funding Amount" value={form.funding_amount} onChange={e => setForm({ ...form, funding_amount: e.target.value })} />
              <Input placeholder="Eligibility" value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} />
              <Input placeholder="Application Link" value={form.application_link} onChange={e => setForm({ ...form, application_link: e.target.value })} />
              <Button onClick={handleSave} disabled={saving || !form.scheme_name} className="w-full">
                {saving ? t('common.loading') : t('common.save')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {schemes.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">{s.scheme_name}</TableCell>
                  <TableCell><Badge variant="secondary">{s.category}</Badge></TableCell>
                  <TableCell><Badge variant="outline">{s.type}</Badge></TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button variant="ghost" size="sm" onClick={() => handleEdit(s)}><Pencil className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                  </TableCell>
                </TableRow>
              ))}
              {schemes.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">No schemes yet</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
