import { RefObject, useEffect, useState } from "react"

interface StickyOption {
  setTimeoutDelay?: number;
  enablePosY?: number;
  disableWindowPosY?: number;
}

export const useSticky = (ref: RefObject<HTMLElement>, option: StickyOption) => {
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (!ref.current) return;
    const element = ref.current;
    const rect = element.getBoundingClientRect();

    const enablePosY = option.enablePosY ?? 0;
    const disableWindowPosY = option.disableWindowPosY ?? 0;
    if (window.scrollY <= disableWindowPosY) {
      setSticky(false);
    } else if (rect?.top <= enablePosY) {
      setSticky(true);
    }
  }

  useEffect(() => {
    handleScroll();
    if (option.setTimeoutDelay) {
      const timer = setInterval(() => {
        window.addEventListener('scroll', handleScroll);
      }, 100)

      return () => {
        clearInterval(timer);
        window.removeEventListener('scroll', handleScroll);
      }
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      }
    }
  })

  return { isSticky, setSticky };
}

export default useSticky;