import { useEffect, useRef } from 'react';

const SvgColorChanger: React.FC<{ url: string, color: string }> = ({ url: svgUrl, color }) => {
  const svgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchSvg = async () => {
      try {
        const response = await fetch(svgUrl);
        const svgText = await response.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svgElement = svgDoc.documentElement;

        const paths = svgElement.querySelectorAll('path');
        paths.forEach((path) => {
          // 원하는 색상으로 변경
          path.setAttribute('fill', color);
        });

        // SVG를 DOM에 추가
        if (svgRef.current) {
          svgRef.current.innerHTML = svgElement.outerHTML;
          const firstChild = svgRef.current.firstChild as Element;
          // 부모 요소의 크기 따라가도록 설정
          firstChild.setAttribute('style', 'width: 100%; height: 100%; object-fit: fill;');
        }
      } catch (error) {
        console.error('Error fetching SVG:', error);
      }
    };

    fetchSvg();
  }, [svgUrl]);

  return <div ref={svgRef} className='absolute top-0 left-0 w-full h-full' />;
};

export default SvgColorChanger;
