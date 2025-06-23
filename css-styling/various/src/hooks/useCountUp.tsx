import { useEffect, useState } from "react";

const easeFunctions = {
  linear: (t: number): number => t,
  sine: (t: number): number => (t === 1 ? 1 : Math.sin(t * (Math.PI / 2))),
  quad: (t: number): number => t * (2 - t),
  expo: (t: number): number => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
};

interface Props {
  start?: number;
  end?: number;
  initDuration?: number;
  ease: keyof typeof easeFunctions;
}

const useCountUp = ({ end = 100, initDuration = 1000, ease }: Props) => {
  const [count, setCount] = useState(0);
  const [endCount, setEndCount] = useState(end);
  const [play, setPlay] = useState(false);
  const [duration, setDuration] = useState(initDuration);
  const frameRate = 1000 / 60;
  const totalFrame = Math.round(duration / frameRate);

  useEffect(() => {
    if (!play) return;
    setCount(0);
    let currentNumber = 0;
    const counter = setInterval(() => {
      currentNumber++;
      const progress = easeFunctions[ease](currentNumber / totalFrame);
      setCount(Math.round(endCount * progress));

      if (progress >= 1) {
        clearInterval(counter);
        setPlay(false);
      }
    }, frameRate);

    return () => clearInterval(counter);
  }, [play, endCount, frameRate, totalFrame, ease]);

  return {
    play,
    count,
    endCount,
    duration,
    setPlay,
    setEndCount,
    setDuration,
  };
};

export const useCountUpLinear = (props: Omit<Props, "ease">) =>
  useCountUp({ ...props, ease: "linear" });
export const useCountUpEaseOutSine = (props: Omit<Props, "ease">) =>
  useCountUp({ ...props, ease: "sine" });
export const useCountUpEaseOutQuad = (props: Omit<Props, "ease">) =>
  useCountUp({ ...props, ease: "quad" });
export const useCountUpEaseOutExpo = (props: Omit<Props, "ease">) =>
  useCountUp({ ...props, ease: "expo" });
