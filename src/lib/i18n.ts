export type Language = 'en' | 'hi';

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  'nav.home': { en: 'Home', hi: 'होम' },
  'nav.schemes': { en: 'Schemes', hi: 'योजनाएं' },
  'nav.search': { en: 'Search', hi: 'खोजें' },
  'nav.profile': { en: 'Profile', hi: 'प्रोफ़ाइल' },
  'nav.admin': { en: 'Admin Panel', hi: 'एडमिन पैनल' },
  'nav.login': { en: 'Login', hi: 'लॉगिन' },
  'nav.register': { en: 'Register', hi: 'पंजीकरण' },
  'nav.logout': { en: 'Logout', hi: 'लॉगआउट' },

  // Landing
  'landing.title': { en: 'Rural Services Portal', hi: 'ग्रामीण सेवा पोर्टल' },
  'landing.subtitle': { en: 'Empowering Rural India with Government Schemes & Services', hi: 'सरकारी योजनाओं और सेवाओं से ग्रामीण भारत को सशक्त बनाना' },
  'landing.cta': { en: 'Explore Schemes', hi: 'योजनाएं देखें' },
  'landing.login': { en: 'Login / Register', hi: 'लॉगिन / पंजीकरण' },

  // Categories
  'category.farmers': { en: 'Farmers', hi: 'किसान' },
  'category.students': { en: 'Students', hi: 'छात्र' },
  'category.women': { en: 'Women', hi: 'महिलाएं' },
  'category.general': { en: 'General', hi: 'सामान्य' },
  'category.farmers.desc': { en: 'Agriculture schemes, subsidies & support', hi: 'कृषि योजनाएं, सब्सिडी और सहायता' },
  'category.students.desc': { en: 'Scholarships, education & skill development', hi: 'छात्रवृत्ति, शिक्षा और कौशल विकास' },
  'category.women.desc': { en: 'Women welfare, empowerment & safety', hi: 'महिला कल्याण, सशक्तिकरण और सुरक्षा' },
  'category.general.desc': { en: 'General welfare & development schemes', hi: 'सामान्य कल्याण और विकास योजनाएं' },

  // Scheme
  'scheme.apply': { en: 'Apply Now', hi: 'अभी आवेदन करें' },
  'scheme.eligibility': { en: 'Eligibility', hi: 'पात्रता' },
  'scheme.funding': { en: 'Funding', hi: 'वित्तपोषण' },
  'scheme.type': { en: 'Type', hi: 'प्रकार' },
  'scheme.central': { en: 'Central', hi: 'केंद्रीय' },
  'scheme.state': { en: 'State', hi: 'राज्य' },
  'scheme.details': { en: 'Details', hi: 'विवरण' },

  // Search
  'search.placeholder': { en: 'Search schemes...', hi: 'योजनाएं खोजें...' },
  'search.voice': { en: 'Voice Search', hi: 'वॉइस खोज' },
  'search.filter': { en: 'Filter', hi: 'फ़िल्टर' },
  'search.noResults': { en: 'No schemes found', hi: 'कोई योजना नहीं मिली' },

  // Auth
  'auth.email': { en: 'Email', hi: 'ईमेल' },
  'auth.password': { en: 'Password', hi: 'पासवर्ड' },
  'auth.fullName': { en: 'Full Name', hi: 'पूरा नाम' },
  'auth.loginTitle': { en: 'Welcome Back', hi: 'स्वागत है' },
  'auth.registerTitle': { en: 'Create Account', hi: 'खाता बनाएं' },
  'auth.noAccount': { en: "Don't have an account?", hi: 'खाता नहीं है?' },
  'auth.hasAccount': { en: 'Already have an account?', hi: 'पहले से खाता है?' },

  // Admin
  'admin.dashboard': { en: 'Dashboard', hi: 'डैशबोर्ड' },
  'admin.schemes': { en: 'Manage Schemes', hi: 'योजना प्रबंधन' },
  'admin.upload': { en: 'Upload Excel', hi: 'एक्सेल अपलोड' },
  'admin.addScheme': { en: 'Add Scheme', hi: 'योजना जोड़ें' },
  'admin.editScheme': { en: 'Edit Scheme', hi: 'योजना संपादित करें' },
  'admin.totalSchemes': { en: 'Total Schemes', hi: 'कुल योजनाएं' },

  // Common
  'common.loading': { en: 'Loading...', hi: 'लोड हो रहा है...' },
  'common.save': { en: 'Save', hi: 'सहेजें' },
  'common.cancel': { en: 'Cancel', hi: 'रद्द करें' },
  'common.delete': { en: 'Delete', hi: 'हटाएं' },
  'common.edit': { en: 'Edit', hi: 'संपादित करें' },
  'common.back': { en: 'Back', hi: 'वापस' },
};

export function t(key: string, lang: Language): string {
  return translations[key]?.[lang] ?? key;
}
