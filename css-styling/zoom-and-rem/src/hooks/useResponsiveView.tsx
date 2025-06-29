'use client';

import { useEffect, useState } from 'react';

interface Props {
  minWidth: number;
}

/**
 * 최소 가로 사이즈에 부합하는지 상태를 리턴하는 함수
 */
export default function useResponsiveView({ minWidth }: Props) {
  const [isMinWidth, setIsMinWidth] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMinWidth(window.innerWidth <= minWidth);
    };
    
    // 초기 값 설정
    handleResize();
    
    const timer = setInterval(() => {
      window.addEventListener('resize', handleResize);
    }, 100);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isMinWidth;
}
