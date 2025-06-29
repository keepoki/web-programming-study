import GlobalNav from '@/components/common/GlobalNav';
import { createRootRoute, Outlet } from '@tanstack/react-router';
// import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <GlobalNav />
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </>
  ),
})