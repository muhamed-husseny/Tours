import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function FloatingWhatsApp() {
  const { lang } = useLanguage();
  const location = useLocation();

  // Hide on trip detail pages to avoid overlap with the dedicated inquiry button
  if (location.pathname.startsWith('/trips/')) {
    return null;
  }

  const agencyWhatsAppNumber = '201110809368';
  const whatsappUrl = `https://wa.me/${agencyWhatsAppNumber}?text=${encodeURIComponent(
    lang === 'ar'
      ? 'مرحباً أكتوبر تورز، أود الاستفسار عن برامج الرحلات السياحية وعروض السفر المتاحة.'
      : 'Hello October Tours, I would like to inquire about your available travel packages and offers.'
  )}`;

  const buttonText = lang === 'ar' ? 'تواصل معنا عبر واتساب' : 'Chat on WhatsApp';

  return (
    <div className="fixed bottom-4 z-50 ltr:right-4 rtl:left-4 md:bottom-6 md:ltr:right-6 md:rtl:left-6 select-none">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={buttonText}
        className="group inline-flex items-center gap-2 px-3.5 py-2.5 md:gap-3 md:px-5 md:py-3 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 ring-4 ring-white/30"
      >
        {/* Exact Official WhatsApp Logo matching reference */}
        <div className="relative flex items-center justify-center shrink-0">
          <span className="absolute inset-0 rounded-full bg-white/20 animate-ping pointer-events-none"></span>
          <svg 
            className="w-6 h-6 md:w-8 md:h-8 relative z-10 transition-transform duration-300 group-hover:scale-110" 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* White speech bubble outline with pointer */}
            <path 
              fillRule="evenodd" 
              clipRule="evenodd" 
              d="M50 10C27.909 10 10 27.909 10 50C10 57.514 12.08 64.542 15.694 70.563L11 89L29.917 84.475C35.688 87.712 42.585 89.568 50 89.568C72.091 89.568 90 71.659 90 50C90 28.341 72.091 10 50 10ZM50 16.8C68.336 16.8 83.2 31.664 83.2 50C83.2 68.336 68.336 82.8 50 82.8C43.58 82.8 37.575 80.976 32.49 77.828L31.239 77.051L19.851 79.771L22.628 68.508L21.772 67.147C18.279 61.584 16.8 55.632 16.8 50C16.8 31.664 31.664 16.8 50 16.8Z" 
              fill="white"
            />
            {/* White telephone handset */}
            <path 
              d="M66.425 61.275C65.575 60.85 60.375 58.275 59.425 57.925C58.45 57.575 57.75 57.4 57.05 58.45C56.325 59.5 54.275 61.925 53.65 62.625C53.025 63.35 52.4 63.425 51.35 62.925C50.275 62.4 46.85 61.275 42.8 57.65C39.65 54.85 37.525 51.375 36.9 50.325C36.275 49.275 36.825 48.7 37.375 48.15C37.85 47.675 38.45 46.925 39 46.3C39.55 45.675 39.75 45.225 40.1 44.525C40.45 43.825 40.3 43.25 40.025 42.7C39.75 42.15 37.625 36.975 36.75 34.875C35.9 32.825 35.025 33.1 34.4 33.075H32.35C31.65 33.075 30.525 33.35 29.575 34.375C28.625 35.4 25.975 37.9 25.975 43C25.975 48.1 29.675 53.025 30.2 53.725C30.725 54.425 37.5 64.85 47.925 69.35C50.4 70.425 52.35 71.075 53.85 71.55C56.35 72.35 58.625 72.275 60.425 72C62.45 71.7 66.65 69.45 67.55 66.95C68.45 64.45 68.45 62.3 68.175 61.85C67.925 61.425 67.475 61.7 66.425 61.275Z" 
              fill="white"
            />
          </svg>
        </div>

        {/* Clear Familiar Text Label */}
        <span className="text-xs md:text-sm font-extrabold tracking-tight text-white whitespace-nowrap drop-shadow-sm">
          {buttonText}
        </span>
      </a>
    </div>
  );
}
