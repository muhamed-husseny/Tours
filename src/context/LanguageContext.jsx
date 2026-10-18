import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const translations = {
  ar: {
    brandName: "أكتوبر تورز",
    tagline: "وكالة سياحة موثوقة في 6 أكتوبر والشيخ زايد",
    browseTrips: "تصفح الرحلات",
    discounts: "العروض والخصومات",
    faq: "الأسئلة الشائعة",
    whyUs: "لماذا تختارنا",
    aboutUs: "عن الوكالة",
    chatWhatsApp: "تواصل معنا على واتساب",
    signIn: "تسجيل الدخول",
    clientDashboard: "لوحة التحكم",
    heroTitleLine1: "رحلات صممناها",
    heroTitleLine2: "لراحتك.",
    heroSubtitle: "برامج سياحية موثقة من 6 أكتوبر والشيخ زايد. 6 وجهات مميزة، كل رحلة خططنا لتفاصيلها قبل نشرها.",
    destinationLabel: "الوجهة والتصنيف",
    allDestinations: "كل الوجهات",
    beaches: "شواطئ وبحر أحمر",
    luxor: "رحلات الأقصر والحضارة",
    nileCruise: "رحلات الأقصر",
    umrah: "عمرة وزيارات دينية",
    international: "رحلات دولية",
    priceLabel: "السعر",
    anyPrice: "أي سعر",
    under5k: "أقل من 5,000 ج.م",
    under15k: "أقل من 15,000 ج.م",
    vipPackages: "باقات VIP فاخرة",
    showTrips: "اعرض الرحلات",
    showingResults: "عرض",
    tripsCount: "رحلات مميزة",
    availableTrips: "الرحلات المتاحة",
    availableTripsSub: "اختر وجهتك المفضلة من برامجنا المنظمة بأعلى درجات الراحة والدقة",
    perPerson: "للفرد",
    egp: "ج.م",
    days: "أيام",
    nights: "ليالٍ",
    viewDetails: "عرض التفاصيل",
    bookNow: "احجز الآن عبر واتساب",
    bookTrip: "حجز الرحلة مباشرة",
    inquireTrip: "استفسر عن الرحلة",
    pickupLocation: "نقطة التجمع والانطلاق",
    hotelStars: "تصنيف الإقامة",
    stars: "نجوم",
    rating: "التقييم العام",
    reviews: "تقييم موثق",
    overview: "نظرة عامة على البرنامج",
    itineraryTitle: "جدول وبرنامج الرحلة بالتفصيل",
    day: "اليوم",
    includesTitle: "الرحلة تشمل (المميزات)",
    excludesTitle: "الرحلة لا تشمل",
    secureBooking: "حجز موثق ومضمون 100%",
    localOfficeNotice: "يمكنك زيارة مقرنا في مول أركان - الشيخ زايد لتأكيد الحجز واستلام الإيصال الرسمي.",
    backToHome: "العودة للرئيسية",
    shareTrip: "مشاركة الرحلة",
    copiedToClipboard: "تم نسخ الرابط بنجاح!",
    callUs: "اتصل بنا هاتفياً",
    officeAddress: "مقر الوكالة: مبنى 4، أركان بلازا، محور 26 يوليو، الشيخ زايد / فرع ميدان الحصري، 6 أكتوبر",
    workingHours: "مواعيد العمل: يومياً من 10 صباحاً حتى 10 مساءً",
    phone: "0100 123 4567",
    copyright: "جميع الحقوق محفوظة © أكتوبر تورز 2026. برامج سياحية متكاملة من 6 أكتوبر والشيخ زايد.",
    discountsTitle: "باقات بأسعار مميزة",
    discountsSubtitle: "عروض مختارة لفترة محدودة",
    faqTitle: "الأسئلة الشائعة",
    faqSubtitle: "كل ما تحتاج معرفته عن الحجز والرحلات وخدماتنا المعتمدة",
    viewAllTrips: "عرض كل الرحلات المتاحة",
    whatsappMessagePrefix: "مرحباً، أود الاستفسار والحجز في برنامج:",
    selectedTrip: "الرحلة المختارة:",
    pricePrefix: "السعر:",
    durationPrefix: "المدة:",
    linkPrefix: "رابط الصفحة:"
  },
  en: {
    brandName: "October Tours",
    tagline: "Verified travel packages from 6th of October & Sheikh Zayed",
    browseTrips: "Browse trips",
    discounts: "Discounts",
    faq: "FAQ",
    whyUs: "Why Choose Us",
    aboutUs: "About Us",
    chatWhatsApp: "Chat on WhatsApp",
    signIn: "Sign In",
    clientDashboard: "Dashboard",
    heroTitleLine1: "Trips crafted",
    heroTitleLine2: "for your comfort.",
    heroSubtitle: "Verified travel packages from 6th of October & Sheikh Zayed. 6 curated destinations, planned to perfection.",
    destinationLabel: "DESTINATION",
    allDestinations: "All destinations",
    beaches: "Beaches & Red Sea",
    luxor: "Luxor Heritage Trips",
    nileCruise: "Luxor Trips",
    umrah: "Umrah & Religious Tours",
    international: "International Trips",
    priceLabel: "PRICE",
    anyPrice: "Any price",
    under5k: "Under 5,000 EGP",
    under15k: "Under 15,000 EGP",
    vipPackages: "VIP Luxury Packages",
    showTrips: "Show trips",
    showingResults: "Showing",
    tripsCount: "Curated trips",
    availableTrips: "Available Trips",
    availableTripsSub: "Choose your desired getaway from our meticulously designed packages",
    perPerson: "per person",
    egp: "EGP",
    days: "Days",
    nights: "Nights",
    viewDetails: "View Details",
    bookNow: "Book via WhatsApp",
    bookTrip: "Book Trip Directly",
    inquireTrip: "Inquire About Trip",
    pickupLocation: "Pickup & Departure",
    hotelStars: "Hotel Category",
    stars: "Stars",
    rating: "Overall Rating",
    reviews: "verified reviews",
    overview: "Program Overview",
    itineraryTitle: "Detailed Day-by-Day Itinerary",
    day: "Day",
    includesTitle: "What's Included",
    excludesTitle: "What's Excluded",
    secureBooking: "100% Verified & Guaranteed Booking",
    localOfficeNotice: "You can visit our office in Arkan Plaza - Sheikh Zayed to finalize your booking and receive your official voucher.",
    backToHome: "Back to Home",
    shareTrip: "Share Trip",
    copiedToClipboard: "Link copied to clipboard!",
    callUs: "Call Us",
    officeAddress: "Office: Building 4, Arkan Plaza, 26th of July Corridor, Sheikh Zayed / Hosary Branch, 6th of October",
    workingHours: "Hours: Daily 10:00 AM - 10:00 PM",
    phone: "+20 100 123 4567",
    copyright: "All Rights Reserved © October Tours 2026. Premium travel packages from 6th of October & Sheikh Zayed.",
    discountsTitle: "Featured Offers",
    discountsSubtitle: "Selected packages for a limited time",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Everything you need to know about booking, itineraries, and our verified services",
    viewAllTrips: "View all available trips",
    whatsappMessagePrefix: "Hello, I would like to inquire and book the trip:",
    selectedTrip: "Selected Trip:",
    pricePrefix: "Price:",
    durationPrefix: "Duration:",
    linkPrefix: "Page Link:"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    const saved = localStorage.getItem('october_tours_lang');
    return saved === 'en' ? 'en' : 'ar';
  });

  useEffect(() => {
    localStorage.setItem('october_tours_lang', lang);
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    if (lang === 'ar') {
      document.body.classList.remove('font-sans');
      document.body.classList.add('font-arabic');
    } else {
      document.body.classList.remove('font-arabic');
      document.body.classList.add('font-sans');
    }
  }, [lang]);

  const toggleLanguage = (targetLang) => {
    if (targetLang) {
      setLang(targetLang);
    } else {
      setLang(prev => (prev === 'ar' ? 'en' : 'ar'));
    }
  };

  const t = (key) => {
    return translations[lang]?.[key] || translations['ar']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t, isRTL: lang === 'ar' }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
