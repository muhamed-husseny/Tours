import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FaqSection() {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0); // open first by default

  const faqItems = [
    {
      qAr: "كم من الوقت يستغرق إنشاء الموقع الإلكتروني؟",
      aAr: "يستغرق عادة ما بين أسبوعين إلى ستة أسابيع بحسب حجم المشروع وتفاصيله.",
      qEn: "How long does it take to build the website?",
      aEn: "Usually between two to six weeks depending on the project size."
    },
    {
      qAr: "هل يمكنني إضافة رحلات وتعديل البرامج بنفسي؟",
      aAr: "نعم، من خلال لوحة تحكم الإدارة، ونوفر فيديوهات تدريبية لكيفية إدارة وتحديث الموقع بسهولة.",
      qEn: "Can I add trips and edit programs myself?",
      aEn: "Yes, through the admin dashboard, and we provide video tutorials on how to manage the site."
    },
    {
      qAr: "كيف يقوم العميل بالحجز عبر الموقع؟",
      aAr: "يضغط العميل على زر الحجز في صفحة الرحلة، والذي يفتح محادثة واتساب مباشرة مع شركتكم لتأكيد التفاصيل.",
      qEn: "How does a customer book through the website?",
      aEn: "The customer clicks the booking button on the trip page, which opens a direct WhatsApp chat with your company to confirm details."
    },
    {
      qAr: "هل تدعمون أكثر من لغة؟",
      aAr: "نعم، نبني المواقع بلغتين، ثلاث، أربع أو أكثر بحسب الأسواق المستهدفة لشركتكم.",
      qEn: "Do you support more than one language?",
      aEn: "Yes, we build websites in two, three, four or more languages based on your target markets."
    },
    {
      qAr: "هل سيظهر الموقع في نتائج محركات البحث؟",
      aAr: "نجهز كل رحلة بصفحة مستقلة وعنوان ووصف ورابط نظيف، وتصدر النتائج يتطلب عملاً مستمراً وهو ما نوفره في خدمة تحسين محركات البحث SEO.",
      qEn: "Will the website appear in search engine results?",
      aEn: "We prepare each trip with an independent page, clean title, description, and URLs. Ongoing SEO ranking requires continuous work, which is part of our SEO service."
    },
    {
      qAr: "هل الموقع متوافق مع الهواتف الذكية؟",
      aAr: "نعم، جميع مواقعنا متوافقة بالكامل ومجربة على جميع الأجهزة قبل الإطلاق لضمان تجربة مستخدم سريعة وسلسة.",
      qEn: "Is the website mobile-friendly?",
      aEn: "Yes, all our websites are fully responsive and tested across all devices before launch."
    }
  ];

  const toggleAccordion = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-surface scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-brand text-xs font-bold mb-3">
            <HelpCircle className="w-4 h-4" />
            <span>{t('faqTitle')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-dark tracking-tight">
            {lang === 'ar' ? 'إجابات على أكثر استفساراتكم شيوعاً' : 'Answers to Frequently Asked Questions'}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-2">
            {t('faqSubtitle')}
          </p>
        </div>

        {/* Collapsible Accordion with clean cards */}
        <div className="space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const question = lang === 'ar' ? item.qAr : item.qEn;
            const answer = lang === 'ar' ? item.aAr : item.aEn;

            return (
              <div
                key={index}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen 
                    ? 'border-brand/40 shadow-soft' 
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full text-start px-6 py-5 flex items-center justify-between gap-4 font-bold text-dark text-base sm:text-lg focus:outline-none cursor-pointer"
                >
                  <span className="flex-1">{question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 bg-brand/10 text-brand' : 'bg-slate-100 text-slate-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 animate-fadeIn">
                    <p>{answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
