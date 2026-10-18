import React, { useState, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import TripsList from '../components/TripsList';
import DiscountsSection from '../components/DiscountsSection';
import WhyUsSection from '../components/WhyUsSection';
import mockData from '../data/mock-data.json';

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPrice, setSelectedPrice] = useState('all');
  const location = useLocation();

  useLayoutEffect(() => {
    // Instant scroll restoration ONLY when returning specifically from TripDetails via "Back to Trips"
    const isFromTripDetails = location.state?.fromTripDetails === true;

    if (isFromTripDetails) {
      const savedPos = sessionStorage.getItem('tripsScrollPos');
      if (savedPos) {
        const pos = parseInt(savedPos, 10);
        if (!isNaN(pos)) {
          window.scrollTo({ top: pos, behavior: 'instant' });
        }
        sessionStorage.removeItem('tripsScrollPos');
      } else {
        const tripsEl = document.getElementById('trips');
        if (tripsEl) {
          const targetOffset = tripsEl.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: Math.max(0, targetOffset), behavior: 'instant' });
        }
      }
      // Clear location state from history immediately so subsequent navigations/clicks NEVER trigger instant jump
      window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
      return;
    }

    // Clean up any stale scroll position if not returning from TripDetails back button
    sessionStorage.removeItem('tripsScrollPos');
  }, [location]);

  return (
    <main className="min-h-screen">
      <Hero />

      <TripsList
        trips={mockData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />

      <DiscountsSection trips={mockData} />

      <WhyUsSection />
    </main>
  );
}
