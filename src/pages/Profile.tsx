import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';

export default function Profile() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { t } = useLanguage();
  const { toast } = useToast();
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from('profiles').select('full_name').eq('user_id', user.id).single().then(({ data }) => {
      if (data) setFullName(data.full_name ?? '');
    });
  }, [user]);

  if (!authLoading && !user) return <Navigate to="/login" />;

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('profiles').update({ full_name: fullName }).eq('user_id', user!.id);
    toast({ title: 'Profile updated!' });
    setSaving(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>{t('nav.profile')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">{t('auth.email')}</label>
            <Input value={user?.email ?? ''} disabled />
          </div>
          <div>
            <label className="text-sm font-medium">{t('auth.fullName')}</label>
            <Input value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Role:</span>
            <Badge variant={isAdmin ? 'default' : 'secondary'}>{isAdmin ? 'Admin' : 'Citizen'}</Badge>
          </div>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? t('common.loading') : t('common.save')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
