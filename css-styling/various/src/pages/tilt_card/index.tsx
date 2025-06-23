import { MouseEvent, useCallback, useRef, useState } from "react";

const TiltCardPage = () => {
  return (
    <main className="relative flex justify-evenly items-center min-h-screen p-[20px] bg-zinc-800">
      <TiltEffectCard />
      <TiltEffect />
      <TiltEffect2 name="Tilt" title="EFFECT" since="2025-04-07" />
    </main>
  );
};

const TiltEffectCard = () => {
  const [scale, setScale] = useState(1);
  const [isHoverForward, setIsHoverForward] = useState(false);
  const [inputScale, setInputScale] = useState(1.1);
  const [inputSlope, setInputSlope] = useState(20);
  const [inputPerspective, setInputPerspective] = useState(1000);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const card = e.currentTarget;
      const box = card.getBoundingClientRect();

      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      const xPercentage = x / box.width;
      const yPercentage = y / box.height;

      const forward = isHoverForward ? -1 : 1;
      const xRotation = (xPercentage - 0.5) * inputSlope * forward;
      const yRotation = (0.5 - yPercentage) * inputSlope * forward;

      const setProperty = (property: string, value: string) => {
        card.style.setProperty(property, value);
      };

      setProperty("--x-rotation", `${yRotation}deg`);
      setProperty("--y-rotation", `${xRotation}deg`);
      setProperty("--x", `${xPercentage * 100}%`);
      setProperty("--y", `${yPercentage * 100}%`);
      setProperty("--x-small", `${xPercentage * 3}%`);
      setProperty("--y-small", `${yPercentage * 3}%`);
      setProperty("--scale", `${scale}`);
    },
    [inputSlope, scale, isHoverForward]
  );

  const onMouseLeave = useCallback(() => {
    setScale(1);
  }, []);

  const onMouseEnter = useCallback(() => {
    setScale(inputScale);
  }, [inputScale]);

  return (
    <div
      className="relative flex flex-col text-white"
      style={{ perspective: `${inputPerspective}px` }}
    >
      <div
        className="
          relative w-[300px] h-[300px] bg-gray-300 text-[#306ecc] rounded-xl will-change-transform
          transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] duration-0 group
          hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(var(--scale))]
        "
        onMouseMove={onMouseMove}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] w-[85%] h-[85%] rounded-xl bg-current" />
        <div className="absolute rounded-xl pointer-events-none inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]" />

        <div className="relative flex justify-center items-center w-full h-full rounded-xl hover:[transform:translateX(var(--x-small))_translateY(var(--y-small))_rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_translateZ(60px)]">
          <p className=" text-[#e0c739] font-bold text-4xl select-none">
            LIGHT
          </p>
        </div>
      </div>
      <span className="h-[200px]" />
      <div className="flex gap-[10px] w-[330px]">
        <label className="w-[120px]">Hover Forward</label>
        <input
          type="checkbox"
          value={Number(isHoverForward)}
          onChange={(e) => setIsHoverForward(e.target.checked)}
        />
      </div>
      <div className="flex gap-[10px] w-[330px]">
        <label className="w-[120px]">Hover Scale</label>
        <input
          type="range"
          value={inputScale}
          min={1}
          max={2}
          step={0.1}
          onChange={(e) => setInputScale(Number(e.target.value))}
        />
        {inputScale}
      </div>

      <div className="flex gap-[10px] w-[330px]">
        <label className="w-[120px]">Slope</label>
        <input
          type="range"
          value={inputSlope}
          min={1}
          max={100}
          step={1}
          onChange={(e) => setInputSlope(Number(e.target.value))}
        />
        {inputSlope}
      </div>
      <div className="flex gap-[10px] w-[330px]">
        <label className="w-[120px]">Perspective(px)</label>
        <input
          type="range"
          value={inputPerspective}
          min={100}
          max={2000}
          step={100}
          onChange={(e) => setInputPerspective(Number(e.target.value))}
        />
        {inputPerspective}
      </div>
    </div>
  );
};

// https://ibelick.com/blog/create-tilt-effect-with-react
const TiltEffect = () => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const onMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;
    const rotateX = (y - centerY) / 7;
    const rotateY = (centerX - x) / 7;

    setRotate({ x: rotateX, y: rotateY });
  }, []);

  const onMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <>
      <div
        className="card relative h-52 w-52 rounded-xl bg-white transition-[all_400ms_cubic-bezier(0.03,0.98,0.52,0.99)_0s] will-change-transform"
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s",
        }}
      >
        <div className="pulse absolute -inset-2 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 opacity-75 blur-xl" />
        <div className="relative flex h-full w-full select-none items-center justify-center rounded-lg bg-slate-900 text-sm font-light text-slate-300">
          HELLO WORLD
        </div>
      </div>
    </>
  );
};

// https://www.frontend.fyi/tutorials/css-3d-perspective-animations
const TiltEffect2 = ({
  name,
  title,
  since,
}: {
  name: string;
  title: string;
  since: string;
}) => {
  const boundingRef = useRef<DOMRect | null>(null);

  return (
    <div className="flex flex-col [perspective:800px]">
      <div
        onMouseLeave={() => (boundingRef.current = null)}
        onMouseEnter={(ev) => {
          boundingRef.current = ev.currentTarget.getBoundingClientRect();
        }}
        onMouseMove={(ev) => {
          if (!boundingRef.current) return;
          const x = ev.clientX - boundingRef.current.left;
          const y = ev.clientY - boundingRef.current.top;
          const xPercentage = x / boundingRef.current.width;
          const yPercentage = y / boundingRef.current.height;
          const xRotation = (xPercentage - 0.5) * 20;
          const yRotation = (0.5 - yPercentage) * 20;

          ev.currentTarget.style.setProperty("--x-rotation", `${yRotation}deg`);
          ev.currentTarget.style.setProperty("--y-rotation", `${xRotation}deg`);
          ev.currentTarget.style.setProperty("--x", `${xPercentage * 100}%`);
          ev.currentTarget.style.setProperty("--y", `${yPercentage * 100}%`);
        }}
        className="group relative grid w-[200px] grid-rows-[150px_80px_40px] rounded-md bg-[#FFFEEC] p-4 text-[#01A977] transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
      >
        <figure className="rounded-md bg-[currentColor]" />
        <div className="pt-4">
          <p className="text-3xl font-bold">{name}</p>
          <p className="text-xl">{title}</p>
        </div>
        <footer className="flex items-end">
          <p className="flex rounded-sm border border-current px-1 py-px text-[9px] uppercase">
            Arc
            <span className="-my-px mx-1 inline-block w-4 border-l border-r border-current bg-[repeating-linear-gradient(-45deg,currentColor,currentColor_1px,transparent_1px,transparent_2px)]" />{" "}
            {since}
          </p>
        </footer>
        <div className="pointer-events-none absolute inset-0 group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]" />
      </div>
    </div>
  );
};

export default TiltCardPage;
