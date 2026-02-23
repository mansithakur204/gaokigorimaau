import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100),
  email: z.string().trim().email('Invalid email address').max(255),
  message: z.string().trim().min(1, 'Message is required').max(2000),
});

export default function Contact() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach(err => { fieldErrors[err.path[0] as string] = err.message; });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSending(true);
    // Simulate send
    setTimeout(() => {
      setSending(false);
      setForm({ name: '', email: '', message: '' });
      toast({ title: 'Message Sent', description: 'Thank you for reaching out. We will get back to you soon.' });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold">Contact Us</h1>
      </div>
      <p className="text-muted-foreground mb-8">
        Have questions, suggestions, or found incorrect information? Drop us a message and we'll get back to you.
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Send a Message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your name" />
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" />
              {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} placeholder="Your message..." rows={5} />
              {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
            </div>
            <Button type="submit" className="w-full gap-2" disabled={sending}>
              <Send className="w-4 h-4" /> {sending ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
