import {
  Carousel01,
  Carousel01Item,
} from "../../components/carausel/Carousel01";

const CarouselPage = () => {
  const cardList: Carousel01Item[] = [
    {
      imgSrc: "/carousel-page/1.png",
      title: "item_01_title",
    },
    {
      imgSrc: "/carousel-page/2.png",
      title: "item_02_title",
    },
    {
      imgSrc: "/carousel-page/3.png",
      title: "item_03_title",
    },
    {
      imgSrc: "/carousel-page/4.png",
      title: "item_04_title",
    },
  ];

  return (
    <main className="relative">
      <Carousel01 cardList={cardList} />
    </main>
  );
};

export default CarouselPage;
