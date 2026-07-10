/* eslint-disable react/prop-types */
import { createContext, useContext, useCallback, useEffect, useRef, useState } from 'react';
import emblaCarousel from 'embla-carousel';
import './carousel.css';

// ─── Context ───────────────────────────────────────────────────────────────────
const CarouselContext = createContext(null);

function useCarouselContext(componentName) {
  const ctx = useContext(CarouselContext);
  if (!ctx) {
    throw new Error(`<${componentName} /> must be used within a <Carousel />`);
  }
  return ctx;
}

// ─── Root: <Carousel /> ────────────────────────────────────────────────────────
export function Carousel({
  children,
  opts = {},
  plugins = [],
  setApi = () => {},
  orientation = 'horizontal',
  className = '',
}) {
  const [api, setApiState] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const apiRef = useRef(null);

  const onSelect = useCallback(() => {
    if (!apiRef.current) return;
    setSelectedIndex(apiRef.current.selectedScrollSnap());
    setCanScrollPrev(apiRef.current.canScrollPrev());
    setCanScrollNext(apiRef.current.canScrollNext());
  }, []);

  const onInit = useCallback((emblaApi) => {
    apiRef.current = emblaApi;
    setApiState(emblaApi);
    setApi(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    // Initialize button states immediately
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [setApi, onSelect]);

  useEffect(() => {
    return () => {
      apiRef.current?.off('select', onSelect);
    };
  }, [onSelect]);

  const scrollPrev = useCallback(() => apiRef.current?.scrollPrev(), []);
  const scrollNext = useCallback(() => apiRef.current?.scrollNext(), []);
  const scrollTo = useCallback(
    (index, jump) => apiRef.current?.scrollTo(index, jump),
    [],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext],
  );

  const contextValue = {
    api,
    canScrollPrev,
    canScrollNext,
    orientation,
    scrollPrev,
    scrollNext,
    scrollTo,
    selectedIndex,
    scrollSnaps,
    handleKeyDown,
    onInit,
    opts,
    plugins,
  };

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        data-slot="carousel"
        className={`carousel ${className}`}
        role="region"
        aria-roledescription="carousel"
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

// ─── Content: <CarouselContent /> ──────────────────────────────────────────────
export function CarouselContent({ children, className = '' }) {
  const emblaCtx = useCarouselContext('CarouselContent');
  const viewportRef = useRef(null);

  useEffect(() => {
    if (!viewportRef.current) return;

    const emblaApi = emblaCarousel(viewportRef.current, {
      ...emblaCtx.opts,
      axis: emblaCtx.orientation === 'horizontal' ? 'x' : 'y',
    }, emblaCtx.plugins);

    emblaCtx.onInit(emblaApi);

    return () => {
      emblaApi.destroy();
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="carousel-viewport" ref={viewportRef}>
      <div
        data-slot="carousel-content"
        className={`carousel-container ${
          emblaCtx.orientation === 'vertical' ? 'flex-col' : ''
        } ${className}`}
        data-embla-container=""
      >
        {children}
      </div>
    </div>
  );
}

// ─── Item: <CarouselItem /> ────────────────────────────────────────────────────
export function CarouselItem({ children, className = '' }) {
  useCarouselContext('CarouselItem');

  return (
    <div
      data-slot="carousel-item"
      role="group"
      aria-roledescription="slide"
      className={`carousel-slide ${className}`}
      data-embla-slide=""
    >
      {children}
    </div>
  );
}

// ─── Previous Button: <CarouselPrevious /> ─────────────────────────────────────
export function CarouselPrevious({ className = '', ...restProps }) {
  const emblaCtx = useCarouselContext('CarouselPrevious');

  return (
    <button
      data-slot="carousel-prev"
      className={`carousel-btn carousel-prev ${className}`}
      aria-disabled={!emblaCtx.canScrollPrev}
      disabled={!emblaCtx.canScrollPrev}
      onClick={emblaCtx.scrollPrev}
      onKeyDown={emblaCtx.handleKeyDown}
      {...restProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M5 12h14" />
        <path d="M12 5l-7 7 7 7" />
      </svg>
      <span className="sr-only">Previous slide</span>
    </button>
  );
}

// ─── Next Button: <CarouselNext /> ─────────────────────────────────────────────
export function CarouselNext({ className = '', ...restProps }) {
  const emblaCtx = useCarouselContext('CarouselNext');

  return (
    <button
      data-slot="carousel-next"
      className={`carousel-btn carousel-next ${className}`}
      aria-disabled={!emblaCtx.canScrollNext}
      disabled={!emblaCtx.canScrollNext}
      onClick={emblaCtx.scrollNext}
      onKeyDown={emblaCtx.handleKeyDown}
      {...restProps}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="size-4"
      >
        <path d="M5 12h14" />
        <path d="M12 5l7 7-7 7" />
      </svg>
      <span className="sr-only">Next slide</span>
    </button>
  );
}
