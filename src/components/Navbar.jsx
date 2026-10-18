import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import BrandLogo from './BrandLogo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (hash) => {
    setMobileMenuOpen(false);
    sessionStorage.removeItem('tripsScrollPos');

    const sectionId = hash.replace('#', '');
    const getTargetEl = () => {
      if (sectionId === 'why-us' || sectionId === 'whyUs') {
        return document.getElementById('why-us') || document.getElementById('whyUs');
      }
      return document.getElementById(sectionId);
    };

    if (location.pathname === '/') {
      const elem = getTargetEl();
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home with hash & state — ScrollToTop will smooth-scroll
      navigate(`/${hash}`, { state: { scrollTo: sectionId } });
    }
  };



  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Leading Side: Logo & Main Nav Links */}
        <div className="flex items-center gap-8 lg:gap-10">
          <Link to="/" className="cursor-pointer focus:outline-none">
            <BrandLogo />
          </Link>

          {/* Nav links on desktop */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleNavClick('#trips')}
              className="hover:text-dark transition-colors py-1 cursor-pointer font-semibold"
            >
              {t('browseTrips')}
            </button>
            <button
              onClick={() => handleNavClick('#discounts')}
              className="hover:text-dark transition-colors py-1 cursor-pointer"
            >
              {t('discounts')}
            </button>
          </nav>
        </div>

        {/* Trailing Side: Language Switcher & WhatsApp Button */}
        <div className="hidden lg:flex items-center gap-3">
          
          {/* Language Switcher Pill */}
          <div className="flex items-center p-1 bg-slate-100 rounded-full border border-slate-200/60 text-xs font-bold select-none">
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                lang === 'ar'
                  ? 'bg-dark text-white shadow-sm'
                  : 'text-slate-600 hover:text-dark'
              }`}
            >
              AR
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                lang === 'en'
                  ? 'bg-dark text-white shadow-sm'
                  : 'text-slate-600 hover:text-dark'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Mobile Right Bar */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Quick Lang Switch */}
          <div className="flex items-center p-0.5 bg-slate-100 rounded-full border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setLang('ar')}
              className={`px-2 py-1 rounded-full ${lang === 'ar' ? 'bg-dark text-white' : 'text-slate-600'}`}
            >
              AR
            </button>
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-1 rounded-full ${lang === 'en' ? 'bg-dark text-white' : 'text-slate-600'}`}
            >
              EN
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile menu drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-4 animate-fadeIn">
          <nav className="flex flex-col space-y-2 pt-2">
            <button
              onClick={() => handleNavClick('#trips')}
              className="text-start px-3 py-2 text-base font-semibold text-slate-800 rounded-lg hover:bg-slate-50"
            >
              {t('browseTrips')}
            </button>
            <button
              onClick={() => handleNavClick('#discounts')}
              className="text-start px-3 py-2 text-base font-medium text-slate-700 rounded-lg hover:bg-slate-50"
            >
              {t('discounts')}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
