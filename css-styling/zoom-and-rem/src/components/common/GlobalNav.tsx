import { useGlobalNavOpenState } from '@/stores/store';
import { useState } from 'react';
import { Link } from '@tanstack/react-router';

const GlobalNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <header className={`fixed z-10`}>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
    </header>
  );
};

const Menu = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className={`relative h-screen transition-all duration-700 bg-[#777] ${isOpen ? 'w-[200px]' : 'w-[50px]'}`}>
      <div className='flex flex-col'>
        <HamBurgerBtn isOpen={isOpen} setIsOpen={setIsOpen} />
        <nav className={`flex flex-col transition-all duration-700 text-[15px] text-[#DDD] overflow-hidden ${isOpen ? 'w-full' : 'w-0'}`}>
          <Link to='/' className='py-[8px] px-[16px] hover:bg-[#888]'>Home</Link>
          <Link to='/zoom-frame' className='py-[8px] px-[16px] hover:bg-[#888]'>Zoom Frame</Link>
          <Link to='/rem' className='py-[8px] px-[16px] hover:bg-[#888]'>rem</Link>
        </nav>
      </div>
    </div>
  );
};

const HamBurgerBtn = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const setGlobalNavOpenState = useGlobalNavOpenState(state => state.setIsOpen);

  function handleClick() {
    setGlobalNavOpenState(!isOpen);
    setIsOpen(!isOpen);
  }

  return (
    <div
      className='flex flex-col gap-[6px] p-[10px] self-end cursor-pointer'
      onClick={handleClick}
    >
      <div className={`w-[35px] h-[5px] bg-[#FFF] transition-transform duration-700 ${isOpen && 'rotate-[-45deg] translate-y-[11px]'}`} />
      <div className={`w-[35px] h-[5px] bg-[#FFF] transition-transform duration-700 ${isOpen && 'opacity-0'}`} />
      <div className={`w-[35px] h-[5px] bg-[#FFF] transition-transform duration-700 ${isOpen && 'rotate-[45deg] translate-y-[-11px]'}`} />
    </div>
  );
};


export default GlobalNav;
