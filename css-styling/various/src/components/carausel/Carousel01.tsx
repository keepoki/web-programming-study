import { useEffect, useState } from "react";

export interface Carousel01Item {
  imgSrc: string;
  title: string;
}

export const Carousel01 = ({ cardList }: { cardList: Carousel01Item[] }) => {
  const [currentCardList, setCurrentCardList] = useState<
    Carousel01Item[] | null
  >(cardList);
  const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
  const [cardViewCount] = useState(3);
  const [slidePageCount] = useState(Math.ceil(cardList.length / cardViewCount));

  useEffect(() => {
    const startIdx = 0;
    const endIdx = startIdx + cardViewCount - 1;

    setCurrentCardList(cardList.slice(startIdx, endIdx + 1));
    setCurrentSlideIdx(0);
  }, []);

  const handleLeftBtnClick = () => {
    let newCurrentIdx = currentSlideIdx - 1;

    if (newCurrentIdx < 0) {
      newCurrentIdx = slidePageCount - 1;
    }

    const startIdx = newCurrentIdx * cardViewCount;

    let endIdx = startIdx + cardViewCount - 1;
    if (endIdx >= cardList.length) {
      endIdx = cardList.length - 1;
    }

    setCurrentCardList(cardList.slice(startIdx, endIdx + 1));
    setCurrentSlideIdx(newCurrentIdx);
  };

  const handleRightBtnClick = () => {
    let newCurrentIdx = currentSlideIdx + 1;

    if (newCurrentIdx >= slidePageCount) {
      newCurrentIdx = 0;
    }

    let startIdx = newCurrentIdx * cardViewCount;
    if (startIdx >= cardList.length) {
      startIdx = 0;
    }

    const endIdx = startIdx + cardViewCount - 1;

    setCurrentCardList(cardList.slice(startIdx, endIdx + 1));
    setCurrentSlideIdx(newCurrentIdx);
  };

  const goToSlide = (index: number) => {
    let newCurrentIdx = index;

    if (newCurrentIdx < 0) {
      newCurrentIdx = slidePageCount - 1;
    }

    let startIdx = newCurrentIdx * cardViewCount;
    if (startIdx >= cardList.length) {
      startIdx = 0;
    }

    let endIdx = startIdx + cardViewCount - 1;
    if (endIdx >= cardList.length) {
      endIdx = cardList.length - 1;
    }

    setCurrentCardList(cardList.slice(startIdx, endIdx + 1));
    setCurrentSlideIdx(index);
  };

  const ArrowBtn = ({ isRight = false }: { isRight?: boolean }) => {
    return (
      <button
        className="relative flex justify-center items-center min-w-[36px] w-[3vw] max-w-[40px] min-h-[36px] h-[3vw] max-h-[40px] rounded-full z-[1]"
        style={{
          background: `linear-gradient(180deg, #A242AF 0%, #783282 100%)`,
        }}
        onClick={
          isRight ? () => handleRightBtnClick() : () => handleLeftBtnClick()
        }
      >
        <span
          className={`
          absolute top-[50%] translate-y-[-50%] w-[30%] h-[30%] border-t-[3px] border-r-[3px] border-[#fff]
          ${isRight ? "right-[40%] rotate-45" : "left-[40%] rotate-[225deg]"}`}
        />
      </button>
    );
  };

  const Card = ({ imgSrc, text }: { imgSrc: string; text: string }) => {
    return (
      <div className="flex flex-col flex-1 animate-fade-in-0.2">
        <img
          className="w-full h-[216px] rounded-tl-[6px] rounded-tr-[6px]"
          src={imgSrc}
          alt={text}
        />
        <div className="flex flex-col items-center h-[100px] py-[20px] bg-[#1C1021] rounded-bl-[6px] rounded-br-[6px]">
          <div className="flex flex-col items-center gap-[10px]">
            <p className="flex text-center text-[16px] leading-[22.4px] font-light text-white">
              {text}
            </p>
            <span className="w-full h-[1px] bg-[#783282]" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="flex flex-col items-center px-[20px] py-[60px] bg-[#FBFBFB]">
      <div className="flex items-center gap-[1vw]">
        {slidePageCount > 1 && <ArrowBtn />}
        <div className="relative flex flex-col items-center gap-[2vw] px-[5px]">
          <div className="relative flex justify-center items-center gap-[2vw]">
            {currentCardList?.map((item, index) => (
              <Card key={index} imgSrc={item.imgSrc} text={item.title} />
            ))}
          </div>
          {slidePageCount > 1 && (
            <SlidePaging
              activeIdx={currentSlideIdx}
              length={slidePageCount}
              goToSlide={goToSlide}
            />
          )}
        </div>
        {slidePageCount > 1 && <ArrowBtn isRight />}
      </div>
    </section>
  );
};

const SlidePaging = ({
  activeIdx,
  length,
  goToSlide,
}: {
  activeIdx: number;
  length: number;
  goToSlide?: (index: number) => void;
}) => {
  const [array] = useState(Array.from({ length }, () => null));

  return (
    <div className="flex gap-[8px]">
      {array.map((_, index) => (
        <span
          key={index}
          className={`
            h-[8px] rounded-full transition-all duration-300 ease-in-out
            ${activeIdx == index ? "w-[36px] bg-[#783282]" : "w-[28px] bg-[#777]"}
            ${goToSlide && "cursor-pointer"}
          `}
          onClick={() => goToSlide && goToSlide(index)}
        />
      ))}
    </div>
  );
};
