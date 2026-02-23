
-- Add new columns to schemes table for enhanced detail view
ALTER TABLE public.schemes ADD COLUMN IF NOT EXISTS documents text;
ALTER TABLE public.schemes ADD COLUMN IF NOT EXISTS benefits text;
ALTER TABLE public.schemes ADD COLUMN IF NOT EXISTS helpline text;
ALTER TABLE public.schemes ADD COLUMN IF NOT EXISTS faq jsonb;
ALTER TABLE public.schemes ADD COLUMN IF NOT EXISTS state text DEFAULT 'All India';
ALTER TABLE public.schemes ADD COLUMN IF NOT EXISTS is_popular boolean DEFAULT false;

-- Mark popular schemes
UPDATE public.schemes SET is_popular = true WHERE scheme_name IN (
  'PM Kisan Samman Nidhi',
  'PM Ujjwala Yojana',
  'Ayushman Bharat Yojana',
  'PM Jan Dhan Yojana',
  'Sukanya Samriddhi Yojana',
  'Skill India Mission',
  'Startup India Scheme',
  'National Scholarship Portal'
);
