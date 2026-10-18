import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import TripCard from './TripCard';

export default function DiscountsSection({ trips }) {
  const { lang } = useLanguage();

  // Strictly filter to ONLY 3 featured packages: Sharm, Hurghada, Luxor
  const targetKeys = ['sharm', 'hurghada', 'luxor'];
  const featuredTrips = targetKeys.map(key => 
    trips.find(t => t.id.includes(key) || t.slug.includes(key) || t.category === key)
  ).filter(Boolean);

  if (featuredTrips.length === 0) return null;

  return (
    <section id="discounts" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Simple & Calm Section Header */}
        <div className="mb-10 max-w-xl">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {lang === 'ar' ? 'باقات بأسعار مميزة' : 'Featured Packages'}
          </h2>
          <p className="text-slate-500 text-sm sm:text-base mt-1.5">
            {lang === 'ar' ? 'عروض مختارة لفترة محدودة بأفضل الأسعار' : 'Special limited-time offers with the best rates'}
          </p>
        </div>

        {/* Clean 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTrips.map((trip) => (
            <TripCard key={`featured-${trip.id}`} trip={trip} />
          ))}
        </div>

      </div>
    </section>
  );
}
