import { useEffect } from 'react';
import { useNavigationType } from 'react-router-dom';

const useScrollY = () => {
  const navType = useNavigationType();

  const storeScroll = () => {
    const { pageYOffset, location } = window;
    const { state: prevState = {} } = window.history;
    window.history.replaceState(
      {
        ...prevState,
        scroll: {
          y: pageYOffset,
        },
      },
      '',
      location.pathname
    );
  };

  useEffect(() => {
    if (navType !== 'POP') return;
    const { scroll } = window.history.state;
    const restoreScroll = (yToMove) => {
      if (yToMove !== window.pageYOffset) window.scrollTo(0, yToMove);
    };
    if (scroll) restoreScroll(scroll.y);
  }, [navType]);

  return { storeScroll };
};

export default useScrollY;
