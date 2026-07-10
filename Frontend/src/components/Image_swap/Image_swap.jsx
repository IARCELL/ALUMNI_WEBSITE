import Autoplay from 'embla-carousel-autoplay';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '../ui/carousel';
import './Image_swap.css';

const slides = [
  { src: '/gallery/2Y4A0622.jpg', alt: 'IAR Cell event' },
  { src: '/gallery/2Y4A3190.jpg', alt: 'IAR Cell event' },
  { src: '/gallery/2Y4A9607.jpg', alt: 'IAR Cell event' },
  { src: '/gallery/DSC00332.jpg', alt: 'IAR Cell event' },
  { src: '/gallery/DSC02410.jpg', alt: 'IAR Cell event' },
];

const Image_swap = () => {
  const autoplayPlugin = Autoplay({
    delay: 3000,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
  });

  return (
    <div className="carousel-section">
      <Carousel opts={{ loop: true, align: 'start', skipSnaps: false, dragFree: false }} plugins={[autoplayPlugin]}>
        <CarouselContent>
          {slides.map((slide, index) => (
            <CarouselItem key={index} className="carousel-item">
              <div className="carousel-card">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="carousel-card-image"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Image_swap;