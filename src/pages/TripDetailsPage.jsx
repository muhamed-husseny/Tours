import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import mockData from '../data/mock-data.json';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  MessageCircle 
} from 'lucide-react';

export default function TripDetailsPage() {
  const { slug } = useParams();
  const { lang, t, isRTL } = useLanguage();
  
  const trip = mockData.find((item) => item.slug === slug);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    if (trip) {
      setCurrentImgIndex(0);
      
      // Dynamic SEO Updates
      const pageTitle = lang === 'ar' ? trip.metaTitleAr : trip.metaTitleEn;
      const metaDescription = lang === 'ar' ? trip.metaDescriptionAr : trip.metaDescriptionEn;
      
      document.title = `${pageTitle} | أكتوبر تورز`;

      let metaDescTag = document.querySelector('meta[name="description"]');
      if (!metaDescTag) {
        metaDescTag = document.createElement('meta');
        metaDescTag.name = 'description';
        document.head.appendChild(metaDescTag);
      }
      metaDescTag.setAttribute('content', metaDescription);
      
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [trip, lang]);

  // If trip not found
  if (!trip) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">
          {lang === 'ar' ? 'عفواً، هذه الرحلة غير موجودة' : 'Sorry, trip not found'}
        </h2>
        <Link
          to="/#trips"
          state={{ fromTripDetails: true, returnToTrips: true }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-black transition"
        >
          {lang === 'ar' ? 'العودة للرحلات' : 'Back to Trips'}
        </Link>
      </div>
    );
  }

  const title = lang === 'ar' ? trip.titleAr : trip.titleEn;
  const includes = lang === 'ar' ? trip.includesAr : trip.includesEn;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const isFlexible = trip.flexibleDuration || trip.category === 'umrah' || trip.id?.includes('dubai');
  const durationDisplay = isFlexible
    ? (lang === 'ar' ? 'مواعيد ومدد مرنة حسب الطلب' : 'Flexible dates & durations')
    : `${trip.durationDays} ${t('days')} / ${trip.durationNights} ${t('nights')}`;

  const priceToDisplay = trip.discountPrice || trip.price;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(amount);
  };

  // WhatsApp template message
  const agencyWhatsAppNumber = '201110809368';
  const whatsappTemplateMsg = encodeURIComponent(
    lang === 'ar'
      ? `مرحباً أكتوبر تورز، أود الاستفسار وحجز الرحلة التالية:
- *اسم الرحلة:* ${trip.titleAr}
- *المدة:* ${durationDisplay}
- *السعر:* ${formatPrice(priceToDisplay)} ${t('egp')}
- *رابط الصفحة:* ${currentUrl}

نحن مقيمون في (6 أكتوبر / الشيخ زايد) ونود معرفة مواعيد السفر وتأكيد الحجز. شكراً!`
      : `Hello October Tours, I would like to inquire & book the following trip:
- *Trip Name:* ${trip.titleEn}
- *Duration:* ${durationDisplay}
- *Price:* ${formatPrice(priceToDisplay)} ${t('egp')}
- *Page URL:* ${currentUrl}

We are based in (6th of October / Sheikh Zayed) and would like to confirm departure dates and booking availability. Thank you!`
  );

  const whatsappBookingUrl = `https://wa.me/${agencyWhatsAppNumber}?text=${whatsappTemplateMsg}`;

  // Image Carousel handling
  const allImages = [trip.coverImage, ...(trip.gallery || [])];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev + 1) % allImages.length);
  };

  return (
    <div className="bg-white min-h-screen pb-24 md:pb-16 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Back Link - Clean & subtle navigating directly to #trips */}
        <div className="mb-4 sm:mb-6">
          <Link 
            to="/#trips" 
            state={{ fromTripDetails: true, returnToTrips: true }}
            className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 text-sm font-semibold transition-colors"
          >
            {isRTL ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{lang === 'ar' ? 'العودة للرحلات' : 'Back to Trips'}</span>
          </Link>
        </div>

        {/* 2-Column Grid layout (Image Carousel ~2/3, Sticky Booking Card ~1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Main Column (~2/3): Image Carousel on top, followed by Trip Details */}
          <div className="lg:col-span-8">
            
            {/* Image Carousel (Force Horizontal Crop to push sidebars outside container) */}
            <div className="w-full aspect-[16/10] overflow-hidden rounded-2xl relative bg-slate-900 m-0 p-0 border-0 group">
              <img
                src={allImages[currentImgIndex]}
                alt={`${title} - Photo ${currentImgIndex + 1}`}
                className="w-full h-full object-cover object-center block scale-[1.12] group-hover:scale-[1.19] transition-transform duration-700 ease-out border-0 p-0 m-0 select-none"
              />

              {/* Prev / Next navigation buttons */}
              {allImages.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute top-1/2 -translate-y-1/2 left-3 sm:left-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute top-1/2 -translate-y-1/2 right-3 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/90 hover:bg-white text-slate-800 shadow-md flex items-center justify-center transition-all cursor-pointer active:scale-95"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Photo Counter Pill (e.g. 1/4) */}
              <div className="absolute bottom-3.5 ltr:right-3.5 rtl:left-3.5 z-10">
                <span className="bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-lg select-none">
                  {currentImgIndex + 1}/{allImages.length}
                </span>
              </div>
            </div>

            {/* Trip Title & Duration Badge directly below carousel */}
            <div className="mt-6 mb-6 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
                {title}
              </h1>
              <span className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-bold whitespace-nowrap">
                {durationDisplay}
              </span>
            </div>

            {/* 3 Clean & Concise Content Sections */}
            <div className="space-y-8 pt-2">
              
              {/* 1. Quick Overview (نبذة سريعة) */}
              <div className="border-t border-slate-100 pt-6 space-y-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'ar' ? 'نبذة سريعة' : 'Quick Overview'}
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {lang === 'ar' ? trip.metaDescriptionAr : trip.metaDescriptionEn}
                </p>
              </div>

              {/* 2. What's Included (ما تشمله الرحلة) - Clean 2-column grid */}
              <div className="border-t border-slate-100 pt-6 space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'ar' ? 'ما تشمله الرحلة' : "What's Included"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-snug">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. Program Highlights (أبرز محطات البرنامج) - Concise single-line steps */}
              <div className="border-t border-slate-100 pt-6 space-y-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  {lang === 'ar' ? 'أبرز محطات البرنامج' : 'Program Highlights'}
                </h3>
                <div className="space-y-3">
                  {trip.itinerary.map((stepItem, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span className="font-semibold text-slate-900 line-clamp-1">
                        {lang === 'ar' ? stepItem.titleAr : stepItem.titleEn}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Sticky Booking & Price Card (~1/3 width) */}
          <div className="lg:col-span-4 w-full">
            <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-6 sticky top-24 space-y-5">
              
              {/* 1. Price row */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    {formatPrice(priceToDisplay)}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-slate-900">
                    {t('egp')}
                  </span>
                  <span className="text-sm text-slate-400 font-normal">
                    / {t('perPerson')}
                  </span>
                </div>

                {/* 2. Subtitle under price */}
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
                  {isFlexible
                    ? (lang === 'ar' ? 'مواعيد ومدد مرنة حسب الطلب' : 'Flexible dates & durations')
                    : (lang === 'ar' ? 'شامل الإقامة والانتقالات' : 'Includes accommodation & transfers')}
                </p>
              </div>

              {/* 3. Green Action Button */}
              <a
                href={whatsappBookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-base flex items-center justify-center gap-2 shadow-sm transition-all duration-200 active:scale-[0.98]"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>{lang === 'ar' ? 'استفسر عن هذه الرحلة' : 'Inquire About This Trip'}</span>
              </a>

            </div>
          </div>

        </div>

      </div>

      {/* Sticky Bottom Action Bar for Mobile View */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-3 shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold">
            {t('perPerson')}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-black text-slate-900">
              {formatPrice(priceToDisplay)}
            </span>
            <span className="text-xs font-bold text-slate-600">{t('egp')}</span>
          </div>
        </div>

        <a
          href={whatsappBookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-3 px-4 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition active:scale-[0.98]"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>{lang === 'ar' ? 'استفسر عن هذه الرحلة' : 'Inquire About This Trip'}</span>
        </a>
      </div>

    </div>
  );
}
