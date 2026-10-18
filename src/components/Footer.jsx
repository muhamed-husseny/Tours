import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import BrandLogo from './BrandLogo';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const { lang } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    sessionStorage.removeItem('tripsScrollPos');

    const getTargetEl = () => {
      if (sectionId === 'why-us' || sectionId === 'whyUs') {
        return document.getElementById('why-us') || document.getElementById('whyUs');
      }
      return document.getElementById(sectionId);
    };

    if (location.pathname === '/') {
      // Already on home — smooth scroll directly
      const el = getTargetEl();
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // Navigate to home with hash & state — ScrollToTop will smooth-scroll
      navigate(`/#${sectionId}`, { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="relative bg-[#070c18] text-slate-300 pt-16 pb-24 md:pb-10 overflow-hidden">
      {/* Top ambient brand-blue highlight line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      
      {/* Ambient soft glow radiating from top center matching the brand blue */}
      <div 
        aria-hidden="true" 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-48 bg-blue-600/15 blur-[100px] pointer-events-none rounded-full" 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 border-b border-white/[0.08]">
          
          {/* Column 1: Brand & About (Leading) */}
          <div className="space-y-4">
            <Link 
              to="/" 
              className="inline-block p-2.5 rounded-2xl bg-white/[0.04] border border-blue-500/20 hover:border-blue-400/40 hover:bg-white/[0.07] transition-all shadow-sm"
            >
              <BrandLogo theme="dark" />
            </Link>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm pt-2">
              {lang === 'ar'
                ? 'شركة سياحة مصرية متخصصة في تنظيم وحجز الرحلات الداخلية والفنادق والعمرة والتأشيرات وتذاكر الطيران من 6 أكتوبر والشيخ زايد.'
                : 'An Egyptian travel agency specialized in organizing and booking domestic trips, luxury hotels, Umrah, visas, and flight tickets from 6th of October & Sheikh Zayed.'}
            </p>
          </div>

          {/* Column 2: Quick Links (روابط سريعة) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-blue-900/40 pb-2">
              {lang === 'ar' ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a href="#trips" onClick={(e) => handleSectionClick(e, 'trips')} className="hover:text-blue-300 transition-colors block cursor-pointer">
                  {lang === 'ar' ? 'تصفح البرامج والرحلات' : 'Browse Trips & Packages'}
                </a>
              </li>
              <li>
                <a href="#discounts" onClick={(e) => handleSectionClick(e, 'discounts')} className="hover:text-blue-300 transition-colors block cursor-pointer">
                  {lang === 'ar' ? 'العروض والخصومات الحصرية' : 'Exclusive Discounts & Offers'}
                </a>
              </li>
              <li>
                <a href="#why-us" onClick={(e) => handleSectionClick(e, 'why-us')} className="hover:text-blue-300 transition-colors block cursor-pointer">
                  {lang === 'ar' ? 'لماذا تختارنا' : 'Why Choose Us'}
                </a>
              </li>
              <li>
                <a 
                  href="https://wa.me/201110809368" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-300 transition-colors block text-emerald-400 font-medium"
                >
                  {lang === 'ar' ? 'حجز واستفسار سريع عبر واتساب' : 'Quick WhatsApp Booking'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Destinations (الوجهات) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-blue-900/40 pb-2">
              {lang === 'ar' ? 'الوجهات' : 'Destinations'}
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <Link to="/trips/dahab-blue-hole-adventure" className="hover:text-blue-300 transition-colors block">
                  {lang === 'ar' ? 'دهب' : 'Dahab'}
                </Link>
              </li>
              <li>
                <Link to="/trips/sharm-el-sheikh-aqua-park-relax" className="hover:text-blue-300 transition-colors block">
                  {lang === 'ar' ? 'شرم الشيخ' : 'Sharm El Sheikh'}
                </Link>
              </li>
              <li>
                <Link to="/trips/hurghada-giftun-island-magic" className="hover:text-blue-300 transition-colors block">
                  {lang === 'ar' ? 'الغردقة' : 'Hurghada'}
                </Link>
              </li>
              <li>
                <Link to="/trips/luxor-heritage-temples-adventure" className="hover:text-blue-300 transition-colors block">
                  {lang === 'ar' ? 'الأقصر' : 'Luxor'}
                </Link>
              </li>
              <li>
                <Link to="/trips/elite-vip-umrah-direct-flight" className="hover:text-blue-300 transition-colors block">
                  {lang === 'ar' ? 'رحلة العمرة' : 'Umrah Trip'}
                </Link>
              </li>
              <li>
                <Link to="/trips/dubai-magical-package-flights-visa" className="hover:text-blue-300 transition-colors block">
                  {lang === 'ar' ? 'دبي' : 'Dubai'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Us (تواصل معنا) */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-b border-blue-900/40 pb-2">
              {lang === 'ar' ? 'تواصل معنا' : 'Contact Us'}
            </h4>
            
            <div className="space-y-3.5 text-sm text-slate-400">
              {/* Phone 1 (Primary) */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:01110809368" dir="ltr" className="hover:text-white transition-colors font-medium">
                  01110809368
                </a>
              </div>

              {/* Phone 2 (Secondary) */}
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:01096355067" dir="ltr" className="hover:text-white transition-colors font-medium">
                  01096355067
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:info@octobertours.com" className="hover:text-white transition-colors truncate">
                  info@octobertours.com
                </a>
              </div>

              {/* Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span className="leading-snug">
                  {lang === 'ar' 
                    ? 'السادس من أكتوبر، الشيخ زايد، الجيزة، مصر' 
                    : '6th of October & Sheikh Zayed, Giza, Egypt'}
                </span>
              </div>

              {/* Hours */}
              <div className="flex items-center gap-2.5 pt-1 text-slate-400">
                <Clock className="w-4 h-4 text-blue-400/70 shrink-0" />
                <span className="text-xs">
                  {lang === 'ar' 
                    ? 'يوميًا من 10 صباحًا حتى 10 مساءً' 
                    : 'Daily from 10:00 AM to 10:00 PM'}
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Centered Copyright Line */}
        <div className="pt-8 text-center text-xs text-slate-500">
          <p>
            {lang === 'ar'
              ? 'جميع الحقوق محفوظة © أكتوبر تورز 2026'
              : 'All Rights Reserved © October Tours 2026'}
          </p>
        </div>

      </div>
    </footer>
  );
}
