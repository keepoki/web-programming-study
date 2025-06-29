import RemPage from '@/pages/rem';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/rem/')({
  component: RemPage,
});
