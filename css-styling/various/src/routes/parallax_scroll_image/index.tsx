import ParallaxScrollingImagePage from "@/pages/parallax_scroll_image";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/parallax_scroll_image/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ParallaxScrollingImagePage />;
}
