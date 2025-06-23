import { createFileRoute } from '@tanstack/react-router';
import ReflectionPage from '@/pages/reflection';

export const Route = createFileRoute('/reflection/')({
  component: ReflectionPage,
});
