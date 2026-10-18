import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  const { lang, t, isRTL } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden bg-slate-900">
      {/* Background Image Container */}
      <div className="relative w-full min-h-[500px] md:min-h-[560px] lg:min-h-[600px] overflow-hidden">
        
        {/* Background Image */}
        <img
          src="/tourism-images/hero/cover.webp?v=5"
          alt="October Tours luxury destinations"
          className="absolute inset-0 w-full h-full object-cover object-center block border-0 p-0 m-0 scale-100"
        />

        {/* Cinematic gradient overlay:
            Dark gradient on the text side (right for RTL, left for LTR) */}
        <div 
          className={`absolute inset-0 z-10 ${
            isRTL
              ? 'bg-gradient-to-l from-black/85 via-black/60 to-black/20'
              : 'bg-gradient-to-r from-black/85 via-black/60 to-black/20'
          }`}
        />

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[500px] md:min-h-[560px] lg:min-h-[600px] flex flex-col justify-center py-16 md:py-24">
          <div className="max-w-2xl text-white">
            

            {/* Headline:
                Huge bold text in two lines with period at the end */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] mb-6 drop-shadow-sm">
              <span>{t('heroTitleLine1')}</span>
              <br />
              <span className="text-white">{t('heroTitleLine2')}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 font-normal leading-relaxed max-w-xl opacity-95 mb-8">
              {t('heroSubtitle')}
            </p>

            {/* Direct CTA button to browse trips (smooth scroll) */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                sessionStorage.removeItem('tripsScrollPos');
                const tripsEl = document.getElementById('trips');
                if (tripsEl) {
                  tripsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-white text-dark font-extrabold text-sm sm:text-base shadow-xl hover:bg-slate-100 transition-all duration-200 active:scale-95 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'استكشف الرحلات المتاحة' : 'Explore Available Trips'}</span>
              <ArrowDown className="w-4 h-4 text-brand" />
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}
