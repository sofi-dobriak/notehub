import { useMediaQuery } from 'react-responsive';

export const useMediaQueries = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1199 });
  const isDesktop = useMediaQuery({ minWidth: 1200 });

  return { isMobile, isTablet, isDesktop };
};
