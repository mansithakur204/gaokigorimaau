import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface VoiceSearchProps {
  onResult: (text: string) => void;
}

export default function VoiceSearch({ onResult }: VoiceSearchProps) {
  const [listening, setListening] = useState(false);
  const { lang, t } = useLanguage();

  const startListening = useCallback(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Voice search is not supported in this browser.');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    recognition.onerror = () => setListening(false);

    recognition.start();
  }, [lang, onResult]);

  return (
    <Button
      variant={listening ? 'destructive' : 'outline'}
      size="icon"
      onClick={startListening}
      title={t('search.voice')}
      className="shrink-0"
    >
      {listening ? <MicOff className="w-5 h-5 animate-pulse" /> : <Mic className="w-5 h-5" />}
    </Button>
  );
}
