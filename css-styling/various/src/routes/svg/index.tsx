import { createFileRoute } from '@tanstack/react-router';
import SvgPage from '@/pages/svg';

export const Route = createFileRoute('/svg/')({
  component: SvgPage,
})

