import DoughnutGraph02 from "@/components/common/DoughnutGraph02";
import { useMemo, useState } from "react";
import DoughnutGraph01 from "@/components/common/DoughnutGraph01";
import { useCountUpEaseOutSine } from "@/hooks/useCountUp";

const GraphPage = () => {
  return (
    <main className="relative">
      <DoughnutGraphSection />
    </main>
  );
};

const DoughnutGraphSection = () => {
  const [inputEndCount, setInputEndCount] = useState(100);
  const [inputMaxCount, setInputMaxCount] = useState(100);
  const [inputDuration, setInputDuration] = useState(1000);

  const { count, endCount, setPlay, setEndCount, setDuration } =
    useCountUpEaseOutSine({ start: 0, end: 100, initDuration: 1000 });

  const handleStart = () => {
    setEndCount(inputEndCount);
    setDuration(inputDuration);
    setPlay(true);
  };

  const percentage = useMemo(() => {
    if (count === 0) return 0;
    const percent = (count / endCount) * 100;
    return percent * (endCount / inputMaxCount);
  }, [count, endCount, inputMaxCount]);

  return (
    <section className="relative flex flex-col justify-center items-center gap-[100px] py-[50px]">
      <div className="flex justify-evenly w-full">
        <DoughnutGraph01 percent={percentage} />
        <DoughnutGraph02
          percent={percentage}
          text={`${Intl.NumberFormat("ko").format(count)}/${inputMaxCount}`}
        />
        <DoughnutGraph02
          barColor="#F44"
          percent={percentage}
          text={`${percentage.toFixed(0)}%`}
        />
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center gap-[10px]">
          <label>End Count</label>
          <input
            id="max-count"
            className="border-[1px] border-blue-500 rounded-md text-[20px]"
            value={inputEndCount}
            onChange={(e) => setInputEndCount(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-[10px]">
          <label>Max Count</label>
          <input
            id="max-count"
            className="border-[1px] border-blue-500 rounded-md text-[20px]"
            value={inputMaxCount}
            onChange={(e) => setInputMaxCount(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-[10px]">
          <label>Duration (ms)</label>
          <input
            id="max-count"
            className="border-[1px] border-blue-500 rounded-md text-[20px]"
            value={inputDuration}
            onChange={(e) => setInputDuration(Number(e.target.value))}
          />
        </div>
        <button
          className="p-[10px] border-[1px] border-blue-500 rounded-md text-[20px] hover:bg-blue-500 hover:text-white"
          onClick={() => handleStart()}
        >
          Start
        </button>
        <button
          className="p-[10px] border-[1px] border-blue-500 rounded-md text-[20px] hover:bg-blue-500 hover:text-white"
          onClick={() => setPlay(false)}
        >
          Stop
        </button>
      </div>
    </section>
  );
};

export default GraphPage;
