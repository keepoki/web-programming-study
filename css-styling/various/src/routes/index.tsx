import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Main,
});

function Main() {
  useEffect(() => {
    document.title = "React";
  }, []);

  return (
    <main
      className={`flex justify-center items-center w-full h-full transition-all duration-700`}
    >
      <p className="text-[9vw] font-bold">HELLO WORLD</p>
    </main>
  );
}
