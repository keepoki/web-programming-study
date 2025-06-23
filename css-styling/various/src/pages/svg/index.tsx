import SvgColorChanger from "@/components/common/SvgColorChanger";

const SvgPage = () => {
  return (
    <main className={`flex justify-center items-center gap-[30px]`}>
      <div>
        <img src="/svg-page/bethard.svg" alt="bethard" className="w-[300px]" />
        <div className="relative w-[300px] h-[100px]">
          <SvgColorChanger url="/svg-page/bethard.svg" color="#3FC" />
        </div>
      </div>
      <div className="relative w-[500px] h-[500px]">
        <SvgColorChanger url="/svg-page/map.svg" color="red" />
      </div>
    </main>
  );
};

export default SvgPage;
