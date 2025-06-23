import { useEffect } from 'react';

const InitScrollToTop = () => {
  useEffect(() => {
    // 스크롤을 맨 위로 이동
    window.scrollTo(0, 0);
  }, []);
  
  // 이 컴포넌트는 UI를 렌더링하지 않음
  return null;
};

export default InitScrollToTop;
