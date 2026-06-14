import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Battery, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Settings, 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  BarChart3, 
  Users, 
  ClipboardList,
  CheckCircle2,
  Clock,
  AlertCircle,
  Droplets,
  Calculator,
  Activity,
  MapPin,
  Globe,
  Upload,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for Tailwind class merging */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Translations ---
const translations = {
  en: {
    home: 'Home',
    services: 'Services',
    subsidies: 'Subsidies',
    cleaning: 'Cleaning System',
    apply: 'Apply',
    admin: 'Admin',
    calculator: 'Calculator',
    dashboard: 'Live Demo',
    impact: 'Impact',
    portal: 'Customer Portal',
    getStarted: 'Get Started',
    heroTitle: 'Smart Solar for a Greener Tomorrow.',
    heroSubtitle: 'End-to-end renewable energy solutions with government subsidy guidance and automated maintenance.',
    startApp: 'Start Your Application',
    viewServices: 'View Services',
    coreServices: 'Our Core Services',
    servicesDesc: 'We provide a complete ecosystem for your transition to renewable energy, from the first consultation to long-term maintenance.',
    smartConsult: 'Smart Consultation',
    smartConsultDesc: 'Expert analysis of your energy needs and roof potential using AI-driven mapping.',
    subsidyGuidance: 'Subsidy Guidance',
    subsidyGuidanceDesc: 'Hassle-free application process for government renewable energy subsidies.',
    profInstall: 'Professional Installation',
    profInstallDesc: 'Certified engineers ensuring top-tier safety and performance for your solar setup.',
    autoMaint: 'Automated Maintenance',
    autoMaintDesc: 'Our proprietary cleaning system keeps your panels at peak efficiency 24/7.',
    calcTitle: 'Solar Savings Calculator',
    calcDesc: 'Estimate your potential savings and system size in seconds.',
    monthlyBill: 'Monthly EB Bill (₹)',
    roofArea: 'Available Roof Area (sq.ft)',
    recSize: 'Recommended Size',
    monthlySavings: 'Monthly Savings',
    payback: 'Payback Period',
    co2Saved: 'CO2 Saved / Year',
    liveDemo: 'Live Demo: Erode Site #104',
    realTimePerf: 'Real-Time Performance',
    monitorLive: 'Monitor live energy generation from one of our active sites in Erode.',
    genCurve: "Today's Generation Curve",
    liveUpdates: 'Live Updates Every 3s',
    currentOutput: 'Current Output',
    poweringAppliances: 'Powering 12 appliances right now',
    systemHealth: 'System Health',
    nextCleaning: 'Next automated cleaning in 4 hours',
    localImpact: 'Local Impact',
    empoweringErode: 'Empowering the Erode Community',
    growingFast: "We're growing fast across the district. Every installation brings us closer to a 100% renewable Erode.",
    happyHomes: 'Happy Homes',
    totalCapacity: 'Total Capacity',
    carbonOffset: 'Carbon Offset to date',
    cleaningMechanism: 'Motorized Cleaning Mechanism',
    cleaningDesc: 'Our custom-engineered motorized wiper system ensures your panels stay crystal clear. By removing dust and debris automatically, we maintain peak efficiency of your solar investment 24/7.',
    hardwareStatus: 'Hardware Status',
    motorizedWiper: 'Motorized Wiper: Active & Calibrated',
    proprietaryTech: 'Proprietary Tech',
    viewSpecs: 'View Technical Specs',
    comingSoon: 'Coming Soon',
    iotConnection: 'Direct IoT connection for your specific installation.',
    welcome: 'Welcome',
    systemId: 'System ID',
    maintenanceHealth: 'Maintenance Health',
    panelsOptimal: 'Your panels are performing optimally. Next cleaning in 2 days.',
    savedSince: 'Saved since installation (6 months)',
    onlineGenerating: 'ONLINE & GENERATING',
    genHistory: 'Generation History',
    startJourney: 'Start Your Solar Journey',
    fillForm: "Fill out the form below and we'll handle the rest, including subsidy applications.",
    fullName: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    propertyType: 'Property Type',
    location: 'Installation Location',
    energyUsage: 'Monthly Energy Usage (kWh approx.)',
    siteSurvey: 'Virtual Site Survey (Optional - Upload Roof Photos)',
    uploadText: 'Click or Drag to Upload',
    submitApp: 'Submit Application',
    appReceived: 'Application Received!',
    reviewContact: 'Our engineers in Erode will review your roof details and contact you within 24 hours.',
    submitAnother: 'Submit another application',
    adminCommand: 'Admin Command Center',
    platformSettings: 'Platform Settings (Backend Storage)',
    maintenanceMode: 'Maintenance Mode',
    disableApps: 'Disable new applications temporarily',
    globalAlert: 'Global Alert Banner',
    logout: 'Logout',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    contact: 'Contact'
  },
  ta: {
    home: 'முகப்பு',
    services: 'சேவைகள்',
    subsidies: 'மானியம்',
    cleaning: 'சுத்தம் செய்யும் முறை',
    apply: 'விண்ணப்பிக்க',
    admin: 'நிர்வாகம்',
    calculator: 'கணக்கீடு',
    dashboard: 'நேரடி டெமோ',
    impact: 'தாக்கம்',
    portal: 'வாடிக்கையாளர் தளம்',
    getStarted: 'தொடங்கவும்',
    heroTitle: 'பசுமையான நாளைக்காக ஸ்மார்ட் சோலார்.',
    heroSubtitle: 'அரசு மானிய வழிகாட்டுதல் மற்றும் தானியங்கி பராமரிப்புடன் கூடிய முழுமையான எரிசக்தி தீர்வுகள்.',
    startApp: 'விண்ணப்பத்தைத் தொடங்கவும்',
    viewServices: 'சேவைகளைப் பார்க்கவும்',
    coreServices: 'எங்கள் முக்கிய சேவைகள்',
    servicesDesc: 'முதல் ஆலோசனை முதல் நீண்ட கால பராமரிப்பு வரை உங்கள் புதுப்பிக்கத்தக்க எரிசக்தி மாற்றத்திற்கான முழுமையான சுற்றுச்சூழல் அமைப்பை நாங்கள் வழங்குகிறோம்.',
    smartConsult: 'ஸ்மார்ட் ஆலோசனை',
    smartConsultDesc: 'AI-உந்துதல் மேப்பிங்கைப் பயன்படுத்தி உங்கள் எரிசக்தி தேவைகள் மற்றும் கூரை திறனைப் பற்றிய நிபுணர் பகுப்பாய்வு.',
    subsidyGuidance: 'மானிய வழிகாட்டுதல்',
    subsidyGuidanceDesc: 'அரசு புதுப்பிக்கத்தக்க எரிசக்தி மானியங்களுக்கான தொந்தரவில்லாத விண்ணப்ப செயல்முறை.',
    profInstall: 'தொழில்முறை நிறுவல்',
    profInstallDesc: 'உங்கள் சோலார் அமைப்பிற்கு உயர்மட்ட பாதுகாப்பு மற்றும் செயல்திறனை உறுதி செய்யும் சான்றிதழ் பெற்ற பொறியாளர்கள்.',
    autoMaint: 'தானியங்கி பராமரிப்பு',
    autoMaintDesc: 'எங்கள் தனியுரிம சுத்தம் செய்யும் முறை உங்கள் பேனல்களை 24/7 உச்ச செயல்திறனில் வைத்திருக்கிறது.',
    calcTitle: 'சோலார் சேமிப்பு கணக்கீடு',
    calcDesc: 'உங்கள் சாத்தியமான சேமிப்பு மற்றும் கணினி அளவை நொடிகளில் மதிப்பிடுங்கள்.',
    monthlyBill: 'மாதாந்திர EB கட்டணம் (₹)',
    roofArea: 'கிடைக்கக்கூடிய கூரை பரப்பு (சதுர அடி)',
    recSize: 'பரிந்துரைக்கப்படும் அளவு',
    monthlySavings: 'மாதாந்திர சேமிப்பு',
    payback: 'முதலீடு திரும்பப் பெறும் காலம்',
    co2Saved: 'ஆண்டுக்கு சேமிக்கப்படும் CO2',
    liveDemo: 'நேரடி டெமோ: ஈரோடு தளம் #104',
    realTimePerf: 'நிகழ்நேர செயல்திறன்',
    monitorLive: 'ஈரோட்டில் உள்ள எங்களது செயல்பாட்டில் உள்ள தளங்களில் ஒன்றிலிருந்து நேரடி எரிசக்தி உற்பத்தியைக் கண்காணிக்கவும்.',
    genCurve: 'இன்றைய உற்பத்தி வளைவு',
    liveUpdates: 'ஒவ்வொரு 3 வினாடிக்கும் நேரடி புதுப்பிப்புகள்',
    currentOutput: 'தற்போதைய உற்பத்தி',
    poweringAppliances: 'இப்போது 12 சாதனங்களுக்கு மின்சாரம் வழங்குகிறது',
    systemHealth: 'கணினி ஆரோக்கியம்',
    nextCleaning: 'அடுத்த தானியங்கி சுத்தம் 4 மணிநேரத்தில்',
    localImpact: 'உள்ளூர் தாக்கம்',
    empoweringErode: 'ஈரோடு சமூகத்தை மேம்படுத்துதல்',
    growingFast: 'மாவட்டம் முழுவதும் நாங்கள் வேகமாக வளர்ந்து வருகிறோம். ஒவ்வொரு நிறுவலும் எங்களை 100% புதுப்பிக்கத்தக்க ஈரோட்டை நோக்கி நெருங்கச் செய்கிறது.',
    happyHomes: 'மகிழ்ச்சியான வீடுகள்',
    totalCapacity: 'மொத்த திறன்',
    carbonOffset: 'இதுவரை குறைக்கப்பட்ட கார்பன் அளவு',
    cleaningMechanism: 'மோட்டார் பொருத்தப்பட்ட சுத்தம் செய்யும் முறை',
    cleaningDesc: 'எங்கள் தனிப்பயனாக்கப்பட்ட மோட்டார் பொருத்தப்பட்ட வைப்பர் அமைப்பு உங்கள் பேனல்கள் தெளிவாக இருப்பதை உறுதி செய்கிறது. தூசி மற்றும் குப்பைகளை தானாகவே அகற்றுவதன் மூலம், உங்கள் சோலார் முதலீட்டின் உச்ச செயல்திறனை 24/7 பராமரிக்கிறோம்.',
    hardwareStatus: 'வன்பொருள் நிலை',
    motorizedWiper: 'மோட்டார் பொருத்தப்பட்ட வைப்பர்: செயல்பாட்டில் உள்ளது',
    proprietaryTech: 'தனியுரிம தொழில்நுட்பம்',
    viewSpecs: 'தொழில்நுட்ப விவரங்களைப் பார்க்கவும்',
    comingSoon: 'விரைவில்',
    iotConnection: 'உங்கள் குறிப்பிட்ட நிறுவலுக்கான நேரடி IoT இணைப்பு.',
    welcome: 'வரவேற்கிறோம்',
    systemId: 'கணினி ஐடி',
    maintenanceHealth: 'பராமரிப்பு ஆரோக்கியம்',
    panelsOptimal: 'உங்கள் பேனல்கள் சிறப்பாக செயல்படுகின்றன. அடுத்த சுத்தம் 2 நாட்களில்.',
    savedSince: 'நிறுவப்பட்டதிலிருந்து சேமிக்கப்பட்டது (6 மாதங்கள்)',
    onlineGenerating: 'ஆன்லைனில் மற்றும் உற்பத்தி செய்கிறது',
    genHistory: 'உற்பத்தி வரலாறு',
    startJourney: 'உங்கள் சோலார் பயணத்தைத் தொடங்குங்கள்',
    fillForm: 'கீழே உள்ள படிவத்தை நிரப்பவும், மானிய விண்ணப்பங்கள் உட்பட மீதமுள்ளவற்றை நாங்கள் கவனித்துக்கொள்வோம்.',
    fullName: 'முழு பெயர்',
    email: 'மின்னஞ்சல் முகவரி',
    phone: 'தொலைபேசி எண்',
    propertyType: 'சொத்து வகை',
    location: 'நிறுவப்படும் இடம்',
    energyUsage: 'மாதாந்திர மின் பயன்பாடு (kWh தோராயமாக)',
    siteSurvey: 'மெய்நிகர் தள ஆய்வு (விருப்பம் - கூரை புகைப்படங்களைப் பதிவேற்றவும்)',
    uploadText: 'பதிவேற்ற கிளிக் செய்யவும் அல்லது இழுக்கவும்',
    submitApp: 'விண்ணப்பத்தைச் சமர்ப்பிக்கவும்',
    appReceived: 'விண்ணப்பம் பெறப்பட்டது!',
    reviewContact: 'ஈரோட்டில் உள்ள எங்களது பொறியாளர்கள் உங்கள் கூரை விவரங்களை ஆய்வு செய்து 24 மணிநேரத்திற்குள் உங்களைத் தொடர்புகொள்வார்கள்.',
    submitAnother: 'மற்றொரு விண்ணப்பத்தைச் சமர்ப்பிக்கவும்',
    adminCommand: 'நிர்வாகக் கட்டுப்பாட்டு மையம்',
    platformSettings: 'தள அமைப்புகள் (பின்னணி சேமிப்பு)',
    maintenanceMode: 'பராமரிப்பு முறை',
    disableApps: 'புதிய விண்ணப்பங்களைத் தற்காலிகமாக முடக்கவும்',
    globalAlert: 'உலகளாவிய எச்சரிக்கை பேனர்',
    logout: 'வெளியேறு',
    privacy: 'தனியுரிமைக் கொள்கை',
    terms: 'சேவை விதிமுறைகள்',
    contact: 'தொடர்பு கொள்ள'
  }
};

// --- Components ---

const Navbar = ({ activePage, setActivePage, lang, setLang }: { activePage: string, setActivePage: (page: string) => void, lang: 'en' | 'ta', setLang: (l: 'en' | 'ta') => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = translations[lang];

  const navItems = [
    { name: t.home, id: 'home' },
    { name: t.services, id: 'services' },
    { name: t.subsidies, id: 'subsidies' },
    { name: t.calculator, id: 'calculator' },
    { name: t.dashboard, id: 'dashboard' },
    { name: t.portal, id: 'portal' },
    { name: t.apply, id: 'apply' },
    { name: t.admin, id: 'admin' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-zinc-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setActivePage('home')}>
            <Sun className="h-8 w-8 text-amber-500" />
            <span className="ml-2 text-xl font-bold tracking-tight text-zinc-900">EnerNova</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={cn(
                  "text-xs font-bold uppercase tracking-wider transition-colors hover:text-amber-600",
                  activePage === item.id ? "text-amber-600" : "text-zinc-600"
                )}
              >
                {item.name}
              </button>
            ))}
            <div className="h-4 w-[1px] bg-zinc-200 mx-2" />
            <button 
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <Globe className="h-3 w-3" />
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
            <button 
              onClick={() => setActivePage('apply')}
              className="bg-zinc-900 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-800 transition-all"
            >
              {t.getStarted}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-4">
            <button 
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="text-xs font-bold text-zinc-500"
            >
              {lang === 'en' ? 'தமிழ்' : 'English'}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-bottom border-zinc-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "block w-full text-left px-3 py-2 text-base font-medium rounded-md",
                    activePage === item.id ? "bg-amber-50 text-amber-600" : "text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const Hero = ({ onApply, lang }: { onApply: () => void, lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Zap className="h-3 w-3 mr-2" />
              {lang === 'en' ? 'Future of Energy is Here' : 'எரிசக்தியின் எதிர்காலம் இங்கே'}
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-5xl lg:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1] mb-6"
            >
              {lang === 'en' ? (
                <>Smart Solar for a <span className="text-amber-500 italic">Greener</span> Tomorrow.</>
              ) : t.heroTitle}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg text-zinc-600 mb-8 max-w-lg leading-relaxed"
            >
              {t.heroSubtitle}
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={onApply}
                className="bg-zinc-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-zinc-800 transition-all flex items-center justify-center group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  {t.startApp}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-amber-500"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
              <button className="border border-zinc-200 text-zinc-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-zinc-50 transition-all">
                {t.viewServices}
              </button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="mt-12 lg:mt-0 relative"
          >
            <motion.div 
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative z-10"
            >
              <img 
                src="https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000" 
                alt="Solar Panels" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 hidden sm:block z-20"
            >
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">Subsidy Approved</p>
                  <p className="text-xs text-zinc-500">Up to 40% government support</p>
                </div>
              </div>
            </motion.div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-200/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse delay-700" />
          </motion.div>
        </div>
      </div>
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-amber-50/50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" 
      />
    </section>
  );
};

const SolarCalculator = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  const [bill, setBill] = useState<number>(3000);
  const [area, setArea] = useState<number>(300);

  const systemSize = Math.min(Math.ceil(bill / 1000), Math.floor(area / 100));
  const estimatedSavings = Math.round(bill * 0.9);
  const paybackYears = 4.5;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">{t.calcTitle}</h2>
          <p className="text-zinc-600">{t.calcDesc}</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-zinc-700 uppercase tracking-wider">{t.monthlyBill}</label>
                <span className="text-amber-600 font-bold">₹{bill}</span>
              </div>
              <input 
                type="range" min="500" max="20000" step="500"
                value={bill} onChange={(e) => setBill(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-zinc-700 uppercase tracking-wider">{t.roofArea}</label>
                <span className="text-amber-600 font-bold">{area} sq.ft</span>
              </div>
              <input 
                type="range" min="100" max="5000" step="50"
                value={area} onChange={(e) => setArea(parseInt(e.target.value))}
                className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { label: t.recSize, value: `${systemSize} kW`, icon: <Zap className="h-5 w-5" /> },
              { label: t.monthlySavings, value: `₹${estimatedSavings}`, icon: <ArrowRight className="h-5 w-5" /> },
              { label: t.payback, value: `${paybackYears} ${lang === 'en' ? 'Years' : 'ஆண்டுகள்'}`, icon: <Clock className="h-5 w-5" /> },
              { label: t.co2Saved, value: `${systemSize * 1.5} ${lang === 'en' ? 'Tons' : 'டன்கள்'}`, icon: <Sun className="h-5 w-5" /> }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm text-center"
              >
                <div className="bg-amber-50 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
                  {stat.icon}
                </div>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-xl font-bold text-zinc-900">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const LiveDashboard = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  const [generation, setGeneration] = useState(2.4);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setGeneration(prev => +(prev + (Math.random() * 0.2 - 0.1)).toFixed(2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/20 text-amber-500 text-xs font-bold uppercase tracking-wider mb-4">
            <Activity className="h-3 w-3 mr-2 animate-pulse" /> {t.liveDemo}
          </div>
          <h2 className="text-3xl font-bold mb-4">{t.realTimePerf}</h2>
          <p className="text-zinc-400">{t.monitorLive}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-zinc-800/50 p-8 rounded-3xl border border-white/5">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-lg">{t.genCurve}</h3>
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{t.liveUpdates}</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[
                  { time: '6am', val: 0.2 }, { time: '8am', val: 1.2 }, { time: '10am', val: 2.8 },
                  { time: '12pm', val: 4.5 }, { time: '2pm', val: 4.2 }, { time: '4pm', val: 2.1 },
                  { time: '6pm', val: 0.5 }
                ]}>
                  <Bar dataKey="val" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                  <XAxis dataKey="time" stroke="#52525b" fontSize={10} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '8px'}} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-amber-500 p-8 rounded-3xl text-zinc-900">
              <p className="text-xs font-bold uppercase tracking-widest mb-2 opacity-70">{t.currentOutput}</p>
              <p className="text-5xl font-bold mb-2">{generation} <span className="text-2xl">kW</span></p>
              <p className="text-sm font-medium">{t.poweringAppliances}</p>
            </div>
            <div className="bg-zinc-800/50 p-8 rounded-3xl border border-white/5">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-500">{t.systemHealth}</p>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    className="h-full bg-emerald-500"
                  />
                </div>
                <span className="text-emerald-500 font-bold text-sm">98%</span>
              </div>
              <p className="text-xs text-zinc-400">{t.nextCleaning}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ImpactMap = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  const locations = [
    { name: lang === 'en' ? "Perundurai" : "பெருந்துறை", count: 45 },
    { name: lang === 'en' ? "Bhavani" : "பவானி", count: 32 },
    { name: lang === 'en' ? "Gobichettipalayam" : "கோபிசெட்டிபாளையம்", count: 28 },
    { name: lang === 'en' ? "Sathyamangalam" : "சத்தியமங்கலம்", count: 19 },
    { name: lang === 'en' ? "Erode City" : "ஈரோடு நகரம்", count: 87 }
  ];

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
              <MapPin className="h-3 w-3 mr-2" /> {t.localImpact}
            </div>
            <h2 className="text-4xl font-bold text-zinc-900 mb-6 leading-tight">{lang === 'en' ? <>{t.empoweringErode.split(' ')[0]} {t.empoweringErode.split(' ')[1]} <br/><span className="text-amber-500">{t.empoweringErode.split(' ').slice(2).join(' ')}</span></> : t.empoweringErode}</h2>
            <p className="text-zinc-600 text-lg mb-8 leading-relaxed">
              {t.growingFast}
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                <p className="text-3xl font-bold text-zinc-900">210+</p>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{t.happyHomes}</p>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-zinc-100 shadow-sm">
                <p className="text-3xl font-bold text-zinc-900">1.2 MW</p>
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{t.totalCapacity}</p>
              </div>
            </div>

            <div className="space-y-3">
              {locations.map((loc, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl border border-zinc-100">
                  <span className="font-bold text-zinc-700">{loc.name}</span>
                  <span className="bg-zinc-100 px-3 py-1 rounded-full text-xs font-bold text-zinc-500">{loc.count} {lang === 'en' ? 'Units' : 'அலகுகள்'}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 lg:mt-0 relative">
            <div className="aspect-square bg-zinc-200 rounded-3xl overflow-hidden relative border-4 border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1000" 
                alt="Erode Region" 
                className="w-full h-full object-cover opacity-50 grayscale"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 bg-amber-500 rounded-full"
                  />
                  <div className="w-4 h-4 bg-amber-500 rounded-full relative z-10 border-2 border-white shadow-lg" />
                </div>
              </div>
              {/* Mock Pins */}
              <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-amber-500 rounded-full border border-white" />
              <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-amber-500 rounded-full border border-white" />
              <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-amber-500 rounded-full border border-white" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-zinc-900 text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
              <Heart className="h-6 w-6 text-red-500 mb-2" />
              <p className="text-sm font-bold">450 {lang === 'en' ? 'Tons' : 'டன்கள்'}</p>
              <p className="text-[10px] text-zinc-400 uppercase tracking-widest">{t.carbonOffset}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CustomerPortal = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerId, setCustomerId] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState<any>(null);
  const [verifying, setVerifying] = useState(false);
  const [sensorData, setSensorData] = useState<any>({ lux: 0, voltage: 0, cleaning_status: 'idle' });

  useEffect(() => {
    const fetchSensors = async () => {
      try {
        const res = await fetch('/api/sensors/latest');
        if (res.ok) {
          const data = await res.json();
          setSensorData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSensors();
    const interval = setInterval(fetchSensors, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAccess = async () => {
    if (!customerId) return;
    setVerifying(true);
    setError('');
    try {
      const res = await fetch('/api/portal/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerId })
      });
      if (res.ok) {
        const data = await res.json();
        setUserData(data.application);
        setIsLoggedIn(true);
      } else {
        setError(lang === 'en' ? 'Invalid Customer ID. Please check and try again.' : 'தவறான வாடிக்கையாளர் ஐடி. சரிபார்த்து மீண்டும் முயற்சிக்கவும்.');
      }
    } catch (err) {
      setError(lang === 'en' ? 'Connection failed' : 'இணைப்பு தோல்வியடைந்தது');
    } finally {
      setVerifying(false);
    }
  };
  
  if (!isLoggedIn) {
    return (
      <section className="py-24 bg-white">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="bg-zinc-50 p-12 rounded-3xl border border-zinc-100 shadow-sm">
            <ShieldCheck className="h-12 w-12 text-amber-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-zinc-900 mb-4">{t.portal}</h2>
            <p className="text-zinc-500 mb-8">{lang === 'en' ? 'Access your system health, generation history, and maintenance schedules.' : 'உங்கள் கணினி ஆரோக்கியம், உற்பத்தி வரலாறு மற்றும் பராமரிப்பு அட்டவணைகளை அணுகவும்.'}</p>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder={lang === 'en' ? "Customer ID" : "வாடிக்கையாளர் ஐடி"} 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-amber-500"
                value={customerId}
                onChange={e => setCustomerId(e.target.value)}
              />
              {error && <p className="text-red-500 text-xs font-medium">{error}</p>}
              <button 
                onClick={handleAccess}
                disabled={verifying}
                className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all disabled:opacity-50"
              >
                {verifying ? (lang === 'en' ? 'Verifying...' : 'சரிபார்க்கப்படுகிறது...') : (lang === 'en' ? 'Access My Dashboard' : 'எனது டாஷ்போர்டை அணுகவும்')}
              </button>
            </div>
            <p className="mt-6 text-xs text-zinc-400">{lang === 'en' ? "Don't have an ID? Contact support." : "ஐடி இல்லையா? ஆதரவைத் தொடர்பு கொள்ளவும்."}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900">{t.welcome}, {userData?.name}</h2>
            <p className="text-zinc-500">{t.systemId}: {userData?.customer_id}</p>
          </div>
          <button onClick={() => setIsLoggedIn(false)} className="text-sm font-bold text-zinc-400 hover:text-zinc-900">{t.logout}</button>
        </div>

        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">{t.maintenanceHealth}</p>
            <div className="flex items-end gap-2 mb-4">
              <p className="text-5xl font-bold text-emerald-500">94</p>
              <p className="text-sm font-bold text-zinc-400 mb-2">/ 100</p>
            </div>
            <p className="text-sm text-zinc-600">{t.panelsOptimal}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">{lang === 'en' ? 'Total Savings' : 'மொத்த சேமிப்பு'}</p>
            <p className="text-5xl font-bold text-zinc-900">₹14,250</p>
            <p className="text-sm text-zinc-600 mt-2">{t.savedSince}</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">{lang === 'en' ? 'System Status' : 'கணினி நிலை'}</p>
            <div className="flex items-center gap-3 text-emerald-500 font-bold">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
              {t.onlineGenerating}
            </div>
            <p className="text-sm text-zinc-600 mt-4">{t.currentOutput}: 3.2 kW</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">{lang === 'en' ? 'Cleaning System' : 'சுத்தம் செய்யும் அமைப்பு'}</p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Current Lux' : 'தற்போதைய ஒளி'}</p>
                <p className="text-xl font-bold text-zinc-900">{(sensorData?.lux || 0).toFixed(0)}</p>
              </div>
              <div className="bg-zinc-50 p-3 rounded-2xl border border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Voltage' : 'மின்னழுத்தம்'}</p>
                <p className="text-xl font-bold text-zinc-900">{(sensorData?.voltage || 0).toFixed(1)}V</p>
              </div>
              <div className="col-span-2 bg-zinc-50 p-3 rounded-2xl border border-zinc-100 flex justify-between items-center">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{lang === 'en' ? 'Status' : 'நிலை'}</p>
                <p className={cn(
                  "text-xs font-bold uppercase",
                  sensorData?.cleaning_status === 'cleaning' ? "text-emerald-500 animate-pulse" : "text-zinc-400"
                )}>
                  {sensorData?.cleaning_status === 'cleaning' ? (lang === 'en' ? 'Cleaning' : 'சுத்தம் செய்கிறது') : (lang === 'en' ? 'Idle' : 'காத்திருக்கிறது')}
                </p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-zinc-900 rounded-xl text-center">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">
                {lang === 'en' ? 'System Mode' : 'கணினி பயன்முறை'}
              </p>
              <p className="text-xs font-bold text-zinc-600">
                {sensorData.cleaning_status === 'cleaning' 
                  ? (lang === 'en' ? 'Automatic Cleaning Active' : 'தானியங்கி சுத்தம் செய்தல் செயலில் உள்ளது') 
                  : (lang === 'en' ? 'Standard Operation' : 'சாதாரண செயல்பாடு')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm">
          <h3 className="font-bold text-xl mb-8">{t.genHistory}</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { month: 'Jan', val: 450 }, { month: 'Feb', val: 520 }, { month: 'Mar', val: 610 },
                { month: 'Apr', val: 580 }, { month: 'May', val: 640 }, { month: 'Jun', val: 490 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="val" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  const services = [
    {
      title: t.smartConsult,
      desc: t.smartConsultDesc,
      icon: <Users className="h-6 w-6" />,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: t.subsidyGuidance,
      desc: t.subsidyGuidanceDesc,
      icon: <FileText className="h-6 w-6" />,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: t.profInstall,
      desc: t.profInstallDesc,
      icon: <Settings className="h-6 w-6" />,
      color: "bg-amber-50 text-amber-600"
    },
    {
      title: t.autoMaint,
      desc: t.autoMaintDesc,
      icon: <Droplets className="h-6 w-6" />,
      color: "bg-cyan-50 text-cyan-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 bg-zinc-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">{t.coreServices}</h2>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            {t.servicesDesc}
          </p>
        </motion.div>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" 
              }}
              className="bg-white p-8 rounded-2xl border border-zinc-100 shadow-sm transition-all cursor-default group"
            >
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={cn("inline-flex p-3 rounded-xl mb-6 transition-colors", s.color)}
              >
                {s.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-zinc-900 mb-3 group-hover:text-amber-600 transition-colors">{s.title}</h3>
              <p className="text-zinc-600 text-sm leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ApplicationForm = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roofType: lang === 'en' ? 'Residential' : 'குடியிருப்பு',
    energyUsage: '',
    location: '',
    surveyFile: null as File | null
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto py-24 px-4 text-center">
        <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-zinc-900 mb-4">{t.appReceived}</h2>
        <p className="text-zinc-600 mb-8">{t.reviewContact}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-zinc-900 text-white px-8 py-3 rounded-full font-semibold"
        >
          {t.home}
        </button>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 mb-4">{t.startJourney}</h2>
          <p className="text-zinc-600">{t.fillForm}</p>
        </div>
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit} 
          className="space-y-6 bg-zinc-50 p-8 rounded-3xl border border-zinc-100 shadow-sm"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-zinc-700">{t.fullName}</label>
              <input 
                required
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="John Doe"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-zinc-700">{t.email}</label>
              <input 
                required
                type="email" 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="john@example.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </motion.div>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-zinc-700">{t.phone}</label>
              <input 
                required
                type="tel" 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                placeholder="9585885151"
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-zinc-700">{t.propertyType}</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                value={formData.roofType}
                onChange={e => setFormData({...formData, roofType: e.target.value})}
              >
                <option>{lang === 'en' ? 'Residential' : 'குடியிருப்பு'}</option>
                <option>{lang === 'en' ? 'Commercial' : 'வணிகம்'}</option>
                <option>{lang === 'en' ? 'Agricultural' : 'விவசாயம்'}</option>
              </select>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-zinc-700">{t.location}</label>
            <input 
              required
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              placeholder="Erode, Tamil Nadu"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-zinc-700">{t.energyUsage}</label>
            <input 
              required
              type="number" 
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
              placeholder="500"
              value={formData.energyUsage}
              onChange={e => setFormData({...formData, energyUsage: e.target.value})}
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-zinc-700">{t.siteSurvey}</label>
            <div className="relative group">
              <input 
                type="file" 
                accept="image/*"
                onChange={e => setFormData({...formData, surveyFile: e.target.files?.[0] || null})}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="w-full px-4 py-6 rounded-xl border-2 border-dashed border-zinc-200 group-hover:border-amber-500 transition-all flex flex-col items-center justify-center gap-2 bg-white">
                <Upload className="h-6 w-6 text-zinc-400 group-hover:text-amber-500" />
                <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  {formData.surveyFile ? formData.surveyFile.name : t.uploadText}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={status === 'submitting'}
            type="submit"
            className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-zinc-800 transition-all disabled:opacity-50 shadow-lg shadow-zinc-200"
          >
            {status === 'submitting' ? (lang === 'en' ? 'Submitting...' : 'சமர்ப்பிக்கப்படுகிறது...') : t.submitApp}
          </motion.button>
          {status === 'error' && (
            <p className="text-red-500 text-sm text-center">{lang === 'en' ? 'Something went wrong. Please try again.' : 'ஏதோ தவறு நடந்துவிட்டது. மீண்டும் முயற்சிக்கவும்.'}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
};

const AdminDashboard = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [appSettings, setAppSettings] = useState<any>({});
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [editingId, setEditingId] = useState<string>('');
  const [updating, setUpdating] = useState(false);
  const [sensorData, setSensorData] = useState<any>({ lux: 0, voltage: 0, cleaning_status: 'idle' });

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsLoggedIn(true);
      fetchData();
      fetchSensors();
      const interval = setInterval(fetchSensors, 5000);
      return () => clearInterval(interval);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchSensors = async (retryCount = 0) => {
    try {
      const res = await fetch('/api/sensors/latest');
      if (res.ok) {
        const data = await res.json();
        setSensorData(data);
      } else if (retryCount < 3) {
        setTimeout(() => fetchSensors(retryCount + 1), 1000);
      }
    } catch (err) {
      if (retryCount < 3) {
        setTimeout(() => fetchSensors(retryCount + 1), 1000);
      }
      console.error('Sensor fetch failed:', err);
    }
  };

  const sendCleaningCommand = async (command: 'start_cleaning' | 'stop_cleaning') => {
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch('/api/sensors/command', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({ command })
      });
      if (res.ok) {
        fetchSensors();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchData = async (retryCount = 0) => {
    const token = localStorage.getItem('admin_token');
    try {
      const [statsRes, appsRes, settingsRes] = await Promise.all([
        fetch('/api/admin/stats', { headers: { 'Authorization': token || '' } }),
        fetch('/api/admin/applications', { headers: { 'Authorization': token || '' } }),
        fetch('/api/settings/app_config')
      ]);
      
      if (statsRes.status === 401 || appsRes.status === 401) {
        handleLogout();
        return;
      }

      if (!statsRes.ok || !appsRes.ok || !settingsRes.ok) {
        throw new Error('Failed to fetch data from server');
      }

      const statsData = await statsRes.json();
      const appsData = await appsRes.json();
      const settingsData = await settingsRes.json();
      setStats(statsData);
      setApplications(appsData);
      setAppSettings(settingsData.value || { maintenanceMode: false, alertBanner: '' });
    } catch (err) {
      console.error('Admin data fetch failed:', err);
      if (retryCount < 3) {
        setTimeout(() => fetchData(retryCount + 1), 2000);
      }
    } finally {
      if (retryCount >= 3 || !token) {
        setLoading(false);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (res.ok) {
        const data = await res.json();
        localStorage.setItem('admin_token', data.token);
        setIsLoggedIn(true);
        setLoading(true);
        fetchData();
      } else {
        setLoginError(lang === 'en' ? 'Invalid username or password' : 'தவறான பயனர் பெயர் அல்லது கடவுச்சொல்');
      }
    } catch (err) {
      setLoginError(lang === 'en' ? 'Connection failed' : 'இணைப்பு தோல்வியடைந்தது');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    setIsLoggedIn(false);
  };

  const saveSettings = async (newSettings: any) => {
    const token = localStorage.getItem('admin_token');
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify({ key: 'app_config', value: newSettings })
      });
      setAppSettings(newSettings);
    } catch (err) {
      console.error(err);
    }
  };

  const updateApplication = async (id: number, updates: any) => {
    const token = localStorage.getItem('admin_token');
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': token || ''
        },
        body: JSON.stringify(updates)
      });
      if (res.ok) {
        fetchData();
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp({...selectedApp, ...updates});
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const deleteApplication = async (id: number) => {
    if (!confirm(lang === 'en' ? 'Are you sure you want to delete this application?' : 'இந்த விண்ணப்பத்தை நீக்க விரும்புகிறீர்களா?')) return;
    const token = localStorage.getItem('admin_token');
    try {
      const res = await fetch(`/api/admin/applications/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': token || '' }
      });
      if (res.ok) {
        fetchData();
        setSelectedApp(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="pt-32 text-center">{lang === 'en' ? 'Loading Dashboard...' : 'டாஷ்போர்டு ஏற்றப்படுகிறது...'}</div>;

  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-24 flex items-center justify-center px-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-xl max-w-md w-full"
        >
          <div className="text-center mb-8">
            <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="h-8 w-8 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900">{lang === 'en' ? 'Admin Login' : 'நிர்வாக உள்நுழைவு'}</h2>
            <p className="text-zinc-500 text-sm">{lang === 'en' ? 'Secure access to EnerNova backend' : 'EnerNova பின்னணிக்கான பாதுகாப்பான அணுகல்'}</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{lang === 'en' ? 'Username' : 'பயனர் பெயர்'}</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-amber-500"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{lang === 'en' ? 'Password' : 'கடவுச்சொல்'}</label>
              <input 
                type="password" 
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 outline-none focus:ring-2 focus:ring-amber-500"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            {loginError && <p className="text-red-500 text-xs font-medium">{loginError}</p>}
            <button 
              type="submit"
              className="w-full bg-zinc-900 text-white py-4 rounded-xl font-bold hover:bg-zinc-800 transition-all"
            >
              {lang === 'en' ? 'Unlock Dashboard' : 'டாஷ்போர்டைத் திறக்கவும்'}
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-zinc-400">Default: admin / admin123</p>
        </motion.div>
      </div>
    );
  }

  const COLORS = ['#f59e0b', '#10b981', '#6366f1', '#ec4899'];

  return (
    <div className="pt-24 pb-12 bg-zinc-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900">{t.adminCommand}</h1>
            <p className="text-sm text-zinc-500">{lang === 'en' ? 'Welcome back, Administrator' : 'மீண்டும் வருக, நிர்வாகி'}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleLogout}
              className="text-sm font-bold text-zinc-500 hover:text-zinc-900 flex items-center gap-2"
            >
              {t.logout} <X className="h-4 w-4" />
            </button>
            <div className="text-sm text-zinc-400">{lang === 'en' ? 'Last updated' : 'கடைசியாக புதுப்பிக்கப்பட்டது'}: {new Date().toLocaleTimeString()}</div>
          </div>
        </div>

        {/* Backend Settings (Local Storage on Backend) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 mb-8">
          <h3 className="text-lg font-bold text-zinc-900 mb-4 flex items-center gap-2">
            <Settings className="h-5 w-5 text-zinc-400" /> {t.platformSettings}
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-xl border border-zinc-100">
              <div>
                <p className="font-bold text-zinc-900">{t.maintenanceMode}</p>
                <p className="text-xs text-zinc-500">{t.disableApps}</p>
              </div>
              <button 
                onClick={() => saveSettings({...appSettings, maintenanceMode: !appSettings.maintenanceMode})}
                className={cn(
                  "w-12 h-6 rounded-full transition-all relative",
                  appSettings.maintenanceMode ? "bg-amber-500" : "bg-zinc-300"
                )}
              >
                <div className={cn(
                  "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                  appSettings.maintenanceMode ? "left-7" : "left-1"
                )} />
              </button>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{t.globalAlert}</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex-1 px-4 py-2 rounded-lg border border-zinc-200 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g. Subsidy deadline approaching!"
                  value={appSettings.alertBanner || ''}
                  onChange={e => setAppSettings({...appSettings, alertBanner: e.target.value})}
                />
                <button 
                  onClick={() => saveSettings(appSettings)}
                  className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-sm font-bold"
                >
                  {lang === 'en' ? 'Save' : 'சேமி'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-amber-50 p-2 rounded-lg"><ClipboardList className="h-6 w-6 text-amber-600" /></div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p className="text-zinc-500 text-sm font-medium">{lang === 'en' ? 'Total Applications' : 'மொத்த விண்ணப்பங்கள்'}</p>
            <p className="text-3xl font-bold text-zinc-900">{stats?.totalApplications || 0}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-50 p-2 rounded-lg"><Clock className="h-6 w-6 text-blue-600" /></div>
              <span className="text-xs font-bold text-zinc-400 bg-zinc-50 px-2 py-1 rounded-full">{lang === 'en' ? 'Active' : 'செயலில்'}</span>
            </div>
            <p className="text-zinc-500 text-sm font-medium">{lang === 'en' ? 'Pending Review' : 'ஆய்வில் உள்ளது'}</p>
            <p className="text-3xl font-bold text-zinc-900">{stats?.pendingApplications || 0}</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-50 p-2 rounded-lg"><Users className="h-6 w-6 text-purple-600" /></div>
              <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded-full">{lang === 'en' ? 'New' : 'புதியது'}</span>
            </div>
            <p className="text-zinc-500 text-sm font-medium">{lang === 'en' ? 'Total Enquiries' : 'மொத்த விசாரணைகள்'}</p>
            <p className="text-3xl font-bold text-zinc-900">{stats?.totalEnquiries || 0}</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-emerald-50 p-2 rounded-lg"><Activity className="h-6 w-6 text-emerald-600" /></div>
              <div className="flex items-center gap-2">
                <div className={cn("w-2 h-2 rounded-full", sensorData?.cleaning_status === 'cleaning' ? "bg-emerald-500 animate-pulse" : "bg-zinc-300")} />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  {sensorData?.cleaning_status === 'cleaning' ? (lang === 'en' ? 'Cleaning' : 'சுத்தம் செய்கிறது') : (lang === 'en' ? 'Idle' : 'காத்திருக்கிறது')}
                </span>
              </div>
            </div>
            <p className="text-zinc-500 text-sm font-medium">{lang === 'en' ? 'Cleaning System' : 'சுத்தம் செய்யும் அமைப்பு'}</p>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">LUX</p>
                <p className="text-xl font-bold text-zinc-900">{(sensorData?.lux || 0).toFixed(0)}</p>
              </div>
              <div className="bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1">VOLT</p>
                <p className="text-xl font-bold text-zinc-900">{(sensorData?.voltage || 0).toFixed(1)}V</p>
              </div>
            </div>
            <button 
              onClick={() => sendCleaningCommand(sensorData?.cleaning_status === 'cleaning' ? 'stop_cleaning' : 'start_cleaning')}
              className={cn(
                "w-full py-2 rounded-xl text-xs font-bold transition-all",
                sensorData?.cleaning_status === 'cleaning' 
                  ? "bg-red-50 text-red-600 hover:bg-red-100" 
                  : "bg-amber-50 text-amber-600 hover:bg-amber-100"
              )}
            >
              {sensorData?.cleaning_status === 'cleaning' 
                ? (lang === 'en' ? 'Stop Cleaning' : 'சுத்தம் செய்வதை நிறுத்து') 
                : (lang === 'en' ? 'Start Manual Clean' : 'சுத்தம் செய்யத் தொடங்கு')}
            </button>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">{lang === 'en' ? 'Application Trends' : 'விண்ணப்பப் போக்குகள்'}</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.recentActivity || []}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                  <Tooltip cursor={{fill: '#f9fafb'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
            <h3 className="text-lg font-bold text-zinc-900 mb-6">{lang === 'en' ? 'Status Distribution' : 'நிலை விநியோகம்'}</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: lang === 'en' ? 'Pending' : 'நிலுவையில் உள்ளது', value: stats?.pendingApplications || 1 },
                      { name: lang === 'en' ? 'Approved' : 'அங்கீகரிக்கப்பட்டது', value: 0 },
                      { name: lang === 'en' ? 'Installed' : 'நிறுவப்பட்டது', value: 0 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
          <div className="p-6 border-b border-zinc-100 flex justify-between items-center">
            <h3 className="text-lg font-bold text-zinc-900">{lang === 'en' ? 'Recent Applications' : 'சமீபத்திய விண்ணப்பங்கள்'}</h3>
            <button className="text-sm font-bold text-amber-600 hover:text-amber-700">{lang === 'en' ? 'View All' : 'அனைத்தையும் பார்'}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-zinc-50 text-zinc-500 text-xs font-bold uppercase tracking-wider">
                  <th className="px-6 py-4">{lang === 'en' ? 'Customer' : 'வாடிக்கையாளர்'}</th>
                  <th className="px-6 py-4">{lang === 'en' ? 'Contact Info' : 'தொடர்பு விவரங்கள்'}</th>
                  <th className="px-6 py-4">{lang === 'en' ? 'System Details' : 'அமைப்பு விவரங்கள்'}</th>
                  <th className="px-6 py-4">{lang === 'en' ? 'Status' : 'நிலை'}</th>
                  <th className="px-6 py-4">{lang === 'en' ? 'Actions' : 'நடவடிக்கைகள்'}</th>
                  <th className="px-6 py-4">{lang === 'en' ? 'Date' : 'தேதி'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-zinc-900">{app.name}</div>
                      <div className="text-xs text-zinc-500 flex items-center gap-1"><MapPin className="h-3 w-3" /> {app.location}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-zinc-600">{app.email}</div>
                      <div className="text-sm font-medium text-zinc-900">{app.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-zinc-900">{app.roof_type}</div>
                      <div className="text-xs text-zinc-500">{app.energy_usage} kWh/month</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        app.status === 'pending' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                      )}>
                        {app.status === 'pending' ? (lang === 'en' ? 'pending' : 'நிலுவையில்') : (lang === 'en' ? 'approved' : 'அங்கீகரிக்கப்பட்டது')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setSelectedApp(app)}
                        className="text-xs font-bold text-amber-600 hover:text-amber-700 bg-amber-50 px-3 py-1 rounded-full transition-colors"
                      >
                        {lang === 'en' ? 'View Details' : 'விவரங்களைப் பார்க்கவும்'}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-zinc-500">{new Date(app.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
                {applications.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-zinc-400">{lang === 'en' ? 'No applications found yet.' : 'விண்ணப்பங்கள் எதுவும் இன்னும் கிடைக்கவில்லை.'}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Application Details Modal */}
        <AnimatePresence>
          {selectedApp && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden"
              >
                <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-zinc-50">
                  <h3 className="text-xl font-bold text-zinc-900">{lang === 'en' ? 'Application Details' : 'விண்ணப்ப விவரங்கள்'}</h3>
                  <button onClick={() => setSelectedApp(null)} className="p-2 hover:bg-zinc-200 rounded-full transition-colors">
                    <X className="h-6 w-6 text-zinc-500" />
                  </button>
                </div>
                <div className="p-8 grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Customer Name' : 'வாடிக்கையாளர் பெயர்'}</p>
                      <p className="text-lg font-bold text-zinc-900">{selectedApp.name}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Customer ID' : 'வாடிக்கையாளர் ஐடி'}</p>
                      <div className="flex gap-2">
                        <input 
                          type="text" 
                          className="flex-1 px-3 py-1 rounded-lg border border-zinc-200 text-sm outline-none focus:ring-2 focus:ring-amber-500"
                          placeholder="e.g. EN-ERD-001"
                          value={editingId || selectedApp.customer_id || ''}
                          onChange={e => setEditingId(e.target.value)}
                        />
                        <button 
                          onClick={() => updateApplication(selectedApp.id, { customerId: editingId })}
                          disabled={updating}
                          className="bg-zinc-900 text-white px-3 py-1 rounded-lg text-xs font-bold disabled:opacity-50"
                        >
                          {lang === 'en' ? 'Set ID' : 'ஐடியை அமை'}
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Email Address' : 'மின்னஞ்சல் முகவரி'}</p>
                      <p className="text-zinc-600">{selectedApp.email}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Phone Number' : 'தொலைபேசி எண்'}</p>
                      <p className="text-zinc-900 font-medium">{selectedApp.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Property Type' : 'சொத்து வகை'}</p>
                      <span className="bg-zinc-100 text-zinc-700 px-3 py-1 rounded-full text-sm font-bold">{selectedApp.roof_type}</span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Monthly Energy Usage' : 'மாதாந்திர மின் பயன்பாடு'}</p>
                      <p className="text-lg font-bold text-amber-600">{selectedApp.energy_usage} kWh</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Application Status' : 'விண்ணப்ப நிலை'}</p>
                      <div className="flex items-center gap-2">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider inline-block",
                          selectedApp.status === 'pending' ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"
                        )}>
                          {selectedApp.status === 'pending' ? (lang === 'en' ? 'pending' : 'நிலுவையில்') : (lang === 'en' ? 'completed' : 'முடிந்தது')}
                        </span>
                        {selectedApp.status === 'pending' && (
                          <button 
                            onClick={() => updateApplication(selectedApp.id, { status: 'completed' })}
                            disabled={updating}
                            className="text-[10px] font-bold text-emerald-600 hover:underline disabled:opacity-50"
                          >
                            {lang === 'en' ? 'Mark Completed' : 'முடிந்ததாகக் குறிக்கவும்'}
                          </button>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">{lang === 'en' ? 'Submitted On' : 'சமர்ப்பிக்கப்பட்ட தேதி'}</p>
                      <p className="text-zinc-500 text-sm">{new Date(selectedApp.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-between items-center">
                  <button 
                    onClick={() => deleteApplication(selectedApp.id)}
                    className="text-red-500 font-bold text-sm flex items-center gap-2 hover:text-red-700 transition-colors"
                  >
                    <X className="h-4 w-4" /> {lang === 'en' ? 'Delete Application' : 'விண்ணப்பத்தை நீக்கு'}
                  </button>
                  <div className="flex gap-4">
                    <button 
                      onClick={() => { setSelectedApp(null); setEditingId(''); }}
                      className="px-6 py-2 rounded-xl font-bold text-zinc-500 hover:text-zinc-900 transition-colors"
                    >
                      {lang === 'en' ? 'Close' : 'மூடு'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CleaningSystem = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  const [sensorData, setSensorData] = useState<any>({ lux: 0, voltage: 0, cleaning_status: 'idle' });

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await fetch('/api/sensors/latest');
        if (res.ok) {
          const data = await res.json();
          setSensorData(data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLatest();
    const interval = setInterval(fetchLatest, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-zinc-900 text-white overflow-hidden relative">
      {/* Decorative background for dark section */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-amber-500/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mb-12 lg:mb-0"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-800 flex items-center justify-center"
            >
              {/* Representing the motorized wiper mechanism from user video */}
              <div className="relative w-full h-full bg-zinc-800 flex items-center justify-center">
                <div className="absolute inset-0 opacity-40">
                  <img 
                    src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=1000" 
                    alt="Solar Panel Base" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <motion.div 
                  animate={sensorData?.cleaning_status === 'cleaning' ? { x: [-100, 100, -100] } : { x: 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="w-4 h-full bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.5)] relative z-10 flex items-center justify-center"
                >
                  <div className="w-8 h-8 bg-zinc-700 rounded-sm border border-white/20" />
                </motion.div>
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-xl border border-white/10 grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-amber-500 mb-1">{lang === 'en' ? 'LUX' : 'ஒளி அளவு'}</p>
                    <p className="text-xs text-white font-bold">{(sensorData?.lux || 0).toFixed(0)}</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-amber-500 mb-1">{lang === 'en' ? 'VOLTAGE' : 'மின்னழுத்தம்'}</p>
                    <p className="text-xs text-white font-bold">{(sensorData?.voltage || 0).toFixed(1)}V</p>
                  </div>
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-widest text-amber-500 mb-1">{lang === 'en' ? 'STATUS' : 'நிலை'}</p>
                    <p className={cn(
                      "text-[10px] font-bold uppercase",
                      sensorData?.cleaning_status === 'cleaning' ? "text-emerald-400 animate-pulse" : "text-zinc-400"
                    )}>
                      {sensorData?.cleaning_status === 'cleaning' ? (lang === 'en' ? 'Cleaning' : 'சுத்தம் செய்கிறது') : (lang === 'en' ? 'Idle' : 'காத்திருக்கிறது')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute top-4 right-4 bg-amber-500 text-zinc-900 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
            >
              {t.proprietaryTech}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold mb-6 leading-tight"
            >
              {lang === 'en' ? <>Motorized <br/><span className="text-amber-500">Cleaning Mechanism</span></> : t.cleaningMechanism}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg mb-8 leading-relaxed"
            >
              {t.cleaningDesc}
            </motion.p>
            <ul className="space-y-4 mb-8">
              {[
                lang === 'en' ? "Custom Motorized Wiper Technology" : "தனிப்பயனாக்கப்பட்ட மோட்டார் வைப்பர் தொழில்நுட்பம்",
                lang === 'en' ? "IoT-Enabled Remote Activation" : "IoT-இயக்கப்பட்ட தொலைநிலை செயல்படுத்தல்",
                lang === 'en' ? "Automated Efficiency Optimization" : "தானியங்கி செயல்திறன் மேம்படுத்தல்",
                t.comingSoon + " (" + (lang === 'en' ? "Real-time Data Integration" : "நிகழ்நேர தரவு ஒருங்கிணைப்பு") + ")"
              ].map((item, i) => (
                <motion.li 
                  key={i} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-3"
                >
                  <div className="bg-amber-500/20 p-1 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-amber-500" />
                  </div>
                  <span className="text-zinc-300 font-medium">{item}</span>
                </motion.li>
              ))}
            </ul>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-zinc-900 px-8 py-4 rounded-full font-bold hover:bg-zinc-100 transition-all shadow-lg shadow-white/5"
            >
              {t.viewSpecs}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ lang }: { lang: 'en' | 'ta' }) => {
  const t = translations[lang];
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border-t border-zinc-100 py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <div className="flex items-center mb-6">
              <Sun className="h-8 w-8 text-amber-500" />
              <span className="ml-2 text-xl font-bold tracking-tight text-zinc-900">EnerNova</span>
            </div>
            <p className="text-zinc-500 max-w-sm leading-relaxed">
              {t.heroSubtitle}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-6">{lang === 'en' ? 'Quick Links' : 'விரைவு இணைப்புகள்'}</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li><a href="#" className="hover:text-amber-600 transition-colors">{t.home}</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">{t.services}</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">{t.subsidies}</a></li>
              <li><a href="#" className="hover:text-amber-600 transition-colors">{t.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-6">{lang === 'en' ? 'Contact' : 'தொடர்பு'}</h4>
            <ul className="space-y-4 text-zinc-500 text-sm">
              <li className="flex items-center gap-3"><Phone className="h-4 w-4" /> +91 95858 85151</li>
              <li className="flex items-center gap-3"><FileText className="h-4 w-4" /> madhan@gmail.com</li>
              <li className="flex items-center gap-3"><Settings className="h-4 w-4" /> Erode, Tamil Nadu, India</li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-xs">© 2026 EnerNova Smart Energy. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-zinc-400">
            <a href="#" className="hover:text-zinc-900">{t.privacy}</a>
            <a href="#" className="hover:text-zinc-900">{t.terms}</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [lang, setLang] = useState<'en' | 'ta'>('en');
  const [appConfig, setAppConfig] = useState<any>({});

  useEffect(() => {
    fetch('/api/settings/app_config')
      .then(res => res.json())
      .then(data => {
        if (data.value) setAppConfig(data.value);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-amber-100 selection:text-amber-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-100/30 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -100, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100/20 rounded-full blur-[120px]"
        />
      </div>

      {appConfig.alertBanner && (
        <div className="bg-amber-500 text-zinc-900 py-2 px-4 text-center text-xs font-bold uppercase tracking-widest fixed top-0 left-0 right-0 z-[60]">
          {appConfig.alertBanner}
        </div>
      )}

      <Navbar activePage={activePage} setActivePage={setActivePage} lang={lang} setLang={setLang} />
      
      <main className={cn(appConfig.alertBanner ? "pt-8" : "")}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {activePage === 'home' && (
              <>
                <Hero onApply={() => setActivePage('apply')} lang={lang} />
                <Services lang={lang} />
                <SolarCalculator lang={lang} />
                <LiveDashboard lang={lang} />
                <ImpactMap lang={lang} />
                <CleaningSystem lang={lang} />
              </>
            )}
            {activePage === 'services' && <Services lang={lang} />}
            {activePage === 'calculator' && <SolarCalculator lang={lang} />}
            {activePage === 'dashboard' && <LiveDashboard lang={lang} />}
            {activePage === 'impact' && <ImpactMap lang={lang} />}
            {activePage === 'portal' && <CustomerPortal lang={lang} />}
            {activePage === 'subsidies' && (
              <section className="pt-32 pb-24">
                <div className="max-w-4xl mx-auto px-4">
                  <div className="text-center mb-12">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
                      {lang === 'en' ? 'Official Central Government Schemes' : 'அதிகாரப்பூர்வ மத்திய அரசு திட்டங்கள்'}
                    </div>
                    <h2 className="text-4xl font-bold text-zinc-900 mb-4">{lang === 'en' ? 'PM-Surya Ghar: Muft Bijli Yojana' : 'பிஎம்-சூர்யா கர்: முஃப்ட் பிஜிலி யோஜனா'}</h2>
                    <p className="text-zinc-600">{lang === 'en' ? 'Launched by the Government of India to provide free electricity to 1 crore households.' : '1 கோடி வீடுகளுக்கு இலவச மின்சாரம் வழங்க இந்திய அரசால் தொடங்கப்பட்டது.'}</p>
                  </div>
                  
                  <div className="space-y-6">
                    {[
                      { 
                        title: lang === 'en' ? "Residential Rooftop Solar (1-2 kW)" : "குடியிருப்பு கூரை சூரிய சக்தி (1-2 kW)", 
                        amount: lang === 'en' ? "₹30,000 / kW" : "₹30,000 / kW", 
                        date: lang === 'en' ? "Launched: Feb 13, 2024" : "தொடங்கப்பட்டது: பிப் 13, 2024",
                        desc: lang === 'en' ? "Direct benefit transfer for households installing systems up to 2kW. Maximum subsidy of ₹60,000 for 2kW systems." : "2kW வரையிலான அமைப்புகளை நிறுவும் வீடுகளுக்கு நேரடி பயன் பரிமாற்றம். 2kW அமைப்புகளுக்கு அதிகபட்சமாக ₹60,000 மானியம்." 
                      },
                      { 
                        title: lang === 'en' ? "Residential Rooftop Solar (3 kW)" : "குடியிருப்பு கூரை சூரிய சக்தி (3 kW)", 
                        amount: lang === 'en' ? "₹78,000 Total" : "மொத்தம் ₹78,000", 
                        date: lang === 'en' ? "Current Phase: 2024-25" : "தற்போதைய கட்டம்: 2024-25",
                        desc: lang === 'en' ? "For systems of 3kW capacity or higher, a fixed subsidy of ₹78,000 is provided to the consumer." : "3kW அல்லது அதற்கு மேற்பட்ட திறன் கொண்ட அமைப்புகளுக்கு, நுகர்வோருக்கு ₹78,000 நிலையான மானியம் வழங்கப்படுகிறது." 
                      },
                      { 
                        title: lang === 'en' ? "Group Housing Societies (GHS/RWA)" : "குழு வீட்டு சங்கங்கள் (GHS/RWA)", 
                        amount: lang === 'en' ? "₹18,000 / kW" : "₹18,000 / kW", 
                        date: lang === 'en' ? "Validity: Dec 2025" : "செல்லுபடியாகும் காலம்: டிசம்பர் 2025",
                        desc: lang === 'en' ? "Common facilities including EV charging. Subsidy capped at 500kW per society at ₹18,000 per kW." : "EV சார்ஜிங் உள்ளிட்ட பொதுவான வசதிகள். ஒரு சங்கத்திற்கு 500kW வரை ₹18,000 மானியம் வழங்கப்படுகிறது." 
                      }
                    ].map((s, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 relative overflow-hidden group"
                      >
                        <div className="absolute top-0 right-0 bg-zinc-900 text-white px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                          {s.date}
                        </div>
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">{s.title}</h3>
                          <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{s.amount}</span>
                        </div>
                        <p className="text-zinc-600 mb-6 leading-relaxed">{s.desc}</p>
                        <div className="flex items-center gap-4">
                          <button onClick={() => setActivePage('apply')} className="bg-zinc-900 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-zinc-800 transition-all">
                            {translations[lang].apply}
                          </button>
                          <button className="text-zinc-500 font-bold text-sm flex items-center hover:text-zinc-900 transition-colors">
                            {lang === 'en' ? 'View Guidelines' : 'வழிகாட்டுதல்களைப் பார்க்கவும்'} <ArrowRight className="ml-2 h-4 w-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-100"
                  >
                    <h4 className="font-bold text-amber-900 mb-2 flex items-center">
                      <AlertCircle className="h-5 w-5 mr-2" /> {lang === 'en' ? 'Important Note' : 'முக்கிய குறிப்பு'}
                    </h4>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      {lang === 'en' 
                        ? 'The PM-Surya Ghar: Muft Bijli Yojana was officially launched on February 13, 2024. Applications are currently open for the 2024-2025 cycle. EnerNova assists in the entire registration process on the National Portal.'
                        : 'பிஎம்-சூர்யா கர்: முஃப்ட் பிஜிலி யோஜனா பிப்ரவரி 13, 2024 அன்று அதிகாரப்பூர்வமாக தொடங்கப்பட்டது. 2024-2025 சுழற்சிக்கான விண்ணப்பங்கள் தற்போது திறக்கப்பட்டுள்ளன. தேசிய போர்ட்டலில் முழு பதிவு செயல்முறைக்கும் EnerNova உதவுகிறது.'}
                    </p>
                  </motion.div>
                </div>
              </section>
            )}
            {activePage === 'cleaning' && <CleaningSystem lang={lang} />}
            {activePage === 'apply' && <ApplicationForm lang={lang} />}
            {activePage === 'admin' && <AdminDashboard lang={lang} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {activePage !== 'admin' && <Footer lang={lang} />}
    </div>
  );
}
