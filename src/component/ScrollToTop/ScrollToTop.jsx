import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    // Delay scrolling to ensure route change has completed
    const timer = setTimeout(handleScrollToTop, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
