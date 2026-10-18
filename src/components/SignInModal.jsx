import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Lock, Phone, User, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function SignInModal({ isOpen, onClose }) {
  const { lang, t, isRTL } = useLanguage();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bookingCode, setBookingCode] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (phoneNumber) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setPhoneNumber('');
    setBookingCode('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transform transition-all p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 ltr:right-5 rtl:left-5 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center text-brand">
            <Lock className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-dark">
              {lang === 'ar' ? 'تسجيل دخول العملاء وإدارة الحجوزات' : 'Customer & Booking Portal'}
            </h3>
            <p className="text-xs text-slate-500">
              {lang === 'ar' ? 'أكتوبر تورز - فرع الشيخ زايد و6 أكتوبر' : 'October Tours - Zayed & October Branch'}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <h4 className="text-lg font-bold text-dark mb-2">
              {lang === 'ar' ? 'مرحباً بك! تم التحقق من رقم هاتفك' : 'Welcome! Mobile Verified'}
            </h4>
            <p className="text-sm text-slate-600 mb-6">
              {lang === 'ar'
                ? 'يمكنك متابعة تفاصيل حجزك والتواصل المباشر مع مستشارك السياحي عبر واتساب.'
                : 'You can now track your travel details and directly contact your advisor on WhatsApp.'}
            </p>
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 rounded-xl bg-dark text-white font-semibold text-sm hover:bg-black transition-colors"
            >
              {lang === 'ar' ? 'إغلاق ومتابعة التصفح' : 'Close & Continue Browsing'}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                {lang === 'ar' ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp Number'}
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  placeholder="010XXXXXXXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
                />
                <Phone className={`w-4 h-4 text-slate-400 absolute top-3.5 ${isRTL ? 'left-3' : 'right-3'}`} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                {lang === 'ar' ? 'كود الحجز أو رقم الهوية (اختياري)' : 'Booking Ref or ID (Optional)'}
              </label>
              <input
                type="text"
                placeholder="OCT-2026-XXXX"
                value={bookingCode}
                onChange={(e) => setBookingCode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition"
              />
            </div>

            <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-500 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-brand shrink-0 mt-0.5" />
              <span>
                {lang === 'ar'
                  ? 'حجوزاتك مسجلة بأمان في قاعدة بيانات فرع أكتوبر والشيخ زايد.'
                  : 'Your bookings are securely maintained in our 6th of October & Zayed local database.'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-dark text-white font-bold text-sm hover:bg-black transition-all shadow-md active:scale-[0.99]"
            >
              {lang === 'ar' ? 'دخول / استعراض الحجز' : 'Sign In / View Booking'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
