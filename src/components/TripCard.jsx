import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export default function TripCard({ trip }) {
  const { lang, t, isRTL } = useLanguage();

  const title = lang === 'ar' ? trip.titleAr : trip.titleEn;
  const destination = lang === 'ar' ? trip.destinationAr : trip.destinationEn;

  const isFlexible = trip.flexibleDuration || trip.category === 'umrah' || trip.id?.includes('dubai');
  const durationText = isFlexible
    ? (lang === 'ar' ? 'مواعيد ومدد مرنة حسب الطلب' : 'Flexible dates & durations')
    : `${trip.durationDays} ${t('days')} / ${trip.durationNights} ${t('nights')}`;

  const formatPrice = (amount) => {
    return new Intl.NumberFormat(lang === 'ar' ? 'ar-EG' : 'en-US').format(amount);
  };

  const handleTripClick = () => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('tripsScrollPos', String(window.scrollY));
    }
  };

  return (
    <div className="group bg-white border border-slate-200/80 rounded-2xl p-0 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col flex-grow">
        {/* Edge-to-Edge Image Container flush against top, left, and right borders */}
        <div className="w-full aspect-[16/10] overflow-hidden relative m-0 p-0 rounded-none bg-slate-900">
          <Link to={`/trips/${trip.slug}`} onClick={handleTripClick} className="block w-full h-full p-0 m-0 border-0">
            <img
              src={trip.coverImage}
              alt={trip.titleAr}
              loading="lazy"
              className="w-full h-full object-cover object-center block scale-[1.12] group-hover:scale-[1.19] transition-transform duration-700 ease-out border-0 p-0 m-0"
            />
          </Link>
        </div>

        {/* Text content wrapper below image with p-5 */}
        <div className="p-5 flex flex-col flex-grow justify-between">
          <div>
            <p className="text-xs sm:text-sm text-slate-500 mb-1.5 line-clamp-1 font-medium">
              {destination} • {durationText}
            </p>

            <Link to={`/trips/${trip.slug}`} onClick={handleTripClick} className="block group/title">
              <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover/title:text-brand transition-colors line-clamp-2 leading-snug">
                {title}
              </h3>
            </Link>
          </div>

          {/* Price row with clear divider linking it to the title above */}
          <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xs text-slate-500 font-normal">
                {lang === 'ar' ? 'يبدأ من' : 'From'}
              </span>
              <span className="text-xl font-bold text-slate-900">
                {formatPrice(trip.discountPrice || trip.price)}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {t('egp')}
              </span>
            </div>

            <Link
              to={`/trips/${trip.slug}`}
              onClick={handleTripClick}
              className="text-sm font-semibold text-slate-900 hover:text-brand transition-colors inline-flex items-center gap-1 group/btn"
            >
              <span>{lang === 'ar' ? 'عرض التفاصيل' : 'View details'}</span>
              <ArrowUpRight className={`w-4 h-4 text-slate-400 group-hover/btn:text-brand transition-transform ${isRTL ? 'group-hover/btn:-translate-x-0.5' : 'group-hover/btn:translate-x-0.5'}`} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

