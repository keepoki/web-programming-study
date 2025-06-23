interface DoughnutGraphProps {
  percent: number;
  frameColor?: string;
  barColor?: string;
  width?: number;
  height?: number;
  barWidth?: number;
}

const DoughnutGraph01 = ({ percent, frameColor = '#ccc', barColor = '#03c75a', width = 120, height = 120, barWidth = 12 }: DoughnutGraphProps) => {
  return (
    <div className="relative" style={{ width, height }}>
      <svg className="rotate-[-90deg]" width={width} height={height} viewBox="0 0 120 120">
        <circle fill='none' stroke={frameColor} cx="60" cy="60" r="54" strokeWidth={barWidth} />
        <circle fill='none' stroke={barColor} strokeLinecap='round' strokeDasharray={360} strokeDashoffset={360 - Math.min(percent, 100) * 3.35} cx="60" cy="60" r="54" strokeWidth={barWidth} />
      </svg>
    </div>
  );
};

export default DoughnutGraph01;
