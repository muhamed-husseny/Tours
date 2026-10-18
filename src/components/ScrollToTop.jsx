import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash, state } = useLocation();

  useEffect(() => {
    // Only bypass when specifically returning via the "Back to Trips" button from TripDetails
    if (state?.fromTripDetails === true) {
      return;
    }

    const targetId = state?.scrollTo || (hash ? hash.replace('#', '') : null);

    if (targetId) {
      const getTargetEl = () => {
        if (targetId === 'why-us' || targetId === 'whyUs') {
          return document.getElementById('why-us') || document.getElementById('whyUs');
        }
        return document.getElementById(targetId);
      };

      const timer = setTimeout(() => {
        const element = getTargetEl();
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    }
  }, [pathname, hash, state]);

  return null;
}
