const ReflectionPage = () => {
  return (
    <main
      className={`relative flex justify-center gap-[50px] min-h-screen p-[20px] bg-black`}
    >
      <BoxReflection />
      <MaskImgReflection />
    </main>
  );
};

const BoxReflection = () => {
  return (
    <div className="flex gap-[20px] pb-[300px]">
      <div className="flex flex-col">
        <div className="text-[20px] text-[#DDD]">Box Reflection - style1</div>
        <img
          src="./reflection-page/dragon.png"
          className="w-[400px]"
          style={{
            WebkitBoxReflect: `below 2px linear-gradient(transparent, rgba(0, 0, 0, .5))`,
          }}
        />
      </div>
      <div className="flex flex-col">
        <div className="text-[20px] text-[#DDD]">Box Reflection - style2</div>
        <img
          src="./reflection-page/dragon.png"
          className="w-[400px]"
          style={{
            WebkitBoxReflect: `below 0px -webkit-gradient(linear, left top, left bottom, from(transparent), to(rgba(250, 250, 250, 0.3)))`,
          }}
        />
      </div>
    </div>
  );
};

const MaskImgReflection = () => {
  return (
    <div className="flex flex-col">
      <div className="text-[20px] text-[#DDD]">Mask Image Reflection</div>
      <img
        className={`w-[400px] object-cover`}
        src="./reflection-page/dragon.png"
        alt="dragon"
      />
      <img
        className={`w-[400px] object-cover scale-y-[-1]`}
        src="./reflection-page/dragon.png"
        style={{
          maskImage: `linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)`,
          WebkitMaskImage: `linear-gradient(to bottom, transparent 10%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0.4) 100%)`,
        }}
        alt="reflection dragon"
      />
    </div>
  );
};

export default ReflectionPage;
