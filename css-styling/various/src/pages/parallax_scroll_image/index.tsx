const ParallaxScrollingImagePage = () => {
  const bgFixedClassName =
    "[background-repeat:no-repeat] [background-size:cover] [background-attachment:fixed]";

  return (
    <main className={`relative`}>
      <div className="absolute flex items-center w-full h-[10vw] pl-[20px] text-[20px] text-sky-600 font-bold z-[1]">
        <p>Scroll down to see the Image Parallax Effect</p>
      </div>

      <div
        className={`h-[10vw] [background-image:url("/parallax-page/bird.webp")] ${bgFixedClassName} [background-position:center_25%] opacity-70`}
      />
      <div
        className={`h-[30vw] [background-image:url("/parallax-page/bird.webp")] ${bgFixedClassName} [background-position:center_25%]`}
      />
      <div
        className={`h-[20vw] [background-image:url("/parallax-page/bird.webp")] ${bgFixedClassName} [background-position:center_25%] opacity-70`}
      />

      <div className="flex flex-col justify-center items-center h-[20vw] p-[20px] bg-slate-50 bg-opacity-80 text-gray-500 font-bold">
        <p className="text-[gold] text-center font-bold text-[30px]">
          Image Parallax Effect
        </p>
        <p className="text-[26px]">HELLO WORLD</p>
      </div>

      <div
        className={`relative h-[20vw] [background-image:url("/parallax-page/desert.jpg")] ${bgFixedClassName} [background-position:center]`}
      >
        <div className="absolute w-full h-full bg-[linear-gradient(to_top,transparent,black)] opacity-60" />
      </div>

      <div
        className={`h-[2vw] [background-image:url("/parallax-page/desert.jpg")] ${bgFixedClassName} [background-position:center] opacity-70`}
      />

      <div
        className={`flex flex-col justify-center items-center h-[10vw] p-[20px] text-gray-500 font-bold [background-image:url("/parallax-page/desert.jpg")] ${bgFixedClassName} [background-position:center]`}
      >
        <p className="text-[gold] text-center font-bold text-[30px]">NICE!</p>
      </div>

      <div
        className={`h-[2vw] [background-image:url("/parallax-page/desert.jpg")] ${bgFixedClassName} [background-position:center] opacity-70`}
      />

      <div
        className={`relative h-[20vw] [background-image:url("/parallax-page/desert.jpg")] ${bgFixedClassName} [background-position:center]`}
      >
        <div className="absolute w-full h-full bg-[linear-gradient(to_bottom,transparent,black)] opacity-60" />
      </div>

      <div
        className={`flex flex-col justify-center items-center h-[200px] p-[20px] bg-slate-50 bg-opacity-80 text-gray-500 font-bold`}
      >
        <p className="text-[gold] text-center font-bold text-[30px]">
          EXCELLENT!
        </p>
      </div>

      <div
        className={`relative h-[3vw] [background-image:url("/parallax-page/desert.jpg")] ${bgFixedClassName} [background-position:center]`}
      >
        <div className="absolute w-full h-full bg-black opacity-60" />
      </div>

      <div
        className={`relative h-[3vw] [background-image:url("/parallax-page/italy.jpg")] ${bgFixedClassName} [background-position:center]`}
      >
        <div className="absolute w-full h-full bg-black opacity-60" />
      </div>

      <div className="relative flex justify-center items-center w-full h-[8vw]">
        <div
          className={`absolute w-full h-full [background-image:url("/parallax-page/italy.jpg")] ${bgFixedClassName} [background-position:center]`}
        />
        <div className="absolute w-full h-full bg-black opacity-30" />
        <p className="text-[gold] font-bold text-[30px] z-[1]">GOOD!</p>
      </div>

      <div
        className={`relative h-[15vw] [background-image:url("/parallax-page/italy.jpg")] ${bgFixedClassName} [background-position:center]`}
      >
        <div className="absolute w-full h-full bg-black opacity-20" />
      </div>

      <div
        className={`relative h-[10vw] [background-image:url("/parallax-page/italy.jpg")] ${bgFixedClassName} [background-position:center]`}
      >
        <div className="absolute w-full h-full bg-black opacity-10" />
      </div>

      <div className="flex flex-col justify-center items-center h-[10vw] p-[20px] bg-slate-50 bg-opacity-80 text-gray-500 font-bold">
        <p className="text-[gold] text-center font-bold text-[30px]">
          HAPPY :)
        </p>
      </div>

      <div
        className={`relative h-[30vw] [background-image:url("/parallax-page/italy.jpg")] ${bgFixedClassName} [background-position:center]`}
      />

      <div
        className={`flex flex-col justify-center items-center h-[30vw] p-[20px] [background-image:url("/parallax-page/lantern.jpg")] ${bgFixedClassName} [background-position:center_100%]`}
      >
        <p className="text-[gold] text-center font-bold text-[30px]">BYE</p>
      </div>

      <div
        className={`relative h-[30vw] [background-image:url("/parallax-page/italy.jpg")] ${bgFixedClassName} [background-position:center]`}
      />
    </main>
  );
};

export default ParallaxScrollingImagePage;
