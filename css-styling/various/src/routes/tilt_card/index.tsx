import TiltCardPage from "@/pages/tilt_card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/tilt_card/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TiltCardPage />;
}
