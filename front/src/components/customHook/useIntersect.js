import { useEffect } from 'react';

const useIntersect = (target, { isIntersecting, onIntersect, root = null, rootMargin = '0px', threshold = 1 }) => {
  const observerOptions = {
    root,
    rootMargin,
    threshold,
  };

  useEffect(() => {
    if (!target.current || !isIntersecting) return;
    const observer = new IntersectionObserver(onIntersect, observerOptions);
    observer.observe(target.current);
    return () => observer.disconnect();
  }, [target, onIntersect, isIntersecting]);
};

export default useIntersect;
