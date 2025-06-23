import chickVideo from "@/assets/parallax/chick.mp4";
import sunFlowerVideo from "@/assets/parallax/sun_flower.mp4";
import beachVideo from "@/assets/parallax/beach.mp4";
import { useCallback, useEffect, useState } from "react";

const videoSrcList: string[] = [chickVideo, sunFlowerVideo, beachVideo];

const ParallaxScrollingVideoPage = () => {
  const [videoTopList, setVideoTopList] = useState<string[]>([]);

  useEffect(() => {
    scrollInit();
    handleScrollEvent();
    window.addEventListener("scroll", handleScrollEvent);
    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);

  const scrollInit = useCallback(() => {
    if (videoTopList.length > 0) return;

    for (let i = 0; i < videoSrcList.length; i++) {
      videoTopList.push("0px");
    }

    setVideoTopList(videoTopList);
  }, [videoTopList]);

  const handleScrollEvent = useCallback(() => {
    const { scrollY, innerHeight } = window;
    const { scrollHeight } = window.document.body;
    const scrollYBottom = scrollY + innerHeight;
    const splitScrollHeight = scrollHeight / videoSrcList.length;

    setVideoTopList(
      videoTopList.map((_, index) => {
        if (scrollYBottom >= splitScrollHeight * (index + 1)) {
          return `${splitScrollHeight * (index + 1) - scrollYBottom}px`;
        } else {
          return "0px";
        }
      })
    );
  }, [videoTopList]);

  return (
    <main className={`relative`}>
      {videoSrcList.map((src, index) => (
        <VideoComponent
          key={index}
          src={src}
          top={videoTopList[index]}
          zIndex={-(index + 1)}
        />
      ))}

      <div className="flex items-center h-[100px] px-[50px] bg-yellow-600 bg-opacity-80 text-gray-300">
        Scroll down to see the Video Parallax Effect
      </div>

      <div className="h-[300px] bg-[rgba(150,150,150,0.3)]"></div>

      <div className="flex flex-col justify-center items-center h-[400px] p-[20px] bg-yellow-600 bg-opacity-80 text-gray-300 ">
        <p className="text-[gold] text-center font-bold text-[30px]">
          Video Parallax Effect
        </p>
        <p className="text-[26px]">HELLO WORLD</p>
      </div>

      <div className="h-[200px]"></div>

      <div className="h-[200px]"></div>

      <div className="flex flex-col justify-center items-center h-[300px] p-[20px] bg-yellow-600 bg-opacity-80 text-gray-300 ">
        <p className="text-[gold] text-center font-bold text-[30px]">NICE!</p>
      </div>

      <div className="h-[300px] bg-[rgba(150,150,150,0.3)]"></div>

      <div className="flex flex-col justify-center items-center h-[100px] p-[20px] bg-yellow-600 bg-opacity-80 text-gray-300 ">
        <p className="text-[gold] text-center font-bold text-[30px]">GOOD!</p>
      </div>

      <div className="h-[100px]"></div>

      <div className="flex flex-col justify-center items-center h-[200px] p-[20px] bg-yellow-600 bg-opacity-80 text-gray-300 ">
        <p className="text-[gold] text-center font-bold text-[30px]">
          EXCELLENT!
        </p>
      </div>

      <div className="h-[300px]"></div>

      <div className="flex flex-col justify-center items-center h-[400px] p-[20px] bg-yellow-600 bg-opacity-80 text-gray-300 ">
        <p className="text-[gold] text-center font-bold text-[30px]">
          HAPPY :)
        </p>
      </div>

      <div className="h-[700px]"></div>

      <div className="flex flex-col justify-center items-center h-[200px] p-[20px] bg-yellow-600 bg-opacity-80 text-gray-300 ">
        <p className="text-[gold] text-center font-bold text-[30px]">BYE</p>
      </div>

      <footer className="flex justify-center items-center h-[500px] text-orange-400 bg-[rgba(150,150,150,0.3)]"></footer>
    </main>
  );
};

interface VideoComponentProps {
  src: string;
  top: string;
  zIndex: number;
}
const VideoComponent = ({ src, top, zIndex }: VideoComponentProps) => {
  return (
    <video
      className={`fixed w-screen h-screen object-cover`}
      style={{ top, zIndex }}
      autoPlay
      muted
      loop
    >
      <source src={src} type="video/mp4" />
    </video>
  );
};

export default ParallaxScrollingVideoPage;
