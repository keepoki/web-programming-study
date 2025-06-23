import { createFileRoute } from '@tanstack/react-router';
import CarouselPage from '@/pages/carousel';

export const Route = createFileRoute('/carousel/')({
  component: Carousel,
})

function Carousel() {
  return (
    <CarouselPage />
  );
}
