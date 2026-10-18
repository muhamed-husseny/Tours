import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function WhyUsSection() {
  const { lang } = useLanguage();

  const features = [
    {
      titleAr: "قريبون منك في زايد وأكتوبر",
      titleEn: "Locally Based in Zayed & October",
      descAr: "مقرنا ومكاتبنا في أركان بلازا بالشيخ زايد وميدان الحصري بأكتوبر. يمكنك زيارتنا شخصياً لاستلام التذاكر وحجز رحلتك.",
      descEn: "Our offices are in Arkan Plaza, Sheikh Zayed and Hosary Square, 6th of October. Visit us in person to finalize your bookings."
    },
    {
      titleAr: "نقاط تجمع وانطلاق مريحة",
      titleEn: "Convenient Local Departure Points",
      descAr: "نوفر أتوبيسات VIP حديثة تنطلق مباشرة من أمام أركان بلازا، هايبر وان، وميدان الحصري دون الحاجة للذهاب إلى وسط القاهرة.",
      descEn: "Modern VIP coach departures right outside Arkan Plaza, Hyper One, and Hosary Square—no need to travel into downtown Cairo."
    },
    {
      titleAr: "فنادق عاينّاها بأنفسنا",
      titleEn: "Personally Inspected Hotels",
      descAr: "نعتمد أعلى معايير الجودة في اختيار الفنادق والمنتجعات. فريقنا يزور ويختبر جودة الغرف والخدمات بصفة دورية قبل طرحها للعملاء.",
      descEn: "Following the highest standards, our team personally visits and audits every hotel, room, and service before publishing."
    },
    {
      titleAr: "دعم ومتابعة 24/7 عبر واتساب",
      titleEn: "24/7 WhatsApp Travel Concierge",
      descAr: "فريق دعم مخصص يرافقك خطوة بخطوة من لحظة الاستفسار حتى عودتك سالماً إلى منزلك، مع سرعة استجابة فائقة.",
      descEn: "Dedicated concierge team supporting you from your initial inquiry until you safely return home, with prompt WhatsApp response."
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-b border-slate-100 scroll-mt-20 relative">
      <span id="whyUs" className="absolute top-0 -mt-20 pt-20" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-black text-dark tracking-tight">
            {lang === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            {lang === 'ar' 
              ? 'صممنا خدماتنا خصيصاً لتوفير أقصى درجات الراحة وسهولة التنقل لسكان غرب القاهرة' 
              : 'Tailored specifically for West Cairo residents to ensure effortless journeys and zero hassle.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-3xl bg-slate-50/80 border border-slate-100 hover:bg-white hover:shadow-card-hover transition-all duration-300"
            >
              <h3 className="text-lg font-bold text-dark mb-2">
                {lang === 'ar' ? item.titleAr : item.titleEn}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {lang === 'ar' ? item.descAr : item.descEn}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
