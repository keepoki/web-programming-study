import HtmlFontSizeSetter from '@/hooks/HtmlFontSizeSetter';
import { useGlobalNavOpenState } from '@/stores/store';
import { useEffect } from 'react';

const ZoomFramePage = () => {
  const isOpen = useGlobalNavOpenState(state => state.isOpen);

  useEffect(() => {
    const FixRatio = getResizeEventListener(1920, 1080);
    window.onresize = FixRatio;
    FixRatio();
    HtmlFontSizeSetter('100%');
  }, []);

  return (
    <main className={`relative flex justify-center items-center ${isOpen ? 'ml-[200px]' : 'ml-[50px]'} transition-all duration-700 bg-[#777]`}>
      <div id='zoom' className='flex justify-center items-center bg-[#777]'>
        <div className='bg-blue-400 w-[300px] h-[300px]' />
      </div>
    </main>
  );
};

const getResizeEventListener = (standardWidth: number, standardHeight: number): () => void => {
  return () => {
    const zoom = document.querySelector<HTMLElement>('#zoom');

    if (zoom) {
      // 원하는 해상도로 width, height 고정
      zoom.style.width = `${standardWidth}px`;
      zoom.style.height = `${standardHeight}px`;

      // 가로 기준으로 보정
      let width = window.innerWidth;
      let height = width * (standardHeight / standardWidth);
      
      // style.zoom을 이용하여 화면 크기를 조정
      zoom.style.zoom = `${height / standardHeight}`;

      // 크기가 화면 세로보다 큰 경우 세로 기준으로 보정
      if (height > window.innerHeight) {
        height = window.innerHeight;
        width = height * (standardWidth / standardHeight);
        
        // style.zoom을 이용하여 화면 크기를 조정
        zoom.style.zoom = `${width / standardWidth}`;
      }
    }
  };
};

export default ZoomFramePage;
