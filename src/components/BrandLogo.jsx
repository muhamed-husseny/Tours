import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function BrandLogo({ className = "h-8", theme = "light" }) {
  const { lang, t } = useLanguage();

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Geometric brand icon */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-brand">
          <circle cx="16" cy="16" r="15" fill={theme === 'dark' ? '#0D192E' : '#EFF6FF'} />
          <path
            d="M16 6C16 11.5228 11.5228 16 6 16C11.5228 16 16 20.4772 16 26C16 20.4772 20.4772 16 26 16C20.4772 16 16 11.5228 16 6Z"
            fill="#2563EB"
          />
          <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className={`text-xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-dark'} ${lang === 'ar' ? 'font-arabic' : 'font-sans'}`}>
          {t('brandName')}
        </span>
      </div>
    </div>
  );
}
