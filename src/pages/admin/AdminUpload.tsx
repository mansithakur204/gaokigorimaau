import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, FileSpreadsheet, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function AdminUpload() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ success: number; errors: number } | null>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setResult(null);

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<any>(sheet);

      let success = 0, errors = 0;

      for (const row of rows) {
        const scheme = {
          scheme_name: row.schemeName || row.scheme_name || row.name || '',
          details: row.details || row.description || '',
          type: row.type || 'Central',
          category: row.category || 'General',
          funding_amount: row.fundingAmount || row.funding_amount || '',
          eligibility: row.eligibility || '',
          application_link: row.applicationLink || row.application_link || '',
          created_by: user?.id,
        };

        if (!scheme.scheme_name) { errors++; continue; }
        if (!['Central', 'State'].includes(scheme.type)) scheme.type = 'Central';
        if (!['Farmers', 'Students', 'Women', 'General'].includes(scheme.category)) scheme.category = 'General';

        const { error } = await supabase.from('schemes').insert(scheme);
        if (error) errors++;
        else success++;
      }

      setResult({ success, errors });
      toast({ title: `Uploaded ${success} schemes${errors ? `, ${errors} errors` : ''}` });
    } catch (err) {
      toast({ variant: 'destructive', title: 'Upload failed', description: 'Invalid file format' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-lg">
      <h1 className="text-2xl font-bold mb-6">{t('admin.upload')}</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5" /> Upload Excel File
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload an Excel file (.xlsx) with columns: schemeName, details, type (Central/State), category (Farmers/Students/Women/General), fundingAmount, eligibility, applicationLink
          </p>

          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
            <Upload className="w-8 h-8 text-muted-foreground mb-2" />
            <span className="text-sm text-muted-foreground">
              {uploading ? t('common.loading') : 'Click to select file'}
            </span>
            <input type="file" accept=".xlsx,.xls" onChange={handleFile} className="hidden" disabled={uploading} />
          </label>

          {result && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="w-4 h-4 text-secondary" />
              <span>{result.success} schemes imported{result.errors > 0 ? `, ${result.errors} errors` : ''}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
