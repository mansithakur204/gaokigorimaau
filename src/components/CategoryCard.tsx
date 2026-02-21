import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Sprout, GraduationCap, Heart, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

const categories = [
  { key: 'Farmers', icon: Sprout, gradient: 'gradient-green', path: '/category/Farmers', nameKey: 'category.farmers', descKey: 'category.farmers.desc' },
  { key: 'Students', icon: GraduationCap, gradient: 'gradient-navy', path: '/category/Students', nameKey: 'category.students', descKey: 'category.students.desc' },
  { key: 'Women', icon: Heart, gradient: 'gradient-saffron', path: '/category/Women', nameKey: 'category.women', descKey: 'category.women.desc' },
  { key: 'General', icon: Users, gradient: 'gradient-green', path: '/category/General', nameKey: 'category.general', descKey: 'category.general.desc' },
];

export default function CategoryCards() {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((cat, i) => (
        <motion.div
          key={cat.key}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
        >
          <Link to={cat.path}>
            <Card className={`${cat.gradient} category-card-hover cursor-pointer border-0 overflow-hidden`}>
              <CardContent className="p-6 text-center space-y-3">
                <cat.icon className="w-12 h-12 mx-auto text-primary-foreground" />
                <h3 className="text-xl font-bold text-primary-foreground">{t(cat.nameKey)}</h3>
                <p className="text-primary-foreground/80 text-sm">{t(cat.descKey)}</p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
