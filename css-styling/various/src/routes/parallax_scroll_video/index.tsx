import ParallaxScrollingVideoPage from "@/pages/parallax_scroll_video";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/parallax_scroll_video/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ParallaxScrollingVideoPage />;
}
