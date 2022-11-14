import { useEffect } from 'react';

const useIntersect = (target, { onIntersect, root = null, rootMargin = '0px', threshold = 1 }) => {
  const observerOptions = {
    root,
    rootMargin,
    threshold,
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, observerOptions);
    if (!target.current) return;
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [target, onIntersect]);
};

export default useIntersect;
