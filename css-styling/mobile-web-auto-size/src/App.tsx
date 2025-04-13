import Lottie from 'react-lottie-player';
import homeBtnAnimation from './assets/home_btn_animation.json';
import homeAnimation from './assets/home_animation.json';
import dogAnimation from './assets/dog_animation.json';
import catAnimation from './assets/cat_animation.json';
import yearAnimation from './assets/2025_animation.json';
import { useState } from 'react';

type PageType = 'home' | 'dog' | 'cat' | 'year';
function App() {
  const [page, setPage] = useState<PageType>('home');

  return (
    <div className='relative flex flex-col items-center m-[0_auto] w-[37.5rem] min-h-screen bg-white'>
      <GlobalNavBar setPage={setPage} />
      <div className='relative flex flex-col items-center min-h-[calc(100vh-8rem-3rem)]'>
        {page === 'home' && <HomePage />}
        {page === 'dog' && <DogPage />}
        {page === 'cat' && <CatPage />}
        {page === 'year' && <YearPage />}
      </div>
      <Footer />
    </div>
  );
}


const GlobalNavBar = ({ setPage }: { setPage: (page: PageType) => void }) => {
  const [isHomeBtnHover, setIsHomeBtnHover] = useState(false);
  
  const MenuBtn = ({ page }: { page: PageType }) => {
    return (
      <button
        className='font-bold p-[1rem] border-[1px] rounded-[1rem]'
        onClick={() => setPage(page)}
      >
        {page.toUpperCase()}
      </button>
    );
  };

  return (
    <header className='flex justify-center items-center gap-[1.5rem] w-full h-[8rem] text-[1.5rem] bg-[#2277e6]'>
      <button
        className='w-[4.5rem]'
        onMouseEnter={() => setIsHomeBtnHover(true)}
        onMouseLeave={() => setIsHomeBtnHover(false)}
        onClick={() => setPage('home')}
      >
        <Lottie animationData={homeBtnAnimation} play={isMobile() ? true : isHomeBtnHover} loop className='w-full h-full' />
      </button>
      <MenuBtn page='dog' />
      <MenuBtn page='cat' />
      <MenuBtn page='year' />
    </header>
  );
};

const Footer = () => {
  return (
    <footer className='flex justify-center items-center gap-[1.5rem] w-full h-[3rem] text-[1.5rem] bg-[#2277e6]'>
      <div className='flex justify-center items-center gap-[1rem]'>
        { Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className='w-[0.5rem] h-[0.5rem] bg-white rounded-full' />
        ))}
      </div>
      <p className='font-bold'>Footer</p>
      <div className='flex justify-center items-center gap-[1rem]'>
        { Array.from({ length: 8 }).map((_, index) => (
          <span key={index} className='w-[0.5rem] h-[0.5rem] bg-white rounded-full' />
        ))}
      </div>
    </footer>
  );
};

const HomePage = () => {
  return (
    <div className='mt-[8rem]'>
      <h1 className='flex justify-center items-center text-black'>Home</h1>
      <Lottie animationData={homeAnimation} play loop />
    </div>
  );
};

const DogPage = () => {
  return (
    <div className='mt-[8rem]'>
      <Lottie animationData={dogAnimation} play loop />
    </div>
  );
};

const CatPage = () => {
  return (
    <div className='mt-[8rem]'>
      <Lottie animationData={catAnimation} play loop />
    </div>
  );
};

const YearPage = () => {
  return (
    <div className='mt-[8rem]'>
      <Lottie animationData={yearAnimation} play loop />
    </div>
  );
};

const isMobile = () => {
  const userAgent = typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
  const mobileRegex = /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i;
  return !!mobileRegex.exec(userAgent);
};

export default App;
