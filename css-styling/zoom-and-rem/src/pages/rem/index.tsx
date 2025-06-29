import HtmlFontSizeSetter from '@/hooks/htmlFontSizeSetter';
import { useGlobalNavOpenState } from '@/stores/store';
import { useEffect } from 'react';

const RemPage = () => {
  const isOpen = useGlobalNavOpenState(state => state.isOpen);

  useEffect(() => {
    HtmlFontSizeSetter('62.5%');
  }, []);

  return (
    <main className={`flex justify-center items-center gap-[30px] ${isOpen ? 'ml-[200px]' : 'ml-[50px]'} transition-all duration-700`}>

    </main>
  );
};

export default RemPage;
