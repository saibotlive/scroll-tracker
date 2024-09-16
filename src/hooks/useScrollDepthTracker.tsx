import { useEffect, useState } from 'react';

const useScrollDepthTracker = () => {
  const [scrollDepth, setScrollDepth] = useState(0);
  const [lastScrollPosition, setLastScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const articleBody = document.querySelector('article');
      if (!articleBody) return;

      const articleHeight = articleBody.scrollHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPosition = scrollTop + windowHeight;
      const scrollPercentage = (scrollPosition / articleHeight) * 100;

      // Detect whether the user is scrolling down or up
      const isScrollingDown = scrollTop > lastScrollPosition;
      setLastScrollPosition(scrollTop);

      // Handle scrolling down: trigger events and update scrollDepth
      if (isScrollingDown) {
        if (scrollPercentage >= 100 && scrollDepth < 100) {
          window.dispatchEvent(new CustomEvent('scrollDepthReached', { detail: 100 }));
          setScrollDepth(100);
        } else if (scrollPercentage >= 50 && scrollDepth < 50) {
          window.dispatchEvent(new CustomEvent('scrollDepthReached', { detail: 50 }));
          setScrollDepth(50);
        } else if (scrollPercentage >= 25 && scrollDepth < 25) {
          window.dispatchEvent(new CustomEvent('scrollDepthReached', { detail: 25 }));
          setScrollDepth(25);
        }
      } else {
        // Handle scrolling up: reset scrollDepth if needed
        if (scrollPercentage < 25 && scrollDepth > 0) {
          setScrollDepth(0); // Reset to 0% when scrolling back above 25%
        } else if (scrollPercentage < 50 && scrollDepth > 25) {
          setScrollDepth(25); // Reset to 25% when scrolling back above 50%
        } else if (scrollPercentage < 100 && scrollDepth > 50) {
          setScrollDepth(50); // Reset to 50% when scrolling back above 100%
        }
      }
    };

    // Attach scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollDepth, lastScrollPosition]);

  return scrollDepth;
};

export default useScrollDepthTracker;
