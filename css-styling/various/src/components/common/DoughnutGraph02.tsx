

interface DoughnutGraph02Props {
  percent: number;
  text?: string;
  frameColor?: string;
  barColor?: string;
  width?: number;
  height?: number;
}

const DoughnutGraph02 = ({ percent, text, frameColor = '#AAA', barColor = '#0BF', width = 120, height = 120 }: DoughnutGraph02Props) => {
  return (
    <div className="relative" style={{ width, height }}>
      <div
        className={`absolute inset-0 rounded-full ${frameColor} shadow-[0_0_15px_#333]`}
        style={{
          background: `conic-gradient(${barColor} ${percent * 3.6}deg, lightgray ${percent * 3.6}deg)`,
        }}
      />
      <div className="absolute inset-0 rounded-full bg-white" style={{ clipPath: 'circle(42%)' }} />
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="w-[80%] text-[100%] leading-[44px] text-center font-light">
          {text}
        </p>
      </div>
    </div>
  );
};

export default DoughnutGraph02;
