import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import TripCard from './TripCard';

export default function TripsList({
  trips,
  selectedCategory,
  setSelectedCategory,
  selectedPrice,
  setSelectedPrice
}) {
  const { lang, t, isRTL } = useLanguage();

  const handleTripClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tripsScrollPos', String(window.scrollY));
    }
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(amount);
  };

  const categories = [
    { 
      id: 'all', 
      labelAr: 'الكل', 
      labelEn: 'All' 
    },
    { 
      id: 'dahab', 
      labelAr: 'دهب', 
      labelEn: 'Dahab' 
    },
    { 
      id: 'sharm', 
      labelAr: 'شرم الشيخ', 
      labelEn: 'Sharm El Sheikh' 
    },
    { 
      id: 'hurghada', 
      labelAr: 'الغردقة', 
      labelEn: 'Hurghada' 
    },
    { 
      id: 'luxor', 
      labelAr: 'الأقصر', 
      labelEn: 'Luxor' 
    },
    { 
      id: 'umrah', 
      labelAr: 'العمرة', 
      labelEn: 'Umrah' 
    },
    { 
      id: 'dubai', 
      labelAr: 'دبي', 
      labelEn: 'Dubai' 
    }
  ];

  // Bento layout configuration for all 6 destinations
  const bentoConfig = [
    {
      key: 'luxor',
      colSpan: 'md:col-span-2',
      nameAr: 'الأقصر',
      nameEn: 'Luxor',
    },
    {
      key: 'sharm',
      colSpan: 'md:col-span-1',
      nameAr: 'شرم الشيخ',
      nameEn: 'Sharm El Sheikh',
    },
    {
      key: 'dahab',
      colSpan: 'md:col-span-1',
      nameAr: 'دهب',
      nameEn: 'Dahab',
    },
    {
      key: 'umrah',
      colSpan: 'md:col-span-1',
      nameAr: 'العمرة',
      nameEn: 'Umrah',
    },
    {
      key: 'hurghada',
      colSpan: 'md:col-span-1',
      nameAr: 'الغردقة',
      nameEn: 'Hurghada',
    },
    {
      key: 'dubai',
      colSpan: 'md:col-span-2',
      nameAr: 'دبي',
      nameEn: 'Dubai',
    },
  ];

  const bentoItems = bentoConfig.map(cfg => {
    const trip = trips.find(t => 
      t.id.includes(cfg.key) || 
      t.slug.includes(cfg.key) || 
      t.category === cfg.key ||
      (cfg.key === 'dubai' && t.category === 'international')
    );
    return { ...cfg, trip };
  }).filter(item => item.trip);

  // Filtering logic by destination
  const filteredTrips = trips.filter((trip) => {
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'dahab' && !trip.slug.includes('dahab') && !trip.id.includes('dahab')) return false;
      if (selectedCategory === 'sharm' && !trip.slug.includes('sharm') && !trip.id.includes('sharm')) return false;
      if (selectedCategory === 'hurghada' && !trip.slug.includes('hurghada') && !trip.id.includes('hurghada')) return false;
      if (selectedCategory === 'luxor' && !trip.slug.includes('luxor') && !trip.id.includes('luxor') && trip.category !== 'luxor') return false;
      if (selectedCategory === 'umrah' && !trip.slug.includes('umrah') && !trip.id.includes('umrah') && trip.category !== 'umrah') return false;
      if (selectedCategory === 'dubai' && !trip.slug.includes('dubai') && !trip.id.includes('dubai') && trip.category !== 'international') return false;
    }

    // Price match
    const effectivePrice = trip.discountPrice || trip.price;
    if (selectedPrice === 'under5k' && effectivePrice >= 5000) {
      return false;
    }
    if (selectedPrice === 'under15k' && effectivePrice >= 15000) {
      return false;
    }
    if (selectedPrice === 'vip' && effectivePrice < 15000) {
      return false;
    }

    return true;
  });

  return (
    <section id="trips" className="py-16 sm:py-20 bg-white scroll-mt-24 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            {lang === 'ar' ? 'اكتشف وجهتك القادمة' : 'Discover Your Next Destination'}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
            {lang === 'ar' 
              ? 'اختر المكان اللي نفسك تزوره وشوف البرامج السياحية المتاحة لكل وجهة'
              : 'Choose the place you want to visit and explore available travel programs'}
          </p>
        </div>

        {/* Filter Tabs */}
        <div 
          className="flex items-center gap-2 overflow-x-auto flex-nowrap no-scrollbar pb-2 mb-8 sm:mb-10"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const label = lang === 'ar' ? cat.labelAr : cat.labelEn;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
                }`}
              >
                {label}
              </button>
            );
          })}

          {/* Tab to smoothly scroll directly to Featured Packages section */}
          <button
            type="button"
            onClick={() => {
              const discountsSection = document.getElementById('discounts');
              if (discountsSection) {
                discountsSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer bg-slate-100 hover:bg-slate-200/80 text-slate-700"
          >
            {lang === 'ar' ? 'باقات بأسعار مميزة' : 'Featured Packages'}
          </button>
        </div>

        {/* Main Display: 6-Item Bento Grid when 'All' is selected, or filtered cards */}
        {selectedCategory === 'all' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {bentoItems.map((item) => {
              const trip = item.trip;
              const effectivePrice = trip.discountPrice || trip.price;
              const destinationName = lang === 'ar' ? item.nameAr : item.nameEn;
              const priceText = lang === 'ar' 
                ? `يبدأ من ${formatPrice(effectivePrice)} ${t('egp')}` 
                : `From ${formatPrice(effectivePrice)} ${t('egp')}`;
              const actionText = lang === 'ar' ? 'استكشف الوجهة' : 'Explore destination';

              return (
                <Link
                  key={trip.id}
                  to={`/trips/${trip.slug}`}
                  onClick={handleTripClick}
                  className={`${item.colSpan} h-72 md:h-80 rounded-2xl overflow-hidden relative group cursor-pointer block bg-slate-900 border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  {/* Full-bleed photo with balanced hover zoom */}
                  <img
                    src={trip.coverImage}
                    alt={destinationName}
                    loading="lazy"
                    className="w-full h-full object-cover object-center scale-[1.12] group-hover:scale-[1.19] transition-transform duration-700 ease-out block border-0 p-0 m-0"
                  />

                  {/* Dark bottom gradient overlay */}
                  <div className="bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent absolute inset-0 pointer-events-none" />

                  {/* Text positioned cleanly in the bottom corner */}
                  <div className="absolute bottom-5 start-5 end-5 text-white z-10 pointer-events-none">
                    <p className="text-amber-400 text-xs font-bold mb-1 tracking-wide">
                      {priceText}
                    </p>

                    <h3 className="text-2xl font-black text-white mb-1 drop-shadow-sm">
                      {destinationName}
                    </h3>

                    <span className="text-xs text-slate-200 flex items-center gap-1 font-medium group-hover:text-white transition-colors">
                      <span>{actionText}</span>
                      <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1">
                        {isRTL ? '←' : '→'}
                      </span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : filteredTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-8 md:gap-y-12 gap-x-6">
            {filteredTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-slate-500 font-medium mb-4 text-sm">
              {lang === 'ar' ? 'لا توجد رحلات مطابقة لهذا الفلتر حالياً.' : 'No trips match the current filter selection.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                if (setSelectedPrice) setSelectedPrice('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-brand transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'إعادة تعيين الفلاتر' : 'Reset Filters'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
